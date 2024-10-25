package main

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/jwt/v2"
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
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Login
	app.Post("/login", loginHandler)
	app.Post("/register", registerHandler)
	app.Get("/home", getHomeHandler)
	// JWT Middleware
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}))
	// Middleware to extract user data from JWT
	app.Use(extractDataFromJWT)
	// API HANDLER
	//app.Get("/userBookings", getUserBookingsHandler)

	app.Get("/bookings", getBookingsHandler)
	app.Get("/rooms", getRoomsHandler)
	app.Get("/rooms/:id", getRoomHandler)
	app.Post("/rooms", createRoomHandler)
	app.Put("/rooms/:id", updateRoomHandler)
	app.Delete("/rooms/:id", deleteRoomHandler)

	app.Get("/LockListManagement", LockListManagement)
	app.Put("/resetEmployeeLock/:id", ResetEmployeeLock)

	app.Get("/departments", getDepartmentsHandler)
	app.Get("/roles", getRolesHandler)
	app.Get("/menus", getMenusHandler)
	// Employees
	app.Get("/employees", getEmployeesHandler)
	app.Get("/employees/:id", getEmployeeHandler)
	app.Post("/employees", createEmlpoyeeHandler)
	app.Put("/employees/:id", updateEmployeeHandler)
	// Permissions
	app.Get("/permissions", getPermissionsHandler)
	//app.Get("/userPermission", gerUserPermissionHandler)
	app.Put("/permissions/:id", updatePermissionsHandler)

	// Book rooms
	//app.Post("/bookRoom", bookRoomHandler)
	//app.Put("/requestBookRoom/:id", requestBookRoomHandler)
	app.Put("/unlockRoom/:id", unlockRoomHandler)
	app.Put("/cancelRoom/:id", cancelRoomHandler)
	// Report
	//app.Get("/reportRoomUsed/:id", getReportRoomUsedHandler)
	app.Get("/reportUsedCanceled", getReportUsedCanceledHandler)
	app.Get("/reportLockEmployee", getReportLockEmployeeHandler)

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

	user.Email = claims["Email"].(string)
	user.ExpiredAt = claims["Exp"].(time.Time)
	// Store the user data in the Fiber context
	c.Locals(userContextKey, user)
	return c.Next()
}
