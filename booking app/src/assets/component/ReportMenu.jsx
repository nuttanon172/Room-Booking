import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Dropdown, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportMenu = () => {
  const [activeMenu, setActiveMenu] = useState('usageStats');
  const [selectedDepartment, setSelectedDepartment] = useState('เลือกแผนก');
  const [searchText, setSearchText] = useState('');

  // ข้อมูลสมมติสำหรับผู้ใช้
  const users = [
    { id: '233 466', name: 'เจมส์ สวยมาก', lockCount: 3, image: '/path-to-user1.png' },
    { id: '233 467', name: 'สตีฟ CR7', lockCount: 2, image: '/path-to-user2.png' },
    { id: '233 468', name: 'สมศักดิ์ สู้สุดใจ', lockCount: 1, image: '/path-to-user3.png' },
    // สามารถเพิ่มข้อมูลผู้ใช้เพิ่มเติมที่นี่
  ];

  // ฟังก์ชันการค้นหาผู้ใช้
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.id.includes(searchText)
  );

  // ข้อมูลสมมติสำหรับสถิติการใช้ห้อง
  const usageStatsData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    datasets: [
      {
        label: 'จำนวนครั้งที่ใช้ (ครั้ง)',
        data: [8, 10, 6, 12, 9, 14, 7, 9, 11, 10, 8, 6, 12, 15, 9, 10, 13, 11, 8, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // ตัวเลือกการแสดงสถิติการใช้ห้อง
  const renderUsageStats = () => (
    <Card className="p-3 shadow-sm">
      <h4 className="text-center mb-4">สถิติการใช้ห้อง</h4>
      <Row className="justify-content-center">
        <Col md={6}>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              เลือกเดือน
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">January</Dropdown.Item>
              <Dropdown.Item href="#/action-2">February</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={6}>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              เลือกห้อง
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Room A</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Room B</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <div className="chart">
        <Bar data={usageStatsData} />
      </div>
    </Card>
  );

  // ตัวเลือกการแสดงการจองและยกเลิกห้อง
  const RenderBookingStats = () => {
    const [bookingStatsData, setBookingStatsData] = useState({
      labels: ['Completed Reservations', 'Failed Reservations'],
      datasets: [
        {
          label: 'Number of Bookings',
          data: [0, 0], // Initial placeholder values
          backgroundColor: ['#4CAF50', '#FF5722'], // Green for completed, red for failed
        },
      ],
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5020/reports/usedCanceled');
          const data = await response.json();
  
          setBookingStatsData({
            labels: ['Completed Reservations', 'Failed Reservations'],
            datasets: [
              {
                label: 'Number of Bookings',
                data: [data.used, data.unused], // Use API data here
                backgroundColor: ['#4CAF50', '#FF5722'],
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <Card className="p-3 shadow-sm">
        <h4 className="text-center mb-4">การจองและยกเลิกห้อง</h4>
        <div className="chart">
          <Bar data={bookingStatsData} />
        </div>
      </Card>
    );
  };

  // ตัวเลือกการแสดงการล็อคห้อง
  const renderLockStats = () => (
    <Card className="p-3 shadow-sm">
      <h4 className="text-center mb-4">การ Lock</h4>
      <Row className="mb-3">
        <Col md={6}>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {selectedDepartment}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedDepartment('แผนก A')}>แผนก A</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedDepartment('แผนก B')}>แผนก B</Dropdown.Item>
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
          <Col md={12} className="mt-2" key={user.id}>
            <Card className="p-3 shadow-sm">
              <Row>
                <Col xs={3} className="text-center">
                  <img src={user.image} alt={user.name} className="img-fluid rounded-circle" />
                </Col>
                <Col xs={9}>
                  <h6>ชื่อ: {user.name}</h6>
                  <p>รหัส: {user.id} | จำนวนการโดน Lock: {user.lockCount} ครั้ง</p>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );

  return (
    <Container fluid className="mt-5" style={{ backgroundColor: '#e9f4fb', height: '100vh' }}>
      <h3 className="text-center mb-3">รายงานการจองห้อง</h3>
      <Row className="justify-content-center">
        <Col md={10}>
          {activeMenu === 'usageStats' && renderUsageStats()}
          {activeMenu === 'bookingStats' && renderBookingStats()}
          {activeMenu === 'lockStats' && renderLockStats()}
        </Col>
      </Row>
      <Row className="mt-3 justify-content-end fixed-bottom pb-3 pr-3 " style={{ width: '80%' }}>
        <Col md={2}>
          <Button
            className={`w-100 ${activeMenu === 'usageStats' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveMenu('usageStats')}
            style={{ fontSize: '0.9rem',backgroundColor: "#49647C", }}
          >
            สถิติการใช้ห้อง
          </Button>
        </Col>
        <Col md={2}>
          <Button
            className={`w-100 ${activeMenu === 'bookingStats' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveMenu('bookingStats')}
            style={{ fontSize: '0.9rem' ,backgroundColor: "#49647C", }}
          >
            การจองและยกเลิกห้อง
          </Button>
        </Col>
        <Col md={2}>
          <Button
            className={`w-100 ${activeMenu === 'lockStats' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveMenu('lockStats')}
            style={{ fontSize: '0.9rem' ,backgroundColor: "#49647C",}}
          >
            การ Lock
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ReportMenu;
