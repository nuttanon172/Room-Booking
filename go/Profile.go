package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	_ "github.com/sijms/go-ora/v2"
)

// Profile แสดงข้อมูลพนักงานที่ถูกล็อค
func Profile1(c *fiber.Ctx) error {
	// Query ข้อมูลพนักงานที่ถูกล็อค
	rows, err := db.Query(`
	   SELECT e.id, e.name, e.lname, e.nlock, e.dept_id, er.name, dp.name, e.email, e.sex
	   FROM EMPLOYEE_LOCKED el 
	   JOIN EMPLOYEE e ON el.EMPLOYEE_ID = e.ID
	   JOIN EMPLOYEE_ROLE er ON e.role_id = er.id
	   JOIN DEPARTMENT dp ON e.dept_id = dp.id`)
	if err != nil {
		fmt.Println("Error fetching employee info:", err) // แสดงข้อผิดพลาดใน console
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer rows.Close() // ปิด rows หลังจากการ query เสร็จสิ้น

	// สร้าง slice เพื่อเก็บข้อมูลพนักงาน
	var employeeInfos []map[string]interface{}

	// Loop ผ่านผลลัพธ์
	for rows.Next() {
		var name, lname, role_name, dpname, email, sex string
		var deptID, nlock int
		var id string

		// Scan ค่าจาก row เข้าไปในตัวแปร
		if err := rows.Scan(&id, &name, &lname, &nlock, &deptID, &role_name, &dpname, &email, &sex); err != nil {
			fmt.Println("Error scanning row:", err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		// เก็บข้อมูลพนักงานเป็น map
		employeeInfos = append(employeeInfos, map[string]interface{}{
			"id":        id,
			"name":      name,
			"lname":     lname,
			"dept_id":   deptID,
			"role_name": role_name,
			"nlock":     nlock,
			"dpname":    dpname,
			"email":     email,
			"sex":       sex,
		})
	}

	// ตรวจสอบหากไม่มีข้อมูล
	if err = rows.Err(); err != nil {
		fmt.Println("Error after iterating rows:", err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	// ส่งข้อมูลกลับเป็น JSON
	return c.JSON(employeeInfos)
}

// EditProfile อัปเดตข้อมูลพนักงาน
func EditProfile1(c *fiber.Ctx) error {
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



