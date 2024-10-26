-- Inserting into building
INSERT INTO building (id, name) VALUES (1, 'Main Building');
INSERT INTO building (id, name) VALUES (2, 'Annex Building');
INSERT INTO building (id, name) VALUES (3, 'Peach Building');
INSERT INTO building (id, name) VALUES (4, 'Tony Building');
INSERT INTO building (id, name) VALUES (5, 'Mony Building');

-- Inserting into floor
INSERT INTO floor (id, name) VALUES (1, 'Ground Floor');
INSERT INTO floor (id, name) VALUES (2, 'First Floor');
INSERT INTO floor (id, name) VALUES (3, 'Four Floor');
INSERT INTO floor (id, name) VALUES (4, 'Flew Floor');

-- Inserting into building_floor
INSERT INTO building_floor (id, building_id, floor_id) VALUES (1, 1, 1);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (2, 2, 2);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (3, 1, 1);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (4, 2, 1);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (5, 1, 1);

-- Inserting into employee_role
INSERT INTO employee_role (id, name) VALUES (1, 'Manager');
INSERT INTO employee_role (id, name) VALUES (2, 'Staff');



-- Inserting into menu
INSERT INTO menu (id, name) VALUES (1, 'Dashboard');
INSERT INTO menu (id, name) VALUES (2, 'Reports');

-- Inserting into permission
INSERT INTO permission (id, employee_role_id, menu_id) VALUES (1, 1, 1);
INSERT INTO permission (id, employee_role_id, menu_id) VALUES (2, 2, 2);

-- Inserting into department
INSERT INTO department (id, name) VALUES (1, 'HR');
INSERT INTO department (id, name) VALUES (2, 'IT');
-- ขอ 10 อัน
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

-- Inserting into employee_locked
INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES (1, SYSDATE, 1);

-- Inserting into room_type
INSERT INTO room_type (id, name) VALUES (1, 'Conference Room');
INSERT INTO room_type (id, name) VALUES (2, 'Meeting Room');

-- ขอเยอะ
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

-- ห้ามยุ่งตั้งแต่บรรทัดนี้
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