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
INSERT INTO employee_role (id, name) VALUES (3, 'Assistant');

-- Inserting into menu
INSERT INTO menu (id, name) VALUES (1, 'Lock Management');
INSERT INTO menu (id, name) VALUES (2, 'Report Management');
INSERT INTO menu (id, name) VALUES (3, 'Room Management');
INSERT INTO menu (id, name) VALUES (4, 'Role Management');
INSERT INTO menu (id, name) VALUES (5, 'Department Management');
INSERT INTO menu (id, name) VALUES (6, 'Employee Management');

-- Inserting into permission
INSERT INTO permission (employee_role_id, menu_id) VALUES (1, 1);
INSERT INTO permission (employee_role_id, menu_id) VALUES (1, 2);
INSERT INTO permission (employee_role_id, menu_id) VALUES (2, 2);

-- Inserting into department
INSERT INTO department (id, name) VALUES (1, 'HR');
INSERT INTO department (id, name) VALUES (2, 'IT');

-- Inserting into employee
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (1, 'John', 'Doe', 1, 'Male', 'john.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (2, 'Jame', 'Doe', 2, 'Male', 'jame.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (3, 'Jo', 'Doe', 3, 'Male', 'jo.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (4, 'Josh', 'Doe', 3, 'Male', 'josh.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (5, 'Jaywin', 'Doe', 2, 'Male', 'jaywin.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (6, 'Joleen', 'Doe', 1, 'Male', 'joleen.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (7, 'Justin', 'Doe', 1, 'Male', 'justin.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (8, 'Jolay', 'Doe', 2, 'Male', 'jolay.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (9, 'Jush', 'Doe', 3, 'Male', 'jush.doe@example.com', 'securepassword', 1, 1);
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (10, 'Jay', 'Doe', 2, 'Male', 'jay.doe@example.com', 'securepassword', 1, 1);

-- Inserting into room_status
INSERT INTO room_status (id, name) VALUES (1, 'ON');
INSERT INTO room_status (id, name) VALUES (2, 'OFF');

-- Inserting into room
INSERT INTO room (id, name, description, cap, room_status_id, room_type_id, address_id) 
VALUES (1, 'Room A', 'Main conference room', 20, 1, 1, 1);
INSERT INTO room (id, name, description, cap, room_status_id, room_type_id, address_id) 
VALUES (2, 'Room B', 'Main conference room', 20, 1, 1, 1);
INSERT INTO room (id, name, description, cap, room_status_id, room_type_id, address_id) 
VALUES (3, 'VIP Room C', 'Main conference room projector', 20, 1, 2, 1);

-- Inserting into employee_locked
INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES (1, SYSDATE, 1);

-- Inserting into room_type
INSERT INTO room_type (id, name) VALUES (1, 'Conference Room');
INSERT INTO room_type (id, name) VALUES (2, 'Meeting Room');

-- Inserting into room
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (1, 'Room A', 'Main conference room A', 1, 20, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (2, 'Room B', 'Main conference room B', 1, 30, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (3, 'Room C', 'Main conference room C', 1, 40, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (4, 'Room D', 'Main conference room D', 1, 50, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (5, 'Room E', 'Main conference room E', 1, 60, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (6, 'Room F', 'Main conference room F', 1, 70, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (7, 'Room G', 'Main conference room G', 1, 80, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (8, 'Room H', 'Main conference room H', 1, 90, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (9, 'Room I', 'Main conference room I ', 1, 95, 1, 1);
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id)
VALUES (10, 'Room J', 'Main conference room J', 1, 96, 1, 1);

-- Inserting into booking_status
INSERT INTO booking_status (id, name) VALUES (1, 'Pending');
INSERT INTO booking_status (id, name) VALUES (2, 'Approved');
INSERT INTO booking_status (id, name) VALUES (3, 'Canceled');
INSERT INTO booking_status (id, name) VALUES (4, 'Expired');
INSERT INTO booking_status (id, name) VALUES (5, 'Completed');
INSERT INTO booking_status (id, name) VALUES (6, 'Waiting');

-- Inserting into booking
INSERT INTO booking (id, booking_date, start_time, end_time, qr, request_message, approved_id, status_id, room_id, emp_id) 
VALUES (1, SYSDATE, TO_DATE('2024-10-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_DATE('2024-10-01 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), NULL, 'Need projector', NULL, 1, 1, 1);
INSERT INTO booking (id, booking_date, start_time, end_time, qr, request_message, approved_id, status_id, room_id, emp_id) 
VALUES (2, SYSDATE, TO_DATE('2024-10-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_DATE('2024-10-01 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), NULL, 'Need projector', NULL, 5, 1, 1);
INSERT INTO booking (id, booking_date, start_time, end_time, qr, request_message, approved_id, status_id, room_id, emp_id) 
VALUES (3, SYSDATE, TO_DATE('2024-10-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_DATE('2024-10-01 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), NULL, 'Need projector', NULL, 3, 1, 1);

-- Inserting into cancel
INSERT INTO cancel (id, reason, booking_id, employee_id) 
VALUES (1, 'Scheduling conflict', 1, 1);

-- Save
commit;