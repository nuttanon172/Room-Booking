-- Insert into building
INSERT INTO building (id, name) VALUES ('B001', 'Main Building');

-- Insert into floor
INSERT INTO floor (id, name) VALUES ('F001', 'Ground Floor');

-- Insert into building_floor
INSERT INTO building_floor (id, building_id, floor_id) VALUES ('BF001', 'B001', 'F001');

-- Insert into employee_role
INSERT INTO employee_role (id, name) VALUES ('R001', 'Manager');
INSERT INTO employee_role (id, name) VALUES ('R002', 'HR');

-- Insert into menu
INSERT INTO menu (id, name) VALUES ('M001', 'Room management page');
INSERT INTO menu (id, name) VALUES ('M002', 'Role management page');
INSERT INTO menu (id, name) VALUES ('M003', 'Employee management page');

-- Insert into permission
INSERT INTO permission (id, employee_role_id, menu_id) VALUES ('001', 'R001', 'M001');
INSERT INTO permission (id, employee_role_id, menu_id) VALUES ('002', 'R001', 'M003');
INSERT INTO permission (id, employee_role_id, menu_id) VALUES ('003', 'R002', 'M002');


-- Insert into department
INSERT INTO department (id, name) VALUES ('D001', 'HR');

-- Insert into employee
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES ('E001', 'John', 'Doe', 0, 'Male', 'john.doe@example.com', '12341234','D001', 'R001');

-- Insert into employee_locked
INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES ('EL001', TO_DATE('2024-01-01', 'YYYY-MM-DD'), 'E001');

-- Insert into room_type
INSERT INTO room_type (id, name) VALUES ('RT001', 'Common Room');
INSERT INTO room_type (id, name) VALUES ('RT002', 'VIP Room');

-- Insert into room
INSERT INTO room (id, name, description, status, cap, room_type_id) 
VALUES ('R001', 'Room 101', 'A large conference room', 1, 100, 'RT001');
INSERT INTO room (id, name, description, status, cap, room_type_id) 
VALUES ('R002', 'Room 102', 'A large gold conference room', 1, 100, 'RT002');

-- Insert into booking_status
INSERT INTO booking_status (id, name) VALUES ('BS001', 'Successful');
INSERT INTO booking_status (id, name) VALUES ('BS002', 'Waiting');

-- Insert into booking
INSERT INTO booking (id, booking_date, start_time, end_time, qr_url, status_id) 
VALUES ('B001', TO_DATE('2024-02-01', 'YYYY-MM-DD'), TO_DATE('2024-02-01 10:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2024-02-01 12:00', 'YYYY-MM-DD HH24:MI'), 'https://example.com/qr/123', 'BS001');
INSERT INTO booking (id, booking_date, start_time, end_time, qr_url, status_id, request_message, approved) 
VALUES ('B002', TO_DATE('2024-02-01', 'YYYY-MM-DD'), TO_DATE('2024-02-01 10:00', 'YYYY-MM-DD HH24:MI'), TO_DATE('2024-02-01 12:00', 'YYYY-MM-DD HH24:MI'), 'https://example.com/qr/123', 'BS002', 'PLS Let me in', 'E001');

-- Insert into cancel
INSERT INTO cancel (id, reason, booking_id, employee_id) 
VALUES ('C001', 'Client canceled', 'B001', 'E001');

-- Save
commit;