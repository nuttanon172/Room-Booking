-- Insert into building
INSERT INTO building (id, name) VALUES ('B001', 'Main Building');

-- Insert into floor
INSERT INTO floor (id, name) VALUES ('F001', 'Ground Floor');

-- Insert into building_floor
INSERT INTO building_floor (id, building_id, floor_id) VALUES ('BF001', 'B001', 'F001');

-- Insert into employee_role
INSERT INTO employee_role (id, name) VALUES ('R001', 'Manager');

-- Insert into permission
INSERT INTO permission (id, name) VALUES ('P001', 'Access room management page');
INSERT INTO permission (id, name) VALUES ('P002', 'Access role management page');
INSERT INTO permission (id, name) VALUES ('P003', 'Access employee management page');

-- Insert into employee_role_permission
INSERT INTO employee_role_permission (employee_role_id, permission_id) VALUES ('R001', 'P001');

-- Insert into department
INSERT INTO department (id, name) VALUES ('D001', 'HR');

-- Insert into employee
INSERT INTO employee (id, name, lname, nlock, sex, email, dept_id, role_id) 
VALUES ('E001', 'John', 'Doe', 0, 'Male', 'john.doe@example.com', 'D001', 'R001');

-- Insert into employee_locked
INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES ('EL001', TO_DATE('2024-01-01', 'YYYY-MM-DD'), 'E001');

-- Insert into room_type
INSERT INTO room_type (id, name) VALUES ('RT001', 'Conference Room');

-- Insert into room
INSERT INTO room (id, name, description, status, cap, room_type_id) 
VALUES ('R001', 'Room 101', 'A large conference room', 1, 100, 'RT001');

-- Insert into booking_status
INSERT INTO booking_status (id, name) VALUES ('BS001', 'Confirmed');

-- Insert into booking
INSERT INTO booking (id, booking_date, start_time, end_time, qr_url, status_id) 
VALUES ('B001', TO_DATE('2024-02-01', 'YYYY-MM-DD'), TO_DATE('2024-02-01 10:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2024-02-01 12:00', 'YYYY-MM-DD HH24:MI'), 'https://example.com/qr/123', 'BS001');

-- Insert into cancel
INSERT INTO cancel (id, reason, booking_id, employee_id) 
VALUES ('C001', 'Client canceled', 'B001', 'E001');

-- Save
commit;