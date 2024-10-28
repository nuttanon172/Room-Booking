package main

import (
	"database/sql"
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

func updateRoom(id int, room *Room) error {
	query := `
		UPDATE room
		SET name=:1, description=:2, status=:3, cap=:4, room_type_id=:5, address_id=:6
		WHERE id=:7
	`
	_, err := db.Exec(query, room.Name, room.Description, room.Status, room.Cap, room.RoomTypeID, room.AddressID, id)
	if err != nil {
		return err
	}
	return nil
}

func createRoom(room *Room) error {
	var id int

	fmt.Printf("room.id :%T\n", room.ID)
	fmt.Printf("room.Name :%T\n", room.Name)
	fmt.Printf("room.Description :%T\n", room.Description)
	fmt.Printf("room.Status :%T\n", room.Status)
	fmt.Printf("room.Cap :%T\n", room.Cap)
	fmt.Printf("room.RoomTypeID :%T\n", room.RoomTypeID)
	fmt.Printf("room.AddressID :%T\n", room.AddressID)
	// fmt.Printf("room.Roompic :%T\n", room.Roompic)
	fmt.Println("room.RoomTypeID Value :", room.RoomTypeID)
	fmt.Println("room.AddressID Value :", room.AddressID)

	err := db.QueryRow("SELECT id from room WHERE id=:1", room.ID).
		Scan(&id)
	if err != sql.ErrNoRows {
		fmt.Println("err")

		return fiber.ErrConflict
	}
	query := `
		INSERT INTO room (id, name, description, status, cap, room_type_id, address_id ,room_image)
		VALUES (:1, :2, :3, :4, :5, :6, :7, :8)
	`
	_, err = db.Exec(query, room.ID, room.Name, room.Description, room.Status, room.Cap, room.RoomTypeID, room.AddressID, room.Roompic)
	if err != nil {
		fmt.Println("err Exec")

		return err
	}
	return nil
}

func deleteRoom(id int) error {
	query := `
		DELETE FROM room
		WHERE id=:1
	`
	_, err := db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}

func getpic() ([]Roompic, error) {
	fmt.Println("getpic")

	var Roompics []Roompic
	rows, err := db.Query(`SELECT id, room_image FROM room`)
	if err != nil {
		fmt.Println("Error querying database:", err)
		return nil, err
	}
	defer rows.Close() // ปิด rows เมื่อเสร็จสิ้น

	for rows.Next() {
		var pic Roompic
		err := rows.Scan(&pic.ID, &pic.RoomImage)
		if err != nil {
			fmt.Println("Error scanning rows:", err)
			return nil, err
		}
		Roompics = append(Roompics, pic)
	}
	if err := rows.Err(); err != nil {
		fmt.Println("Error during rows iteration:", err)
		return nil, err
	}

	return Roompics, nil
}

func getAddress() ([]BuildingFloor, error) {
	var BuildingFloors []BuildingFloor
	rows, err := db.Query(`SELECT DISTINCT id, building_id, floor_id FROM building_floor`)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var BuildingFloor BuildingFloor

		err := rows.Scan(&BuildingFloor.ID, &BuildingFloor.BuildingID, &BuildingFloor.FloorID)
		if err != nil {

			return nil, err
		}
		BuildingFloors = append(BuildingFloors, BuildingFloor)
	}
	if err = rows.Err(); err != nil {

		return nil, err
	}
	return BuildingFloors, nil
}
func statustype() ([]StatusType, error) {
	var StatusTypes []StatusType
	rows, err := db.Query(`SELECT DISTINCT id,name FROM room_status`)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var StatusType StatusType

		err := rows.Scan(&StatusType.ID, &StatusType.Name)
		if err != nil {

			return nil, err
		}
		StatusTypes = append(StatusTypes, StatusType)
	}
	if err = rows.Err(); err != nil {

		return nil, err
	}
	return StatusTypes, nil
}
func floortype() ([]Floor, error) {
	var FloorTypes []Floor
	rows, err := db.Query(`SELECT DISTINCT id,name FROM floor`)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var FloorType Floor

		err := rows.Scan(&FloorType.ID, &FloorType.Name)
		if err != nil {

			return nil, err
		}
		FloorTypes = append(FloorTypes, FloorType)
	}
	if err = rows.Err(); err != nil {

		return nil, err
	}
	return FloorTypes, nil
}
func roomtype() ([]RoomType, error) {
	var RoomTypes []RoomType
	rows, err := db.Query(`SELECT DISTINCT id,name FROM room_type`)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var RoomType RoomType

		err := rows.Scan(&RoomType.ID, &RoomType.Name)
		if err != nil {

			return nil, err
		}
		RoomTypes = append(RoomTypes, RoomType)
	}
	if err = rows.Err(); err != nil {

		return nil, err
	}
	return RoomTypes, nil
}

func buildingtype() ([]SearchAddress, error) {
	var SearchAddresss []SearchAddress
	rows, err := db.Query(`SELECT DISTINCT b.id,b.name,f.name,f.id  FROM building_floor bf 
							JOIN building b ON bf.building_id = b.id
							JOIN floor f ON bf.floor_id = f.id`)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var SearchAddress SearchAddress

		err := rows.Scan(&SearchAddress.ID, &SearchAddress.Name, &SearchAddress.Floor, &SearchAddress.Id_floor)
		if err != nil {

			return nil, err
		}
		SearchAddresss = append(SearchAddresss, SearchAddress)
	}
	if err = rows.Err(); err != nil {
		fmt.Println("buildingtype erro 2")

		return nil, err
	}
	return SearchAddresss, nil
}

func getRooms() ([]Roomformangage, error) {
	fmt.Println("getRooms")

	var rooms []Roomformangage
	rows, err := db.Query(`SELECT DISTINCT r.id, r.name, r.description, r.status, r.cap, r.room_type_id, f.name, b.name, rt.name, rs.name
	FROM room r
	JOIN room_type rt ON r.room_type_id = rt.id
	JOIN room_status rs ON  r.status = rs.id
    JOIN building_floor bf ON r.address_id = bf.id 
    JOIN FLOOR f ON f.id = bf.floor_id 
	JOIN building b ON b.id = bf.building_id ORDER BY r.id ASC
`)
	if err != nil {
		fmt.Println("getRooms err")

		return nil, err

	}
	for rows.Next() {
		var room Roomformangage

		var err = rows.Scan(&room.ID, &room.Name, &room.Description, &room.Status, &room.Cap, &room.RoomTypeID, &room.FloorName, &room.BuildingName, &room.RoomTypeName, &room.StatusName)
		if err != nil {
			fmt.Println("Next err")

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
	rows, err := db.Query("SELECT employee_role_id, menu_id FROM permission")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var permis Permission
		err = rows.Scan(&permis.EmployeeRoleID, &permis.MenuID)
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

func getPermissionsUser(email string) ([]Permission, error) {
	var permiss []Permission
	query := `SELECT employee_role_id, menu_id FROM permission 
				WHERE employee_role_id=(SELECT role_id FROM employee WHERE email=:1)`
	rows, err := db.Query(query, email)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var permis Permission
		err = rows.Scan(&permis.EmployeeRoleID, &permis.MenuID)
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

func updatePermission(id int, permissions []Permission) error {
	deleteQuery := `DELETE FROM permission WHERE employee_role_id=:1`
	_, err := db.Exec(deleteQuery, id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	insertQuery := `INSERT INTO permission (employee_role_id, menu_id) VALUES (:1, :2)`
	for _, perm := range permissions {
		_, err := db.Exec(insertQuery, perm.EmployeeRoleID, perm.MenuID)
		if err != nil {
			fmt.Println(err)
			return err
		}
	}
	return nil
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
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return bookings, nil
}

func getEmployees() ([]Employee, error) {
	var employees []Employee
	query := `SELECT id, name, role_id FROM employee`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var employee Employee
		err = rows.Scan(&employee.ID, &employee.Name, &employee.RoleID)
		if err != nil {
			return nil, err
		}
		employees = append(employees, employee)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return employees, nil
}

func getEmployee(id int) (Employee, error) {
	var employee Employee
	query := `SELECT name, lname, sex, email, dept_id, role_id FROM employee WHERE id:1`
	err := db.QueryRow(query, id).Scan(&employee.Name, &employee.LName, &employee.Sex, &employee.Email, &employee.DeptID, &employee.RoleID)
	if err != nil {
		return Employee{}, err
	}
	return employee, err
}

func verifyUser(email string, password string) error {
	var user User
	row := db.QueryRow("SELECT email, password FROM employee WHERE email=:1 AND password=:2", email, password)
	err := row.Scan(&user.Email, &user.Password)
	if err != nil {
		return fiber.ErrUnauthorized
	}

	return nil
}

func createEmployee(employee *Employee) error {
	var id int
	// Check if an email exists
	query := `SELECT email FROM employee WHERE email=:1`
	err := db.QueryRow(query, employee.Email).Scan(&id)
	if err != sql.ErrNoRows {
		return fiber.ErrConflict
	}
	// Execute if no email exists
	err = db.QueryRow("SELECT max(id) FROM employee").Scan(&id)
	if err != nil {
		return err
	}
	query = `
    INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id)
    VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)
	`
	_, err = db.Exec(query, id+1, employee.Name, employee.LName, 0, employee.Sex, employee.Email, employee.Password, employee.DeptID, 2)
	if err != nil {
		return err
	}
	return nil
}

func updateEmployee(id int, employee *Employee) error {
	query := `UPDATE employee
			SET name=:1, lname=:2, sex=:3, email=:4, dept_id=:4, role_id=:5
			WHERE id=:7`
	_, err := db.Exec(query, employee.Name, employee.LName,
		employee.Sex, employee.Email, employee.DeptID,
		employee.RoleID, id)
	if err != nil {
		return err
	}
	return nil
}

func unlockRoom(id int) error {
	var status_id int
	query := `SELECT id FROM booking_status WHERE name=:1`
	err := db.QueryRow(query, "Completed").Scan(&status_id)
	if err != nil {
		return err
	}
	query = `
		UPDATE booking
		SET status_id=:1
		WHERE id=:2
	`
	_, err = db.Exec(query, status_id, id)
	if err != nil {
		return err
	}
	return nil
}

func cancelRoom(id int, cancel Cancel) error {
	// เริ่ม transaction
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if p := recover(); p != nil {
			tx.Rollback() // ถ้าเกิด panic ให้ rollback
			panic(p)
		} else if err != nil {
			tx.Rollback() // ถ้า error ให้ rollback
		} else {
			err = tx.Commit() // ถ้าไม่มี error ให้ commit
		}
	}()

	var status_id int
	query := `SELECT id FROM booking_status WHERE name=:1`
	err = tx.QueryRow(query, "Canceled").Scan(&status_id)
	if err != nil {
		return err
	}

	query = `
		UPDATE booking
		SET status_id=:1
		WHERE id=:2
	`
	_, err = tx.Exec(query, status_id, id)
	if err != nil {
		return err
	}

	var cancel_id int
	query = `SELECT max(id) from cancel`
	err = tx.QueryRow(query).Scan(&cancel_id)
	if err != nil {
		return err
	}

	query = `INSERT INTO cancel(id, reason, booking_id, employee_id)
			VALUES(:1, :2, :3, :4)`
	_, err = tx.Exec(query, cancel_id+1, cancel.Reason, cancel.BookingID, cancel.EmployeeID)
	if err != nil {
		return err
	}

	return nil
}

func getReportUsedCanceled() ([]Booking, error) {
	query := `SELECT id, status_id FROM booking
			WHERE status_id=(SELECT id FROM booking_status WHERE name=:1)
			OR status_id=(SELECT id FROM booking_status WHERE name=:2)
	`
	var bookingList []Booking
	rows, err := db.Query(query, "Completed", "Canceled")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var booking Booking
		err = rows.Scan(&booking.ID, &booking.StatusID)
		if err != nil {
			return nil, err
		}
		bookingList = append(bookingList, booking)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return bookingList, nil
}

func getReportLockEmployee() ([]EmployeeLocked, error) {
	var employeesLocked []EmployeeLocked
	query := `SELECT id, date_locked, employee_id FROM employee_locked`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var employeeLocked EmployeeLocked
		err = rows.Scan(&employeeLocked.ID, &employeeLocked.DateLocked, &employeeLocked.EmployeeID)
		if err != nil {
			return nil, err
		}
		employeesLocked = append(employeesLocked, employeeLocked)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return employeesLocked, nil
}
