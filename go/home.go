package main

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	_ "github.com/sijms/go-ora/v2"
)

func formatTime(t string) string {
	if len(t) == 4 {
		t = "0" + t
	}
	t = strings.Replace(t, ".", ":", 1)
	return t
}

func home(c *fiber.Ctx) error {
	fmt.Println("Function home called")
	var rooms []map[string]interface{}
	var params []interface{}

	var placeholderIndex int

	selectedBuilding := c.Query("building", "")
	selectedFloor := c.Query("floor", "")
	selectedRoom := c.Query("room", "")
	selectedType := c.Query("type", "")
	selectedPeople := c.Query("people", "")
	selectedDate := c.Query("date", "")
	begin := c.Query("time", "")
	end := c.Query("time2", "")

	selectedTime := formatTime(begin)
	selectedTime2 := formatTime(end)

	query := `
    SELECT DISTINCT r.id, r.name, r.description, r.room_status_id, r.cap, r.room_type_id, f.name, b.name, rt.name,r.room_pic
    FROM room r 
    JOIN room_type rt ON r.room_type_id = rt.id
    JOIN building_floor bf ON r.address_id = bf.id
    JOIN FLOOR f ON f.id = bf.floor_id
	
    JOIN building b ON b.id = bf.building_id`

	if selectedTime != "" && selectedTime2 != "" && selectedDate != "" {
		query += `
		LEFT JOIN BOOKING book ON r.id = book.room_id 
		AND TRUNC(book.start_time) = TO_DATE(:` + strconv.Itoa(placeholderIndex+1) + `, 'YYYY-MM-DD')
		WHERE (book.room_id IS NULL OR book.status_id  IN (2, 3, 4)) 
		AND (
			(book.status_id IS NULL) OR
			( 
				(:` + strconv.Itoa(placeholderIndex+2) + ` BETWEEN TO_CHAR(book.start_time, 'HH24:MI') AND TO_CHAR(book.end_time - INTERVAL '1' HOUR, 'HH24:MI')) 
				OR (:` + strconv.Itoa(placeholderIndex+3) + ` BETWEEN TO_CHAR(book.start_time + INTERVAL '1' HOUR, 'HH24:MI') AND TO_CHAR(book.end_time, 'HH24:MI')) 
				OR (TO_CHAR(book.start_time + INTERVAL '1' HOUR, 'HH24:MI') BETWEEN :` + strconv.Itoa(placeholderIndex+4) + ` AND :` + strconv.Itoa(placeholderIndex+5) + `)
				OR (TO_CHAR(book.end_time - INTERVAL '1' HOUR, 'HH24:MI') BETWEEN :` + strconv.Itoa(placeholderIndex+6) + ` AND :` + strconv.Itoa(placeholderIndex+7) + `)
				OR (TO_CHAR(book.start_time, 'HH24:MI') < :` + strconv.Itoa(placeholderIndex+8) + ` AND TO_CHAR(book.end_time, 'HH24:MI') > :` + strconv.Itoa(placeholderIndex+9) + `)
				OR (:` + strconv.Itoa(placeholderIndex+10) + ` < TO_CHAR(book.end_time, 'HH24:MI') AND :` + strconv.Itoa(placeholderIndex+11) + ` > TO_CHAR(book.start_time, 'HH24:MI'))
				OR (:` + strconv.Itoa(placeholderIndex+12) + ` >= TO_CHAR(book.end_time, 'HH24:MI') AND :` + strconv.Itoa(placeholderIndex+13) + ` < TO_CHAR(book.start_time, 'HH24:MI'))
			)
		)`

		params = append(params, selectedDate, selectedTime, selectedTime2, selectedTime, selectedTime2, selectedTime, selectedTime2, selectedTime, selectedTime2, selectedTime, selectedTime2, selectedTime, selectedTime2)
		//              			   1            2             3            4
		placeholderIndex += 13

	} else {
		query += ` WHERE 1 = 1 `
	}
	if selectedBuilding != "" {
		query += ` AND b.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedBuilding)
		placeholderIndex += 1

	}
	if selectedFloor != "" {
		query += ` AND f.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedFloor)
		placeholderIndex += 1
	}
	if selectedRoom != "" {

		query += ` AND r.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedRoom)
		placeholderIndex += 1
	}
	if selectedType != "" {
		query += ` AND rt.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedType)
		placeholderIndex += 1
	}
	if selectedPeople != "" {
		cap, err := strconv.Atoi(selectedPeople)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid people count"})
		}
		query += ` AND r.cap >= :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, cap)
		placeholderIndex += 1
	}
	query += ` AND r.room_status_id =1 ORDER BY r.id ASC`

	rows, err := db.Query(query, params...)
	if err != nil {
		fmt.Println("Error fetching rooms:", err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	defer rows.Close()

	for rows.Next() {
		var id, status, cap, roomTypeID int
		var name, description, typeName, floor, building, room_pic string

		if err := rows.Scan(&id, &name, &description, &status, &cap, &roomTypeID, &floor, &building, &typeName, &room_pic); err != nil {
			fmt.Println("Error scanning room:", err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		room_pic = fmt.Sprintf("/img/rooms/%s", room_pic)

		rooms = append(rooms, map[string]interface{}{
			"id":           id,
			"name":         name,
			"description":  description,
			"status":       status,
			"cap":          cap,
			"room_type_id": roomTypeID,
			"floor":        floor,
			"building":     building,
			"type_name":    typeName,
			"room_pic":     room_pic,
		})
	}
	if len(rooms) == 0 {
		suggestion := getRoomSuggestion(selectedDate, selectedTime, selectedTime2, selectedRoom, selectedBuilding, selectedFloor, selectedType, selectedPeople)
		return c.JSON(fiber.Map{
			"message":    "ไม่พบ" + selectedRoom + "ว่างในช่วงเวลาที่เลือก",
			"suggestion": suggestion,
		})
	}

	return c.JSON(rooms)
}

func getRoomSuggestion(date, startTime, endTime, selectedRoom, selectedBuilding, selectedFloor, selectedType, selectedPeople string) string {
	layout := "15:04" // รูปแบบเวลา
	datelayout := "2006-01-02"

	startTimeParsed, err := time.Parse(layout, formatTime(startTime))
	if err != nil {
		return "เกิดข้อผิดพลาดในการแปลงเวลา"
	}
	endTimeParsed, err := time.Parse(layout, formatTime(endTime))
	if err != nil {
		return "เกิดข้อผิดพลาดในการแปลงเวลาจบ"
	}
	datetimeParsed, err := time.Parse(datelayout, date)
	if err != nil {
		return "เกิดข้อผิดพลาดในการแปลงวัน"
	}
	diff := endTimeParsed.Sub(startTimeParsed)
	var i int

	for {
		newStartTime := time.Date(datetimeParsed.Year(), datetimeParsed.Month(), datetimeParsed.Day(), startTimeParsed.Hour(), startTimeParsed.Minute(), 0, 0, time.Local).Add(time.Duration(i) * time.Hour)
		newEndTime := newStartTime.Add(diff)

		newStartTimeStr := newStartTime.Format(layout)
		newEndTimeStr := newEndTime.Format(layout)
		newdateStr := newStartTime.Format(datelayout)

		roomAvailable := checkRoomAvailability(newdateStr, newStartTimeStr, newEndTimeStr, selectedRoom, selectedBuilding, selectedFloor, selectedType, selectedPeople)
		if !roomAvailable {
			return fmt.Sprintf("เวลาแนะนำที่%sว่างใกล้เคียงที่สุดคือในวันที่ %s เวลา %s - %s    หรือลองปรับตัวกรอง", selectedRoom, newdateStr, newStartTimeStr, newEndTimeStr)
		}

		if newEndTime.Hour() >= 18 {
			datetimeParsed = datetimeParsed.AddDate(0, 0, 1)
			i = 0
			continue
		}

		i++
	}

}

func checkRoomAvailability(date, startTime, endTime, selectedRoom, selectedBuilding, selectedFloor, selectedType string, selectedPeople string) bool {
	if date == "" || startTime == "" || endTime == "" {
		fmt.Println("ค่าตัวแปรไม่ถูกต้อง:", date, startTime, endTime)
		return false
	}
	var params []interface{}
	var placeholderIndex int

	start := formatTime(startTime)
	end := formatTime(endTime)

	query := ` SELECT COUNT(*) 
    FROM room r 
    JOIN room_type rt ON r.room_type_id = rt.id
    JOIN building_floor bf ON r.address_id = bf.id
    JOIN FLOOR f ON f.id = bf.floor_id`
	if start != "" && end != "" && date != "" {
		query += `
		LEFT JOIN BOOKING book ON r.id = book.room_id 
		AND TRUNC(book.start_time) = TO_DATE(:` + strconv.Itoa(placeholderIndex+1) + `, 'YYYY-MM-DD')
		WHERE (book.room_id IS NULL OR book.status_id  IN (2, 3, 4)) 
		AND (
			(book.status_id IS NULL) OR
			( 
				(:` + strconv.Itoa(placeholderIndex+2) + ` BETWEEN TO_CHAR(book.start_time, 'HH24:MI') AND TO_CHAR(book.end_time - INTERVAL '1' HOUR, 'HH24:MI')) 
				OR (:` + strconv.Itoa(placeholderIndex+3) + ` BETWEEN TO_CHAR(book.start_time + INTERVAL '1' HOUR, 'HH24:MI') AND TO_CHAR(book.end_time, 'HH24:MI')) 
				OR (TO_CHAR(book.start_time + INTERVAL '1' HOUR, 'HH24:MI') BETWEEN :` + strconv.Itoa(placeholderIndex+4) + ` AND :` + strconv.Itoa(placeholderIndex+5) + `)
				OR (TO_CHAR(book.end_time - INTERVAL '1' HOUR, 'HH24:MI') BETWEEN :` + strconv.Itoa(placeholderIndex+6) + ` AND :` + strconv.Itoa(placeholderIndex+7) + `)
				OR (TO_CHAR(book.start_time, 'HH24:MI') < :` + strconv.Itoa(placeholderIndex+8) + ` AND TO_CHAR(book.end_time, 'HH24:MI') > :` + strconv.Itoa(placeholderIndex+9) + `)
				OR (:` + strconv.Itoa(placeholderIndex+10) + ` < TO_CHAR(book.end_time, 'HH24:MI') AND :` + strconv.Itoa(placeholderIndex+11) + ` > TO_CHAR(book.start_time, 'HH24:MI'))
				OR (:` + strconv.Itoa(placeholderIndex+12) + ` >= TO_CHAR(book.end_time, 'HH24:MI') AND :` + strconv.Itoa(placeholderIndex+13) + ` < TO_CHAR(book.start_time, 'HH24:MI'))
			)
		)`

		params = append(params, date, start, end, start, end, start, end, start, end, start, end, start, end)
		//              			   1            2             3            4
		placeholderIndex += 13

	} else {
		query += ` WHERE 1 = 1 `
	}
	if selectedBuilding != "" {
		query += ` AND b.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedBuilding)
		placeholderIndex += 1

	}
	if selectedFloor != "" {
		query += ` AND f.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedFloor)
		placeholderIndex += 1
	}
	if selectedRoom != "" {

		query += ` AND r.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedRoom)
		placeholderIndex += 1
	}
	if selectedType != "" {
		query += ` AND rt.name = :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, selectedType)
		placeholderIndex += 1
	}
	if selectedPeople != "" {
		cap, err := strconv.Atoi(selectedPeople)
		if err != nil {
		}
		query += ` AND r.cap >= :` + strconv.Itoa(placeholderIndex+1)
		params = append(params, cap)
		placeholderIndex += 1
	}
	query += ` AND r.room_status_id =1 ORDER BY r.id ASC`
	var count int
	err := db.QueryRow(query, params...).Scan(&count)
	if err != nil {
		fmt.Println("Error checking room availability:", err)
		return false
	}

	return count == 0
}
