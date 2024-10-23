package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func getRoom(id int) (Room, error) {
	var room Room
	row := db.QueryRow("SELECT id, name, description, status, cap, room_type_id, address_id FROM room WHERE id = :1", id)
	err := row.Scan(&room.ID, &room.Name, &room.Description, &room.Status, &room.Cap, &room.RoomTypeID, &room.AddressID)
	if err != nil {
		return Room{}, err
	}
	return room, nil
}

func getRooms() ([]Room, error) {
	var rooms []Room
	rows, err := db.Query("SELECT id, name, description, status, cap, room_type_id, address_id FROM room")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var room Room
		err = rows.Scan(&room.ID, &room.Name, &room.Description, &room.Status, &room.Cap, &room.RoomTypeID, &room.AddressID)
		if err != nil {
			return nil, err
		}
		rooms = append(rooms, room)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return rooms, nil
}

func getDepartments() ([]Department, error) {
	var departments []Department
	rows, err := db.Query("SELECT id, name FROM department")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var dept Department
		err := rows.Scan(&dept.ID, &dept.Name)
		if err != nil {
			return nil, err
		}
		departments = append(departments, dept)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return departments, nil
}

func getRoles() ([]EmployeeRole, error) {
	var roles []EmployeeRole
	rows, err := db.Query("SELECT id, name FROM employee_role")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var role EmployeeRole
		err = rows.Scan(&role.ID, &role.Name)
		if err != nil {
			return nil, err
		}
		roles = append(roles, role)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return roles, nil
}

func getMenus() ([]Menu, error) {
	var menus []Menu
	rows, err := db.Query("SELECT id, name FROM menu")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var menu Menu
		err = rows.Scan(&menu.ID, &menu.Name)
		if err != nil {
			return nil, err
		}
		menus = append(menus, menu)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return menus, nil
}

func getPermissions() ([]Permission, error) {
	var permiss []Permission
	rows, err := db.Query("SELECT id, employee_role_id, menu_id FROM permission")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var permis Permission
		err = rows.Scan(&permis.ID, &permis.EmployeeRoleID, &permis.MenuID)
		if err != nil {
			return nil, err
		}
		permiss = append(permiss, permis)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return permiss, nil
}

func getBookings() ([]Booking, error) {
	var bookings []Booking
	rows, err := db.Query("SELECT id, booking_date, start_time, end_time, request_message, COALESCE(approved_id, 0), status_id, room_id, emp_id from booking")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var booking Booking
		err = rows.Scan(&booking.ID, &booking.BookingDate, &booking.StartTime,
			&booking.EndTime, &booking.RequestMessage, &booking.ApprovedID,
			&booking.StatusID, &booking.RoomID, &booking.EmpID,
		)
		if err != nil {
			return nil, err
		}
		bookings = append(bookings, booking)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return bookings, nil
}

func verifyUser(email string, password string) error {
	var user User
	row := db.QueryRow("SELECT email, password FROM employee WHERE email=:1 AND password=:2", email, password)
	err := row.Scan(&user.Email, &user.Password)
	fmt.Println(email, password)
	if err != nil {
		return fiber.ErrUnauthorized
	}
	return nil
}
