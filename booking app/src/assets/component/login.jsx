import React, { useState } from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import mut_bg from '../pic/background.png';
import '../css/login.css';

function LoginForm({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "ww@gmail.com" && pass === "123") {
      onLogin();
    } else {
      console.log("Invalid credentials");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        minHeight: '50vh', 
        backgroundImage: `url(${mut_bg})`, 
        backgroundSize: '150%', 
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        borderRadius: '10px' 
      }}
    >
      <div className="text-center m-5" style={{ width: '50vw', padding: '10vh 10vw', backgroundColor: 'white', borderRadius: '10px' }}>
        <h1 className='display-4 fw-bold mb-5'>Login</h1>
        <div>user:ww@gmail.com pass:123</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group fw-bold text-start mb-5">
            <label htmlFor="username" style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>Username</label>
            <input
              type="email"
              className="form-control shadow"
              style={{ backgroundColor: '#A4C6CC', width: '100%' }}
              id="username"
              placeholder="Type your username"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="form-group fw-bold text-start mb-5">
            <label htmlFor="password" style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control mb-5 shadow"
              style={{ backgroundColor: '#A4C6CC' }}
              id="password"
              placeholder="Type your password"
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <div className="d-flex justify-content-between align-items-center">
              <label className="switch me-3">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <span className="slider">
                  <div className='ms-5'style={{color:'#666666'}}>Show&nbsp;password</div>
                </span>
              </label>
              <a href="#" className='text-decoration-none' style={{color:'#666666'}}>Register</a>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary px-4" style={{ backgroundColor: "#49647C" }}>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
