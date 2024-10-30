package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	_ "github.com/sijms/go-ora/v2"
)

// Profile แสดงข้อมูลพนักงานที่ถูกล็อค
func Profile(c *fiber.Ctx) error {
	rows, err := db.Query(`
		SELECT e.id, e.name, e.lname, e.dept_id, er.name AS role_name, dp.name AS dept_name, e.sex, e.email
		FROM EMPLOYEE e 
		JOIN EMPLOYEE_ROLE er ON e.role_id = er.id
		JOIN DEPARTMENT dp ON e.dept_id = dp.id
	`)
	if err != nil {
		fmt.Println("Error fetching employee data:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch employee data"})
	}
	defer rows.Close()

	var employeeInfos []map[string]interface{}

	for rows.Next() {
		var id int
		var name, lname, role_name, dpname, sex, email string
		var deptID int

		// สแกนข้อมูลจาก query result
		if err := rows.Scan(&id, &name, &lname, &deptID, &role_name, &dpname, &sex, &email); err != nil {
			fmt.Println("Error scanning row:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan employee data"})
		}

		// เพิ่มข้อมูลพนักงานลงใน slice
		employeeInfos = append(employeeInfos, map[string]interface{}{
			"id":        id,
			"name":      name,
			"lname":     lname,
			"dept_id":   deptID,
			"role_name": role_name,
			"dpname":    dpname,
			"sex":       sex,
			"email":     email,
		})
	}

	if len(employeeInfos) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "No employee found"})
	}

	// ส่งข้อมูลพนักงานกลับในรูปแบบ JSON
	return c.JSON(employeeInfos)
}

// EditProfile อัปเดตข้อมูลพนักงาน
func EditProfile(c *fiber.Ctx) error {
	type UpdateEmployee struct {
		ID     int    `json:"id"`
		Name   string `json:"name"`
		Lname  string `json:"lname"`
		Email  string `json:"email"`
		Sex    string `json:"sex"`
		DeptID int    `json:"dept_id"`
		RoleID int    `json:"role_id"`
	}

	var employee UpdateEmployee

	// Parsing request body
	if err := c.BodyParser(&employee); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	fmt.Printf("Updating employee: %+v\n", employee)

	// SQL query to update the employee
	query := `
        UPDATE employee 
        SET name = :1, lname = :2, email = :3, sex = :4, dept_id = :5, role_id = :6
        WHERE id = :7
    `

	// Executing the query with data from the parsed employee struct
	_, err := db.Exec(query, employee.Name, employee.Lname, employee.Email, employee.Sex, employee.DeptID, employee.RoleID, employee.ID)
	if err != nil {
		fmt.Println("Error executing query:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update employee",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Employee updated successfully",
	})
}

// GetRoles ดึงข้อมูลรายการตำแหน่ง (Roles)
func GetRoles(c *fiber.Ctx) error {
	rows, err := db.Query(`SELECT id, name FROM employee_role`)
	if err != nil {
		fmt.Println("Error fetching roles:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch roles",
		})
	}
	defer rows.Close()

	var roles []map[string]interface{}
	for rows.Next() {
		var id int
		var name string
		if err := rows.Scan(&id, &name); err != nil {
			fmt.Println("Error scanning role:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to scan role",
			})
		}

		roles = append(roles, map[string]interface{}{
			"id":   id,
			"name": name,
		})
	}

	return c.JSON(roles)
}

// GetDepartments ดึงข้อมูลรายการแผนก (Departments)
func GetDepartments(c *fiber.Ctx) error {
	rows, err := db.Query(`SELECT id, name FROM department`)
	if err != nil {
		fmt.Println("Error fetching departments:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch departments",
		})
	}
	defer rows.Close()

	var departments []map[string]interface{}
	for rows.Next() {
		var id int
		var name string
		if err := rows.Scan(&id, &name); err != nil {
			fmt.Println("Error scanning department:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to scan department",
			})
		}

		departments = append(departments, map[string]interface{}{
			"id":   id,
			"name": name,
		})
	}

	return c.JSON(departments)
}
