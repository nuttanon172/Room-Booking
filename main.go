package main

import (
	"database/sql"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/sijms/go-ora/v2"
	"os"
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

	// API HANDLER
	app.Get("/room/:id", getRoomHandler)
	app.Get("/rooms", getRoomsHandler)
	app.Get("/departments", getDepartmentsHandler)
	app.Get("/roles", getRolesHandler)
	app.Get("/menus", getMenusHandler)
	app.Get("/permissions", getPermissionsHandler)
	app.Get("/bookings", getBookingsHandler)
	// Login
	app.Post("/login", login)

	app.Listen(":5020")
}
