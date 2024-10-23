package main

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/sijms/go-ora/v2"
)

var db *sql.DB

func main() {
	app := fiber.New()

	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	dsn := os.Getenv("DSN")

	db, err = sql.Open("oracle", dsn)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		panic(err)
	}

	app.Use(func(c *fiber.Ctx) error {
		if c.Method() == "OPTIONS" {
			c.Set("Access-Control-Allow-Origin", "*")
			c.Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
			c.Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
			return c.SendStatus(fiber.StatusNoContent) // ส่งสถานะ 204 No Content
		}

		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
		return c.Next()
	})

	app.Get("/home", home)
	app.Get("/LockListManagement", LockListManagement)
	app.Put("/resetEmployeeLock/:id", ResetEmployeeLock)

	fmt.Println("Connected to Oracle Database using go-ora")

	app.Get("/room/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		var room Room

		row := db.QueryRow("SELECT id, name, description, status, cap, room_type_id, address_id FROM room WHERE id = :1", id)

		err = row.Scan(&room.ID, &room.Name, &room.Description, &room.Status, &room.Cap, &room.RoomTypeID, &room.AddressID)

		if err != nil {
			if err == sql.ErrNoRows {
				return c.SendStatus(fiber.StatusNotFound)
			}
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		return c.JSON(room)
	})

	// เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 5020
	app.Listen(":5020")
}
