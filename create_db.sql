-- Building
DROP TABLE building CASCADE CONSTRAINTS;
CREATE TABLE building
(
    id CHAR(5) PRIMARY KEY,
    name VARCHAR2(30)
);

DROP TABLE floor CASCADE CONSTRAINTS;
CREATE TABLE floor
(
    id CHAR(5) PRIMARY KEY,
    name VARCHAR2(30)
);

DROP TABLE building_floor CASCADE CONSTRAINTS;
CREATE TABLE building_floor 
(
    id CHAR(5) PRIMARY KEY,
    building_id CHAR(5),
    floor_id CHAR(5),
    FOREIGN KEY (building_id) REFERENCES building(id) ON DELETE SET NULL,
    FOREIGN KEY (floor_id) REFERENCES floor(id) ON DELETE SET NULL
);

-- Role
DROP TABLE employee_role CASCADE CONSTRAINTS;
CREATE TABLE employee_role
(
    id CHAR(5) PRIMARY KEY,
    name VARCHAR2(30)
);

DROP TABLE permission CASCADE CONSTRAINTS;
CREATE TABLE permission
(
    id CHAR(5) PRIMARY KEY,
    name VARCHAR2(50)
);

DROP TABLE employee_role_permission CASCADE CONSTRAINTS;
CREATE TABLE employee_role_permission 
(
    employee_role_id CHAR(5),
    permission_id CHAR(5),
	PRIMARY KEY (employee_role_id, permission_id),
    FOREIGN KEY (employee_role_id) REFERENCES employee_role(id) ON DELETE SET NULL,
    FOREIGN KEY (permission_id) REFERENCES permission(id) ON DELETE SET NULL
);

-- Department
DROP TABLE department CASCADE CONSTRAINTS;
CREATE TABLE department
(
    id CHAR(5) PRIMARY KEY,
	name VARCHAR2(30)
);

-- Employee
DROP TABLE employee CASCADE CONSTRAINTS;
CREATE TABLE employee
(
    id CHAR(5) PRIMARY KEY,
    name VARCHAR2(30),
	lname VARCHAR2(30),
	nlock NUMBER(1),
	sex VARCHAR2(10),
	email VARCHAR2(30),
	dept_id CHAR(5),
	role_id CHAR(5),
	image_data BLOB,
    FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL,
	FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE SET NULL
);

-- Employee_Locked
DROP TABLE employee_locked CASCADE CONSTRAINTS;
CREATE TABLE employee_locked
(
    id CHAR(5) PRIMARY KEY,
    date_locked DATE,
	employee_id CHAR(5),
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE SET NULL
);

-- Room
DROP TABLE room_type CASCADE CONSTRAINTS;
CREATE TABLE room_type
(
	id CHAR(5) PRIMARY KEY,
	name VARCHAR2(30)
);

DROP TABLE room CASCADE CONSTRAINTS;
CREATE TABLE room
(
	id CHAR(5) PRIMARY KEY,
	name VARCHAR2(30),
	description VARCHAR2(80),
	status NUMBER(1),
	cap NUMBER(3),
	room_type_id CHAR(5),
	FOREIGN KEY (room_type_id) REFERENCES room_type(id) ON DELETE SET NULL
);

-- booking
DROP TABLE booking_status CASCADE CONSTRAINTS;
CREATE TABLE booking_status
(
	id CHAR(5) PRIMARY KEY,
	name VARCHAR2(30)
);

DROP TABLE booking CASCADE CONSTRAINTS;
CREATE TABLE booking
(
	id CHAR(5) PRIMARY KEY,
	booking_date DATE,
	start_time DATE,
	end_time DATE,
	qr_url VARCHAR2(100),
	status_id CHAR(5),
	FOREIGN KEY (status_id) REFERENCES booking_status(id) ON DELETE SET NULL
);

-- Cancel List
DROP TABLE cancel CASCADE CONSTRAINTS;
CREATE TABLE cancel
(
	id CHAR(5) PRIMARY KEY,
	reason VARCHAR2(80),
	booking_id CHAR(5),
	employee_id CHAR(5),
	FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE SET NULL,
	FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE SET NULL
)
