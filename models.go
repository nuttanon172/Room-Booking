package main

type Building struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Floor struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type BuildingFloor struct {
	ID         int `json:"id"`
	BuildingID int `json:"building_id"`
	FloorID    int `json:"floor_id"`
}

type EmployeeRole struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Menu struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Permission struct {
	ID             int `json:"id"`
	EmployeeRoleID int `json:"employee_role_id"`
	MenuID         int `json:"menu_id"`
}

type Department struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Employee struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	LName        string `json:"lname"`
	Nlock        int    `json:"nlock"`
	Sex          string `json:"sex"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	DeptID       int    `json:"dept_id"`
	RoleID       int    `json:"role_id"`
	ProfileImage []byte `json:"profile_image"`
}

type EmployeeLocked struct {
	ID         int    `json:"id"`
	DateLocked string `json:"date_locked"`
	EmployeeID int    `json:"employee_id"`
}

type RoomType struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Room struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Status      int    `json:"status"`
	Cap         int    `json:"cap"`
	RoomTypeID  int    `json:"room_type_id"`
	AddressID   int    `json:"address_id"`
}

type BookingStatus struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Booking struct {
	ID             int    `json:"id"`
	BookingDate    string `json:"booking_date"`
	StartTime      string `json:"start_time"`
	EndTime        string `json:"end_time"`
	QR             []byte `json:"qr"`
	RequestMessage string `json:"request_message"`
	ApprovedID     int    `json:"approved_id"`
	StatusID       int    `json:"status_id"`
	RoomID         int    `json:"room_id"`
	EmpID          int    `json:"emp_id"`
}

type Cancel struct {
	ID         int    `json:"id"`
	Reason     string `json:"reason"`
	BookingID  int    `json:"booking_id"`
	EmployeeID int    `json:"employee_id"`
}