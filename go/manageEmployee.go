package main

import (
	"database/sql"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

// ManageEmployee แสดงข้อมูลพนักงานทั้งหมด
func ManageEmployee(c *fiber.Ctx) error {
	var profiletmp sql.NullString

	rows, err := db.Query(`
		SELECT e.id, e.name, e.lname, e.nlock, e.sex, e.email, e.password, e.dept_id, e.role_id, er.name AS role_name, dp.name AS dept_name,e.profile_image
		FROM EMPLOYEE e 
		JOIN EMPLOYEE_ROLE er ON e.role_id = er.id
		JOIN DEPARTMENT dp ON e.dept_id = dp.id
	`)
	if err != nil {
		fmt.Println("Error fetching employee data:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch employee data"})
	}
	defer rows.Close()

	var employees []map[string]interface{}
	for rows.Next() {
		var id, nlock int
		var name, lname, sex, email, password, role_name, dept_name, profile_image string
		var dept_id, role_id int

		if err := rows.Scan(&id, &name, &lname, &nlock, &sex, &email, &password, &dept_id, &role_id, &role_name, &dept_name, &profiletmp); err != nil {
			fmt.Println("Error scanning row:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to scan employee data"})
		}
		if profiletmp.Valid {
			profile_image = profiletmp.String
		} else {
			profile_image = "profile.png"
		}
		profile_image = fmt.Sprintf("/img/profile/%s", profile_image)
		fmt.Println(profile_image)

		employees = append(employees, map[string]interface{}{
			"id":            id,
			"name":          name,
			"lname":         lname,
			"nlock":         nlock,
			"sex":           sex,
			"email":         email,
			"password":      password,
			"dept_id":       dept_id,
			"role_id":       role_id,
			"role_name":     role_name,
			"dept_name":     dept_name,
			"profile_image": profile_image,
		})
	}

	if len(employees) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "No employees found"})
	}

	return c.JSON(employees)
}

// AddEmployee เพิ่มข้อมูลพนักงานใหม่
func AddEmployee(c *fiber.Ctx) error {
	type Employee struct {
		ID       int    `json:"id"`
		Name     string `json:"name"`
		Lname    string `json:"lname"`
		Nlock    int    `json:"nlock"`
		Sex      string `json:"sex"`
		Email    string `json:"email"`
		Password string `json:"password"`
		DeptID   int    `json:"dept_id"`
		RoleID   int    `json:"role_id"`
	}

	var employee Employee

	// Parsing request body
	if err := c.BodyParser(&employee); err != nil {
		fmt.Println("Error parsing JSON:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	// SQL Query สำหรับการเพิ่มข้อมูล
	query := `
        INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id)
        VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)
    `

	_, err := db.Exec(query, employee.ID, employee.Name, employee.Lname, employee.Nlock, employee.Sex, employee.Email, employee.Password, employee.DeptID, employee.RoleID)
	if err != nil {
		fmt.Println("Error inserting employee:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to add employee"})
	}

	return c.JSON(fiber.Map{"message": "Employee added successfully"})
}

// UpdateEmployee แก้ไขข้อมูลพนักงาน
func UpdateEmployee(c *fiber.Ctx) error {
	id := c.Params("id")

	type Employee struct {
		Name     string `json:"name"`
		Lname    string `json:"lname"`
		Nlock    int    `json:"nlock"`
		Sex      string `json:"sex"`
		Email    string `json:"email"`
		Password string `json:"password"`
		DeptID   int    `json:"dept_id"`
		RoleID   int    `json:"role_id"`
	}

	var employee Employee
	if err := c.BodyParser(&employee); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	_, err := db.Exec(`
		UPDATE employee SET name = :1, lname = :2, nlock = :3, sex = :4, email = :5, password = :6, dept_id = :7, role_id = :8
		WHERE id = :9
	`, employee.Name, employee.Lname, employee.Nlock, employee.Sex, employee.Email, employee.Password, employee.DeptID, employee.RoleID, id)

	if err != nil {
		fmt.Println("Error updating employee:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update employee"})
	}

	return c.JSON(fiber.Map{"message": "Employee updated successfully"})
}

// DeleteEmployee ลบข้อมูลพนักงาน
func DeleteEmployee(c *fiber.Ctx) error {
	id := c.Params("id")

	_, err := db.Exec("DELETE FROM employee WHERE id = :1", id)
	if err != nil {
		fmt.Println("Error deleting employee:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete employee"})
	}

	return c.JSON(fiber.Map{"message": "Employee deleted successfully"})
}
