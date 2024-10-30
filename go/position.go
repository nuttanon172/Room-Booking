package main

import (
	"fmt"
    //"database/sql"
	"github.com/gofiber/fiber/v2"
)

// Structs
type RoleAccess struct {
	MenuName string `json:"menu_name"`
}

// โครงสร้าง Position และ RoleAccess
type Position struct {
	ID         int      `json:"id"`
	Name       string   `json:"name"`
	RoleAccess []string `json:"role_access"`  // จะเก็บชื่อของเมนูที่ตำแหน่งนี้สามารถเข้าถึงได้
}

// ฟังก์ชัน GetPositions
func GetPositions(c *fiber.Ctx) error {
	query := `
		SELECT er.id, er.name, m.name
		FROM employee_role er
		JOIN permission p ON er.id = p.employee_role_id
		JOIN menu m ON p.menu_id = m.id
		ORDER BY er.id, m.id
	`

	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("Error fetching positions:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch positions"})
	}
	defer rows.Close()

	var positions []Position
	positionsMap := make(map[int]*Position)

	for rows.Next() {
		var positionID int
		var positionName, menuName string
		if err := rows.Scan(&positionID, &positionName, &menuName); err != nil {
			fmt.Println("Error scanning row:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan position data"})
		}

		// ตรวจสอบว่ามีตำแหน่งอยู่ใน map หรือไม่
		if existingPosition, ok := positionsMap[positionID]; ok {
			// ถ้ามีอยู่แล้ว ให้เพิ่ม menuName ใน RoleAccess
			existingPosition.RoleAccess = append(existingPosition.RoleAccess, menuName)
		} else {
			// ถ้าไม่มี ให้สร้างตำแหน่งใหม่แล้วเพิ่มเข้า map
			position := Position{
				ID:         positionID,
				Name:       positionName,
				RoleAccess: []string{menuName},
			}
			positionsMap[positionID] = &position
			positions = append(positions, position)
		}
	}

	return c.JSON(positions)
}










// GetAllMenus: Get all available menus
func GetAllMenus(c *fiber.Ctx) error {
	query := `SELECT id, name FROM menu`

	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("Error fetching menus:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch menus"})
	}
	defer rows.Close()

	var menus []Menu
	for rows.Next() {
		var menu Menu
		if err := rows.Scan(&menu.ID, &menu.Name); err != nil {
			fmt.Println("Error scanning menu row:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan menu data"})
		}
		menus = append(menus, menu)
	}

	return c.JSON(menus)
}

// AddPosition ฟังก์ชันสำหรับเพิ่มตำแหน่งใหม่พร้อมสิทธิ์เมนู
func AddPosition(c *fiber.Ctx) error {
	var position Position
	if err := c.BodyParser(&position); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	// เพิ่มตำแหน่งใหม่ใน employee_role
	_, err := db.Exec("INSERT INTO employee_role (id, name) VALUES (:1, :2)", position.ID, position.Name)
	if err != nil {
		fmt.Println("Error adding position:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to add position"})
	}

	// เพิ่มสิทธิ์เมนูใน permission
	for _, menuName := range position.RoleAccess {
		_, err = db.Exec(`
			INSERT INTO permission (menu_id, employee_role_id)
			VALUES ((SELECT id FROM menu WHERE name = :1), :2)`, menuName, position.ID)
		if err != nil {
			fmt.Println("Error adding permission:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to add permission"})
		}
	}

	return c.JSON(fiber.Map{"message": "Position added successfully"})
}

// UpdatePosition ฟังก์ชันสำหรับแก้ไขตำแหน่ง
func UpdatePosition(c *fiber.Ctx) error {
	id := c.Params("id")
	var position Position
	if err := c.BodyParser(&position); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	// อัปเดตข้อมูลใน employee_role
	_, err := db.Exec("UPDATE employee_role SET name = :1 WHERE id = :2", position.Name, id)
	if err != nil {
		fmt.Println("Error updating position:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update position"})
	}

	// ลบสิทธิ์เมนูเก่าใน permission
	_, err = db.Exec("DELETE FROM permission WHERE employee_role_id = :1", id)
	if err != nil {
		fmt.Println("Error deleting old permissions:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete old permissions"})
	}

	// เพิ่มสิทธิ์เมนูใหม่
	for _, menuName := range position.RoleAccess {
		_, err = db.Exec(`
			INSERT INTO permission (menu_id, employee_role_id)
			VALUES ((SELECT id FROM menu WHERE name = :1), :2)`, menuName, id)
		if err != nil {
			fmt.Println("Error adding new permission:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to add new permissions"})
		}
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

	// ลบสิทธิ์เมนูที่เกี่ยวข้องทั้งหมด
	_, err = db.Exec("DELETE FROM permission WHERE employee_role_id = :1", id)
	if err != nil {
		fmt.Println("Error deleting permissions:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete permissions"})
	}

	return c.JSON(fiber.Map{"message": "Position deleted successfully"})
}
