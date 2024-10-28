    -- Inserting into building
INSERT INTO building (id, name) VALUES (1, 'Main Building');
INSERT INTO building (id, name) VALUES (2, 'Annex Building');
INSERT INTO building (id, name) VALUES (3, 'Training Center');
INSERT INTO building (id, name) VALUES (4, 'Conference Hall');
INSERT INTO building (id, name) VALUES (5, 'Research Facility');
INSERT INTO building (id, name) VALUES (6, 'Employee Lounge');
INSERT INTO building (id, name) VALUES (7, 'Innovation Hub');
INSERT INTO building (id, name) VALUES (8, 'Data Center');
INSERT INTO building (id, name) VALUES (9, 'Laboratory');
INSERT INTO building (id, name) VALUES (10, 'Student Center');





-- Inserting into floor
INSERT INTO floor (id, name) VALUES (1, 'Ground Floor');
INSERT INTO floor (id, name) VALUES (2, 'First Floor');
INSERT INTO floor (id, name) VALUES (3, 'Second Floor');
INSERT INTO floor (id, name) VALUES (4, 'Third Floor');
INSERT INTO floor (id, name) VALUES (5, 'Fourth Floor');




-- Inserting into building_floor
INSERT INTO building_floor (id, building_id, floor_id) VALUES (1, 1, 1);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (2, 1, 2);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (3, 2, 1);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (4, 3, 1);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (5, 4, 1);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (6, 5, 1);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (7, 6, 1);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (8, 7, 1);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (9, 1, 3);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (10, 2, 2);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (11, 3, 2); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (12, 4, 2); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (13, 5, 2); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (14, 6, 2); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (15, 7, 2); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (16, 1, 4);  
INSERT INTO building_floor (id, building_id, floor_id) VALUES (17, 2, 3); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (18, 3, 3); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (19, 4, 3); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (20, 5, 3); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (21, 6, 3); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (22, 7, 3);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (23, 4, 3); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (24, 4, 4); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (25, 8, 1); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (26, 8, 2); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (27, 8, 3); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (28, 8, 4); 
INSERT INTO building_floor (id, building_id, floor_id) VALUES (29, 7, 4);
INSERT INTO building_floor (id, building_id, floor_id) VALUES (30, 7, 5);


-- Inserting into employee_role
INSERT INTO employee_role (id, name) VALUES (1, 'Manager');
INSERT INTO employee_role (id, name) VALUES (2, 'Staff');
INSERT INTO employee_role (id, name) VALUES (3, 'VIP1');
INSERT INTO employee_role (id, name) VALUES (4, 'VIP2');
INSERT INTO employee_role (id, name) VALUES (5, 'VIP3');
INSERT INTO employee_role (id, name) VALUES (6, 'Admin');
INSERT INTO employee_role (id, name) VALUES (7, 'Master');
INSERT INTO employee_role (id, name) VALUES (8, 'User');
INSERT INTO employee_role (id, name) VALUES (9, 'Super User');
INSERT INTO employee_role (id, name) VALUES (10, 'Visitor');




-- Inserting into menu
INSERT INTO menu (id, name) VALUES (1, 'Dashboard');
INSERT INTO menu (id, name) VALUES (2, 'Reports');



-- Inserting into permission

INSERT INTO permission (employee_role_id, menu_id) VALUES (1, 1);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (1, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (2, 1);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (2, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (3, 1); 
INSERT INTO permission (employee_role_id, menu_id) VALUES (3, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (4, 1);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (4, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (5, 1);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (5, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (6, 1); 
INSERT INTO permission (employee_role_id, menu_id) VALUES (6, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (7, 1);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (7, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (8, 1);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (9, 1);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (9, 2);  
INSERT INTO permission (employee_role_id, menu_id) VALUES (10, 1); 



-- Inserting into department
INSERT INTO department (id, name) VALUES (1, 'HR');
INSERT INTO department (id, name) VALUES (2, 'IT');
INSERT INTO department (id, name) VALUES (3, 'COMPUTER ENGINEERING'); 
INSERT INTO department (id, name) VALUES (4, 'EVENT MANAGEMENT'); 
INSERT INTO department (id, name) VALUES (5, 'FACILITIES MANAGEMENT'); 
INSERT INTO department (id, name) VALUES (6, 'TECHNICAL SUPPORT'); 
INSERT INTO department (id, name) VALUES (7, 'CUSTOMER SERVICE'); 
INSERT INTO department (id, name) VALUES (8, 'ACCOUNTING');







-- Inserting into employee
INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (1, 'John', 'Doe', 0, 'Male', 'john.doe@example.com', 'securepassword', 1, 1);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (2, 'May', 'Miller', 0, 'Female', 'may.miller@example.com', 'securepassword', 2, 2);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (3, 'Sandra', 'Clark', 0, 'Female', 'sandra.clark@example.com', 'securepassword', 3, 3);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (4, 'Bob', 'Hill', 0, 'Male', 'bob.hill@example.com', 'securepassword', 4, 3);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (5, 'Marty', 'Light', 0, 'Male', 'marty.light@example.com', 'securepassword', 5, 4);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (6, 'Jeff', 'Johnson', 0, 'Male', 'jeff.johnson@example.com', 'securepassword', 6, 6);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (7, 'Marry', 'Conner', 0, 'Female', 'marry.conner@example.com', 'securepassword', 7, 5);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (8, 'Emily', 'Snow', 0, 'Female', 'emily.snow@example.com', 'securepassword', 8, 8);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (9, 'John', 'Doe', 0, 'Male', 'john.doe@example.com', 'securepassword', 1, 9);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (10, 'Alice', 'Williams', 0, 'Female', 'alice.williams@example.com', 'securepassword', 2, 10);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (11, 'David', 'Brown', 0, 'Male', 'david.brown@example.com', 'securepassword', 3, 8);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (12, 'Sophie', 'Davis', 0, 'Female', 'sophie.davis@example.com', 'securepassword', 3, 8);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (13, 'Peter', 'Garcia', 0, 'Male', 'peter.garcia@example.com', 'securepassword', 4, 8);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (14, 'Julia', 'Martinez', 0, 'Female', 'julia.martinez@example.com', 'securepassword', 5, 5);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (15, 'Tom', 'Hernandez', 0, 'Male', 'tom.hernandez@example.com', 'securepassword', 6, 9);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (16, 'Lisa', 'Lopez', 0, 'Female', 'lisa.lopez@example.com', 'securepassword', 7, 10);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (17, 'Mike', 'Gonzalez', 0, 'Male', 'mike.gonzalez@example.com', 'securepassword', 8, 10);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (18, 'Emily', 'Wilson', 0, 'Female', 'emily.wilson@example.com', 'securepassword', 3, 5);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (19, 'Kevin', 'Anderson', 0, 'Male', 'kevin.anderson@example.com', 'securepassword', 4, 10);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (20, 'Natalie', 'Thomas', 0, 'Female', 'natalie.thomas@example.com', 'securepassword', 3, 8);

INSERT INTO employee (id, name, lname, nlock, sex, email, password, dept_id, role_id) 
VALUES (21, 'Brian', 'Jackson', 0, 'Male', 'brian.jackson@example.com', 'securepassword', 6, 7);




-- Inserting into employee_locked
INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES (1, SYSDATE, 1);

INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES (9, SYSDATE, 3);

INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES (12, SYSDATE, 1);

INSERT INTO employee_locked (id, date_locked, employee_id) 
VALUES (4, SYSDATE, 2);


-- Inserting into room_type
INSERT INTO room_type (id, name) VALUES (1, 'Conference Room');
INSERT INTO room_type (id, name) VALUES (2, 'Meeting Room');
INSERT INTO room_type (id, name) VALUES (3, 'Board Room');
INSERT INTO room_type (id, name) VALUES (4, 'Training Room');
INSERT INTO room_type (id, name) VALUES (5, 'Workshop Room');
INSERT INTO room_type (id, name) VALUES (6, 'Video Conference Room');
INSERT INTO room_type (id, name) VALUES (7, 'Breakout Room');
INSERT INTO room_type (id, name) VALUES (8, 'Auditorium');
INSERT INTO room_type (id, name) VALUES (9, 'Executive Suite');
INSERT INTO room_type (id, name) VALUES (10, 'Collaboration Space');



-- Inserting into room
INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (1, 'Room A', 'Main conference room', 1, 20, 1, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (2, 'Room B', 'Small meeting room equipped with a whiteboard', 1, 10, 2, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (3, 'Room C', 'Board meeting room with conference table', 1, 15, 3, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (4, 'Room D', 'Training room with projector and seating for 25', 1, 25, 4, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (5, 'Room E', 'Workshop room for hands-on activities', 1, 20, 5, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (6, 'Room F', 'Video conference room with high-speed internet', 1, 12, 6, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (7, 'Room G', 'Breakout room for small group discussions', 1, 8, 7, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (8, 'Room H', 'Auditorium with seating for 100', 1, 100, 8, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (9, 'Room I', 'Executive suite for VIP meetings', 1, 5, 9, 1);

INSERT INTO room (id, name, description, status, cap, room_type_id, address_id) 
VALUES (10, 'Room J', 'Collaboration space with flexible seating', 1, 15, 10, 1);




-- Inserting into room_status
INSERT INTO room_status (id, name) VALUES (1, 'ON');
INSERT INTO room_status (id, name) VALUES (2, 'OFF');






-- Inserting into booking_status
INSERT INTO booking_status (id, name) VALUES (1, 'Pending');
INSERT INTO booking_status (id, name) VALUES (2, 'Approved');

-- Inserting into booking
INSERT INTO booking (id, booking_date, start_time, end_time, qr, request_message, approved_id, status_id, room_id, emp_id) 
VALUES (1, SYSDATE, TO_DATE('2024-10-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_DATE('2024-10-01 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), NULL, 'Need projector', NULL, 1, 1, 1);

-- Inserting into cancel
INSERT INTO cancel (id, reason, booking_id, employee_id) 
VALUES (1, 'Scheduling conflict', 1, 1);


PURGE RECYCLEBIN;


-- Save
commit;

