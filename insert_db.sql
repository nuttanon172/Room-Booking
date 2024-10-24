-- Inserting into building
INSERT INTO building (id, name) VALUES (1, 'Main Building');
INSERT INTO building (id, name) VALUES (2, 'Annex Building');

-- Inserting into floor
INSERT INTO floor (id, name) VALUES (1, 'Ground Floor');
INSERT INTO floor (id, name) VALUES (2, 'First Floor');

-- Inserting into building_floor
INSERT INTO building_floor (id, building_id, floor_id) VALUES (1, 1, 1);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (2, 1, 2);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (3, 2, 1);

-- Inserting into employee_role
INSERT INTO employee_role (id, name) VALUES (1, 'Manager');
INSERT INTO employee_role (id, name) VALUES (2, 'Staff');

-- Inserting into menu
INSERT INTO menu (id, name) VALUES (1, 'Dashboard');
INSERT INTO menu (id, name) VALUES (2, 'Reports');

-- Inserting into permission
INSERT INTO permission (employee_role_id, menu_id) VALUES (1, 1);
INSERT INTO permission (employee_role_id, menu_id) VALUES (1, 2);
INSERT INTO permission (employee_role_id, menu_id) VALUES (2, 2);

-- Inserting into department
INSERT INTO department (id, name) VALUES (1, 'HR');
INSERT INTO department (id, name) VALUES (2, 'IT');

-- Inserting into employee
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (1, 'John', 'Doe', 0, 'Male', 'john.doe@example.com', 'securepassword', 1, 1);

-- Inserting into employee_locked
INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES (1, SYSDATE, 1);

-- Inserting into room_type
INSERT INTO room_type (id, name) VALUES (1, 'Conference Room');
INSERT INTO room_type (id, name) VALUES (2, 'Meeting Room');

-- Inserting into room
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (1, 'Room A', 'Main conference room', 1, 20, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (2, 'Room B', 'Main conference room', 1, 20, 1, 1);

-- Inserting into booking_status
INSERT INTO booking_status (id, name) VALUES (1, 'Pending');
INSERT INTO booking_status (id, name) VALUES (2, 'Approved');

-- Inserting into booking
INSERT INTO booking (id, booking_date, start_time, end_time, qr, request_message, approved_id, status_id, room_id, emp_id) 
VALUES (1, SYSDATE, TO_DATE('2024-10-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_DATE('2024-10-01 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), NULL, 'Need projector', NULL, 1, 1, 1);

-- Inserting into cancel
INSERT INTO cancel (id, reason, booking_id, employee_id) 
VALUES (1, 'Scheduling conflict', 1, 1);

-- Save
commit;