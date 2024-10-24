import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Modal, Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  // State for toggling password visibility
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleregister = async () => {
    const user = {
      firstName: "ชื่อที่กรอก", // เพิ่มการดึงข้อมูลจากฟอร์ม
      lastName: "นามสกุลที่กรอก",
      email: Email,
      password: password,
      department: "แผนกที่เลือก", // ปรับตามชื่อแผนกที่ผู้ใช้เลือก
    };
  
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        setShowModal(true); // แสดง Modal ถ้าสำเร็จ
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const approve =() => {
    navigate('/login', {
        state: {
          Email: Email,
          password:password
        }
      }
    )
  }
  


  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ 
           background: 'linear-gradient(to right, #d9f1ff, #ffffff)' 
         }}>
      {/* Register Card */}
      <div className="card shadow-lg border-0 rounded-5 p-5" 
           style={{ 
             maxWidth: '400px', 
             backgroundColor: '#ffffff', 
             borderRadius: '20px',
             padding: '40px',
             boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' 
           }}>
        {/* Title */}
        <h1 className="text-center fw-bold mb-4" style={{ fontSize: '2rem' }}>Register</h1>

        {/* Form */}
        <form>
          {/* Name and Last Name */}
          <div className="row mb-3">
            <div className="col">
              <input type="text" 
                     className="form-control border-0 shadow-sm rounded-3" 
                     placeholder="ชื่อ" 
                     style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
            </div>
            <div className="col">
              <input type="text" 
                     className="form-control border-0 shadow-sm rounded-3" 
                     placeholder="นามสกุล" 
                     style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <input type="email" 
                   className="form-control border-0 shadow-sm rounded-3" 
                   placeholder="Email" 
                   onChange={(e) => setEmail(e.target.value)}
                   style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input type={showPassword ? 'text' : 'password'} 
                   className="form-control border-0 shadow-sm rounded-3" 
                   placeholder="รหัสผ่าน" 
                   onChange={(e) => setPassword(e.target.value)}

                   style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input type={showPassword ? 'text' : 'password'} 
                   className="form-control border-0 shadow-sm rounded-3" 
                   placeholder="ยืนยันรหัสผ่าน" 
                   style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
          </div>

          {/* Show Password Checkbox */}
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

          {/* Department Dropdown */}
          <div className="mb-4">
            <select className="form-select border-0 shadow-sm rounded-3" 
                    style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }}>
              <option value="">แผนก</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Confirm Button */}
          <div className="d-grid">
            <button type="submit" 
                    className="btn btn-primary rounded-pill shadow-sm" 
                    onClick={(e) => { e.preventDefault(); handleregister(); }} 
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
              <Button variant="primary"  className="bg-success mx-5 p-2 fs-2" onClick={approve}>
                ยืนยัน
              </Button>
              <Button variant="secondary"  className="bg-danger mx-5 p-2 fs-2">
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
