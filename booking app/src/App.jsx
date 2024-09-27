import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './assets/component/headbar';
import Sidebar from './assets/component/sidebar';
import Register from './assets/component/register';
import LoginForm from './assets/component/login';
import Home from './assets/component/home';
import './App.css';

// คอมโพเนนต์ Logout ใหม่
const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    console.log('Login function called, setting isLoggedIn to true');
    setIsLoggedIn(true);
  };
  const handleAdmin = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    console.log('handleLogout called');
    setIsLoggedIn(false);
    setIsAdmin(false); // รีเซ็ตสถานะผู้ดูแลเมื่อออกจากระบบ
  };

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
  }, [isLoggedIn]);

  console.log("App rendered, isLoggedIn:", isLoggedIn);

  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col-md-2 col-sm-1 col-lg-2">
          <Sidebar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

          </div>
          <div className="col-md-2 col-sm-1 col-lg-1"></div>
          <div className="col-md-8 col-sm-10 col-lg-9">
            <Routes>
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <LoginForm onLogin={handleLogin} onAdmin={handleAdmin} />
                  )
                }
              />
              {isLoggedIn && (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/admin" element={<Home />} />
                  <Route path="/profile" element={<Register />} />
                  <Route
                    path="/logout"
                    element={<Logout onLogout={handleLogout} />} // ใช้คอมโพเนนต์ Logout
                  />
                </>
              )}
              <Route
                path="*"
                element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
