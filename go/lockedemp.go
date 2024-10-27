package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	_ "github.com/sijms/go-ora/v2"
)

func LockListManagement(c *fiber.Ctx) error {
	rows, err := db.Query(`
	   SELECT e.id, e.name, e.lname,e.nlock, e.dept_id, er.name,dp.name,e.sex
	FROM EMPLOYEE e
	JOIN EMPLOYEE_ROLE er ON e.role_id = er.id
	JOIN DEPARTMENT dp ON e.dept_id = dp.id`)
	fmt.Println("LockListManagement")
	if err != nil {
		fmt.Println("Error fetching employee info:", err) // แสดงข้อผิดพลาดใน console
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	var employeeInfos []map[string]interface{} // สร้าง slice เพื่อเก็บข้อมูลพนักงาน

	for rows.Next() {
		var name string
		var lname string
		var deptID int
		var role_name string
		var id string
		var nlock int
		var dpname string
		var sex string

		if err := rows.Scan(&id, &name, &lname, &nlock, &deptID, &role_name, &dpname, &sex); err != nil {
			fmt.Println("Error scanning row:", err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		employeeInfos = append(employeeInfos, map[string]interface{}{
			"id":        id,
			"name":      name,
			"lname":     lname,
			"dept_id":   deptID,
			"role_name": role_name,
			"nlock":     nlock,
			"dpname":    dpname,
			"sex":       sex,
		})
	}

	return c.JSON(employeeInfos)
}
func ResetEmployeeLock(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.Exec("UPDATE EMPLOYEE SET nlock = 0 WHERE ID = :1 ", id)
	fmt.Println("id", id)
	if err != nil {
		fmt.Println("Error updating nlock:", err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.SendStatus(fiber.StatusOK)
}
