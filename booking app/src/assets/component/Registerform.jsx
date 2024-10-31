import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  // State สำหรับการแสดง/ซ่อนรหัสผ่าน
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [gender, setGender] = useState(''); // State สำหรับเพศ
  const [errorMessage, setErrorMessage] = useState('');
  const [departments, setDepartments] = useState([]);

  
  useEffect(() => {
    const fetchDepartments = async () => {

      
      try {
        const response = await fetch('http://localhost:5020/departments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
  
        const data = await response.json();
        // ตั้งค่า departments ที่ได้รับจาก API
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
  
    fetchDepartments();
  }, []);
  

  const handleRegister = async () => {
    const user = {
      name: firstName,
      lname: lastName,
      email: email,
      password: password,
      dept_id: parseInt(department, 10), // แปลง department เป็น int
      sex: gender
    };
  
    
      const response = await fetch('http://localhost:5020/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const data = await response.json();
        setShowModal(true);
      } else {
        const text = await response.text(); // รับข้อมูลเป็น text
        console.log("Error response from Back-end:", text); // ตรวจสอบข้อมูลใน console
        setErrorMessage("Failed to register");
      }
  };

  const approve = () => {
    navigate('/login', {
      state: {
        email: email,
        password: password
      }
    });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(to right, #d9f1ff, #ffffff)' }}>
      <div className="card shadow-lg border-0 rounded-5 p-5" 
           style={{ maxWidth: '400px', backgroundColor: '#ffffff', borderRadius: '20px', padding: '40px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-center fw-bold mb-4" style={{ fontSize: '2rem' }}>Register</h1>

        {/* ข้อความผิดพลาด */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form>
          <div className="row mb-3">
            <div className="col">
              <input type="text" 
                     className="form-control border-0 shadow-sm rounded-3" 
                     placeholder="ชื่อ" 
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
            </div>
            <div className="col">
              <input type="text" 
                     className="form-control border-0 shadow-sm rounded-3" 
                     placeholder="นามสกุล" 
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
            </div>
          </div>

          <div className="mb-3">
            <input type="email" 
                   className="form-control border-0 shadow-sm rounded-3" 
                   placeholder="Email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
          </div>

          <div className="mb-3">
            <input type={showPassword ? 'text' : 'password'} 
                   className="form-control border-0 shadow-sm rounded-3" 
                   placeholder="รหัสผ่าน" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
          </div>

          <div className="mb-3">
            <input type={showPassword ? 'text' : 'password'} 
                   className="form-control border-0 shadow-sm rounded-3" 
                   placeholder="ยืนยันรหัสผ่าน" 
                   style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
          </div>

          <div className="form-check form-switch mb-3">
            <input className="form-check-input" 
                   type="checkbox" 
                   id="showPasswordSwitch" 
                   checked={showPassword} 
                   onChange={() => setShowPassword(!showPassword)} />
            <label className="form-check-label" htmlFor="showPasswordSwitch">
              แสดงรหัสผ่าน
            </label>
          </div>

          <div className="mb-4">
            <select className="form-select border-0 shadow-sm rounded-3" 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }}>
              <option value="">แผนก</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown สำหรับเลือกเพศ */}
          <div className="mb-4">
            <select className="form-select border-0 shadow-sm rounded-3" 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }}>
              <option value="">เพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="other">อื่นๆ</option>
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" 
                    className="btn btn-primary rounded-pill shadow-sm" 
                    onClick={(e) => { e.preventDefault(); handleRegister(); }} 
                    style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#4A76A8' }}>
              Confirm
            </button>
          </div>
        </form>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div style={{ backgroundColor: '#49647C', color: 'white', borderRadius: '10px' }}>
          <Modal.Header closeButton className="d-flex justify-content-center w-100 ">
            <Modal.Title className="w-100 text-center ">ยืนยันการยอมรับคำร้อง</Modal.Title>
          </Modal.Header>
          <Modal.Body className="container">
            <div className="d-flex justify-content-center">
              <Button variant="primary" className="bg-success mx-5 p-2 fs-2" onClick={approve}>
                ยืนยัน
              </Button>
              <Button variant="secondary" className="bg-danger mx-5 p-2 fs-2">
                ยกเลิก
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterForm;
