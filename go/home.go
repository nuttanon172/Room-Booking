package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	_ "github.com/sijms/go-ora/v2"
)

// เปลี่ยนชื่อฟังก์ชันเพื่อหลีกเลี่ยงการซ้ำกัน
func getRoomsHandler1(c *fiber.Ctx) error {
	var rooms []map[string]interface{}

	// ดึงข้อมูลจากฐานข้อมูล
	rows, err := db.Query(`
        SELECT r.id, r.name, r.description, r.status, r.cap, r.room_type_id, r.address_id, rt.name 
        FROM room r
        JOIN room_type rt ON r.room_type_id = rt.id
    `)

	if err != nil {
		fmt.Println("Error fetching rooms:", err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer rows.Close()

	// ลูปผ่านแถวที่ได้รับมาและเพิ่มข้อมูลในรูปแบบ map
	for rows.Next() {
		var id, status, cap, roomTypeID, addressID int
		var name, description, typeName string

		if err := rows.Scan(&id, &name, &description, &status, &cap, &roomTypeID, &addressID, &typeName); err != nil {
			fmt.Println("Error scanning room:", err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		// สร้างแผนที่และเพิ่มลงใน slice
		rooms = append(rooms, map[string]interface{}{
			"id":           id,
			"name":         name,
			"description":  description,
			"status":       status,
			"cap":          cap,
			"room_type_id": roomTypeID,
			"address_id":   addressID,
			"type_name":    typeName,
		})
	}

	fmt.Printf("Rooms: %+v\n", rooms) // แสดงข้อมูลห้องทั้งหมด
	return c.JSON(rooms)              // ส่งคืนข้อมูลในรูปแบบ JSON
}
