import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const RegisterForm = () => {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

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
                   style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#d0e7f9' }} />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input type={showPassword ? 'text' : 'password'} 
                   className="form-control border-0 shadow-sm rounded-3" 
                   placeholder="รหัสผ่าน" 
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
                    style={{ height: '45px', fontSize: '1.1rem', backgroundColor: '#4A76A8' }}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
