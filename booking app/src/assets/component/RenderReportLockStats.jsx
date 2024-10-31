import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Row, Col, Dropdown, Form } from 'react-bootstrap';

const RenderLockStats = () => {
	const [searchText, setSearchText] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('เลือกแผนก');
	const [deptId, setDeptId] = useState(null);
	const [departments, setDepartments] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async (id) => {
		try {
			const token = localStorage.getItem('token');
			const url = id
				? `http://localhost:5020/reports/lockedEmployees?dept_id=${id}`
				: 'http://localhost:5020/reports/lockedEmployees';

			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(response.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
		
	};

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get('http://localhost:5020/departments', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setDepartments(response.data); // ตั้งค่าข้อมูลแผนก
			} catch (error) {
				setError(error.message);
			}
		};
		fetchDepartments();
		fetchData();
	}, []);
	
	const handleDepartmentSelect = (department) => {
		setSelectedDepartment(department.name);
		setDeptId(department.id);
		setLoading(false);
		fetchData(department.id);
	};

	const handleClearDepartment = () => {
		setSelectedDepartment('เลือกแผนก');
		setDeptId(null);
		setLoading(false); 
		fetchData();
	};

	const filteredUsers = users.filter(
		(user) =>
			user.employee_name.toLowerCase().includes(searchText.toLowerCase()) ||
			user.employee_id.toString().includes(searchText)
	);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<Card className="p-3 shadow-sm">
			<h4 className="text-center mb-4">การ Lock</h4>
			<Row className="mb-3">
				<Col md={6}>
					<Dropdown>
						<Dropdown.Toggle variant="light" id="dropdown-basic">
							{selectedDepartment}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{departments.map((department) => (
								<Dropdown.Item key={department.id} onClick={() => handleDepartmentSelect(department)}>
									{department.name}
								</Dropdown.Item>
							))}
							<Dropdown.Item onClick={handleClearDepartment}>ล้างการเลือกแผนก</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col md={6}>
					<Form.Control
						type="text"
						placeholder="ค้นหาชื่อหรือรหัส"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</Col>
			</Row>
			<Row className="mt-3">
				{filteredUsers.map((user) => (
					<Col md={12} className="mt-2" key={user.employee_id}>
						<Card className="p-3 shadow-sm">
							<Row>
								<Col xs={3} className="text-center">
									<img src={user.employee_image} alt={user.employee_name} className="img-fluid rounded-circle" />
								</Col>
								<Col xs={9}>
									<h6>ชื่อ: {user.employee_name}</h6>
									<p>รหัส: {user.employee_id} | จำนวนการโดน Lock: {user.employee_nlock} ครั้ง</p>
								</Col>
							</Row>
						</Card>
					</Col>
				))}
			</Row>
		</Card>
	);
};

export default RenderLockStats;
