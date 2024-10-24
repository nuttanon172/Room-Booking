package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/jwt/v2"
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
	app.Get("/bookings", getBookingsHandler)
	// JWT Middleware
	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}))

	// API HANDLER
	//app.Get("/home", getHomeHandler)
	app.Post("/rooms", createRoomHandler)
	app.Get("/room/:id", getRoomHandler)
	app.Put("/room/:id", updateRoomHandler)
	app.Delete("/room/:id", deleteRoomHandler)
	app.Get("/rooms", getRoomsHandler)

	app.Get("/departments", getDepartmentsHandler)
	app.Get("/roles", getRolesHandler)
	app.Get("/menus", getMenusHandler)
	app.Get("/permissions", getPermissionsHandler)

	app.Listen(":5020")
}
