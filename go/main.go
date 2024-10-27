package main

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	jwtware "github.com/gofiber/jwt/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
	_ "github.com/sijms/go-ora/v2"
)

var db *sql.DB

func main() {

	app := fiber.New()

	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	// Get DSN from environment variable
	dsn := os.Getenv("DSN")
	if dsn == "" {
		panic("DSN environment variable is not set")
	}
	// Initialize the database connection
	db, err = sql.Open("oracle", dsn)
	if err != nil {
		panic(err)
	}

	defer db.Close()
	// Ping the database to verify connection
	if err := db.Ping(); err != nil {
		panic(err)
	}
	fmt.Println("Connected to Oracle Database using go-ora")

	// Apply CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Adjust this to be more restrictive if needed
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	// Login
	app.Post("/login", loginHandler)
	app.Post("/register", registerHandler)
	app.Get("/home", home)
	app.Get("/buildingtype", getbuildingtype)
	app.Get("/roomtype", getroomtype)
	app.Get("/floortype", getfloortype)
	app.Get("/statustype", getstatustype)
	app.Get("/address", getAddress_id)

	// JWT Middleware
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}))
	// Middleware to extract user data from JWT
	app.Use(extractDataFromJWT)
	// API HANDLER
	// app.Get("/userBookings", getUserBookingsHandler)
	app.Get("/permissionsUser", getPermissionsUserHandler) // get permission of jwt (user)
	app.Get("/departments", getDepartmentsHandler)
	app.Get("/roles", getRolesHandler)
	app.Get("/menus", getMenusHandler)
	app.Get("/LockListManagement", LockListManagement)
	app.Put("/resetEmployeeLock/:id", ResetEmployeeLock)
	// Group routes under /rooms

	roomsGroupApi := app.Group("/rooms")
	// Apply the checkPermissionRooms middleware only to the /rooms routes
	roomsGroupApi.Use(checkPermissionRooms)
	roomsGroupApi.Get("/booked", getRoomsBookedHandler) // example result /rooms/booked
	roomsGroupApi.Get("/", getRoomsHandler)
	roomsGroupApi.Get("/:id", getRoomHandler)
	roomsGroupApi.Post("/create", createRoomHandler)
	roomsGroupApi.Put("/:id", updateRoomHandler)
	roomsGroupApi.Delete("/:id", deleteRoomHandler)

	// Employees
	employeesGroupApi := app.Group("/employees")
	employeesGroupApi.Use(checkPermissionEmployees)
	employeesGroupApi.Get("/", getEmployeesHandler)
	employeesGroupApi.Get("/:id", getEmployeeHandler)
	employeesGroupApi.Post("/", createEmlpoyeeHandler)
	employeesGroupApi.Put("/:id", updateEmployeeHandler)

	// Permissions
	permissionsGroupApi := app.Group("/permissions")
	permissionsGroupApi.Use(checkPermissionRoles)
	permissionsGroupApi.Get("/", getPermissionsHandler) // get all permissions
	permissionsGroupApi.Put("/:id", updatePermissionsHandler)

	// Book rooms
	app.Post("/bookRoom", bookRoomHandler)
	//app.Put("/requestBookRoom/:id", requestBookRoomHandler)
	app.Put("/unlockRoom/:id", unlockRoomHandler)
	app.Put("/cancelRoom/:id", cancelRoomHandler)
	// Report
	reportsGroupApi := app.Group("/reports")
	reportsGroupApi.Use(checkPermissionReports)
	//app.Get("/reportRoomUsed/:id", getReportRoomUsedHandler)
	reportsGroupApi.Get("/usedCanceled", getReportUsedCanceledHandler)
	reportsGroupApi.Get("/lockedEmployees", getReportLockedEmployeesHandler)

	app.Listen(":5020")
}

// userContextKey is the key used to store user data in the Fiber context
const userContextKey = "user"

// extractUserFromJWT is a middleware that extracts user data from the JWT token
func extractDataFromJWT(c *fiber.Ctx) error {
	user := &Auth{}
	// Extract the token from the Fiber context (inserted by the JWT middleware)
	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	fmt.Println("extractDataFromJWT")
	user.Email = claims["Email"].(string)
	expFloat64 := claims["Exp"].(float64)
	user.ExpiredAt = time.Unix(int64(expFloat64), 0) // Convert Unix timestamp to time.Time
	// Store the user data in the Fiber context
	c.Locals(userContextKey, user)
	return c.Next()
}

func checkPermissionLocks(c *fiber.Ctx) error {
	token := c.Locals(userContextKey).(*Auth)
	userEmail := token.Email
	query := `SELECT employee_role_id, menu_id
				FROM permission   
				WHERE employee_role_id=(SELECT id FROM employee WHERE email=:1)
				AND menu_id=(SELECT id FROM menu WHERE name=:2)`
	var permission Permission
	err := db.QueryRow(query, userEmail, "Lock Management").Scan(&permission.EmployeeRoleID, &permission.MenuID)
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	return c.Next()
}

func checkPermissionReports(c *fiber.Ctx) error {
	token := c.Locals(userContextKey).(*Auth)
	userEmail := token.Email
	query := `SELECT employee_role_id, menu_id
				FROM permission  
				WHERE employee_role_id=(SELECT id FROM employee WHERE email=:1)
				AND menu_id=(SELECT id FROM menu WHERE name=:2)`
	var permission Permission
	fmt.Println(userEmail)
	err := db.QueryRow(query, userEmail, "Report Management").Scan(&permission.EmployeeRoleID, &permission.MenuID)
	fmt.Println(err)
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	return c.Next()
}

func checkPermissionRooms(c *fiber.Ctx) error {
	token := c.Locals(userContextKey).(*Auth)
	userEmail := token.Email

	query := `SELECT employee_role_id, menu_id  
				FROM permission
				WHERE employee_role_id=(SELECT role_id FROM employee WHERE email=:1)
				AND menu_id=(SELECT id FROM menu WHERE name=:2)`
	var permission Permission
	err := db.QueryRow(query, userEmail, "Room Management").Scan(&permission.EmployeeRoleID, &permission.MenuID)
	if err != nil {
		fmt.Println("fuck2")
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	fmt.Println("fuck1")

	return c.Next()
}

func checkPermissionRoles(c *fiber.Ctx) error {
	token := c.Locals(userContextKey).(*Auth)
	userEmail := token.Email
	query := `SELECT employee_role_id, menu_id  
				FROM permission
				WHERE employee_role_id=(SELECT id FROM employee WHERE email=:1)
				AND menu_id=(SELECT id FROM menu WHERE name=:2)`
	var permission Permission
	err := db.QueryRow(query, userEmail, "Role Management").Scan(&permission.EmployeeRoleID, &permission.MenuID)
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	return c.Next()
}

func checkPermissionDepartments(c *fiber.Ctx) error {
	token := c.Locals(userContextKey).(*Auth)
	userEmail := token.Email
	query := `SELECT employee_role_id, menu_id  
				FROM permission
				WHERE employee_role_id=(SELECT id FROM employee WHERE email=:1)
				AND menu_id=(SELECT id FROM menu WHERE name=:2)`
	var permission Permission
	err := db.QueryRow(query, userEmail, "Department Management").Scan(&permission.EmployeeRoleID, &permission.MenuID)
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	return c.Next()
}

func checkPermissionEmployees(c *fiber.Ctx) error {
	token := c.Locals(userContextKey).(*Auth)
	userEmail := token.Email
	query := `SELECT employee_role_id, menu_id 
				FROM permission
				WHERE employee_role_id=(SELECT id FROM employee WHERE email=:1)
				AND menu_id=(SELECT id FROM menu WHERE name=:2)`
	var permission Permission
	err := db.QueryRow(query, userEmail, "Employee Management").Scan(&permission.EmployeeRoleID, &permission.MenuID)
	if err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}
	return c.Next()
}
