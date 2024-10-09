import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './assets/component/headbar';
import Sidebar from './assets/component/sidebar';
import Register from './assets/component/register';
import LoginForm from './assets/component/login';
import Home from './assets/component/home';
import BookingHistory from './assets/component/bookingHistory';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // เก็บสถานะใน LocalStorage
  };

  const handleAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true'); // เก็บสถานะ admin ใน LocalStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn'); // ลบสถานะการล็อกอินออกจาก LocalStorage
    localStorage.removeItem('isAdmin'); // ลบสถานะ admin ออกจาก LocalStorage
  };

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
                  <Route path="/BookingHistory" element={<BookingHistory />} />
                  <Route path="/profile" element={<Register />} />
                </>
              )}

              {isAdmin ? (
                <>
                  <Route path="/ManageRoom" element={<RoomManagement />} />
                  <Route path="/LockListManagement" element={<LockListManagement />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/home" />} />
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
