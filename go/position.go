package main

import (
	
	"fmt"
	"github.com/gofiber/fiber/v2"
	_ "github.com/sijms/go-ora/v2"
)

// Position โครงสร้างสำหรับข้อมูลตำแหน่ง
type Position struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// GetPositions ฟังก์ชันสำหรับดึงข้อมูลตำแหน่งทั้งหมด
func GetPositions(c *fiber.Ctx) error {
	rows, err := db.Query("SELECT id, name FROM employee_role")
	if err != nil {
		fmt.Println("Error fetching positions:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch positions"})
	}
	defer rows.Close()

	var positions []Position
	for rows.Next() {
		var position Position
		if err := rows.Scan(&position.ID, &position.Name); err != nil {
			fmt.Println("Error scanning row:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan position data"})
		}
		positions = append(positions, position)
	}

	return c.JSON(positions)
}

// AddPosition ฟังก์ชันสำหรับเพิ่มตำแหน่งใหม่
func AddPosition(c *fiber.Ctx) error {
    var position Position
    if err := c.BodyParser(&position); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
    }

    _, err := db.Exec("INSERT INTO employee_role (id, name) VALUES (:1, :2)", position.ID, position.Name)
    if err != nil {
        fmt.Println("Error adding position:", err)
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to add position"})
    }

    return c.JSON(fiber.Map{"message": "Position added successfully"})
}


// UpdatePosition ฟังก์ชันสำหรับแก้ไขตำแหน่ง
// UpdatePosition ฟังก์ชันสำหรับแก้ไขตำแหน่ง
// UpdatePosition ฟังก์ชันสำหรับแก้ไขตำแหน่ง
func UpdatePosition(c *fiber.Ctx) error {
    id := c.Params("id") // ดึง id จาก URL
    var position Position
    if err := c.BodyParser(&position); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
    }

    _, err := db.Exec("UPDATE employee_role SET name = :1 WHERE id = :2", position.Name, id)
    if err != nil {
        fmt.Println("Error updating position:", err)
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update position"})
    }

    return c.JSON(fiber.Map{"message": "Position updated successfully"})
}



// DeletePosition ฟังก์ชันสำหรับลบตำแหน่ง
func DeletePosition(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.Exec("DELETE FROM employee_role WHERE id = :1", id)
	if err != nil {
		fmt.Println("Error deleting position:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete position"})
	}

	return c.JSON(fiber.Map{"message": "Position deleted successfully"})
}
