package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	_ "github.com/sijms/go-ora/v2"
)

var db *sql.DB

func initDatabase() error {
	// ดึงค่า DSN จาก .env
	dsn := os.Getenv("DSN")

	var err error
	// เปิดการเชื่อมต่อฐานข้อมูล
	db, err = sql.Open("oracle", dsn)
	if err != nil {
		return fmt.Errorf("error connecting to the database: %v", err)
	}

	// ตรวจสอบการเชื่อมต่อ
	if err := db.Ping(); err != nil {
		return fmt.Errorf("error pinging the database: %v", err)
	}

	return nil
}

func main() {
	// โหลดค่า .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// เริ่มต้นเชื่อมต่อฐานข้อมูล
	if err := initDatabase(); err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	app := fiber.New()

	// ตั้งค่า CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	}))

	// เส้นทาง API ต่างๆ
	app.Get("/home", homepageHandler)
	app.Get("/LockListManagement", LockListManagement)
	app.Put("/resetEmployeeLock/:id", ResetEmployeeLock)
	app.Get("/Profile", Profile)
	app.Put("/EditProfile", EditProfile) // เส้นทางสำหรับแก้ไขข้อมูลพนักงาน
	app.Get("/room/:id", getRoomByID)

	fmt.Println("Connected to Oracle Database using go-ora")

	// เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 5020
	log.Fatal(app.Listen(":5020"))
}

// ฟังก์ชันแสดงข้อมูลห้อง
func getRoomByID(c *fiber.Ctx) error {
	id := c.Params("id")

	var room Room
	row := db.QueryRow(`
        SELECT id, name, description, status, cap, room_type_id, address_id 
        FROM room WHERE id = :1`, id)

	err := row.Scan(&room.ID, &room.Name, &room.Description, &room.Status, &room.Cap, &room.RoomTypeID, &room.AddressID)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Room not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Internal Server Error"})
	}

	return c.JSON(room)
}

// ฟังก์ชันแก้ไขข้อมูลพนักงาน
func EditProfile(c *fiber.Ctx) error {
	// สร้าง struct สำหรับรับข้อมูลที่ส่งมาจากฟรอนต์เอนด์
	type UpdateEmployee struct {
		ID       int    `json:"id"`
		Name     string `json:"name"`
		Lname    string `json:"lname"`
		Email    string `json:"email"`
		Sex      string `json:"sex"`
		DeptID   int    `json:"dept_id"`
		RoleID   int    `json:"role_id"`
		Password string `json:"password"`
	}

	var employee UpdateEmployee

	// แปลงข้อมูล JSON จาก request body ให้เป็น struct
	if err := c.BodyParser(&employee); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// เตรียมคำสั่ง SQL สำหรับอัปเดตข้อมูล
	query := `
		UPDATE employee 
		SET name = :1, lname = :2, email = :3, sex = :4, dept_id = :5, role_id = :6, password = :7
		WHERE id = :8
	`

	// เตรียม statement และส่งข้อมูลไปยังฐานข้อมูล
	_, err := db.Exec(query, employee.Name, employee.Lname, employee.Email, employee.Sex, employee.DeptID, employee.RoleID, employee.Password, employee.ID)
	if err != nil {
		fmt.Println("Error updating employee:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update employee",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Employee updated successfully",
	})
}

// ฟังก์ชัน mock สำหรับ API ต่าง ๆ
func homepageHandler(c *fiber.Ctx) error {
	return c.SendString("Home Page")
}

func LockListManagement(c *fiber.Ctx) error {
	return c.SendString("Lock List Management")
}

func ResetEmployeeLock(c *fiber.Ctx) error {
	return c.SendString("Reset Employee Lock")
}

func Profile(c *fiber.Ctx) error {
	return c.SendString("Profile")
}

// โครงสร้างของ Room (สมมุติ)
type Room struct {
	ID         int
	Name       string
	Description string
	Status     string
	Cap        int
	RoomTypeID int
	AddressID  int
}
