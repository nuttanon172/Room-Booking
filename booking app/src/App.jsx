import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './assets/component/headbar';
import Sidebar from './assets/component/sidebar';
import LoginForm from './assets/component/login';
import RegisterForm from './assets/component/Registerform';
import Home from './assets/component/home';
import ReserveRoom from './assets/component/ReserveRoom';
import ยืนยัน from './assets/component/ยืนยัน';
import BookingHistory from './assets/component/bookingHistory';
import Detail from './assets/component/melonroom';
import Profile from './assets/component/profile';
import RoomManagement from './assets/component/ManageRoom';
import LockListManagement from './assets/component/LockEmp';
import DepartmentManagement from './assets/component/ManageDepartment';
import ManageEmployee from './assets/component/ManageEmployee';
import PositionManagement from './assets/component/ManageRank';
import ReportMenu from './assets/component/ReportMenu';
import RoomRequestManagement from './assets/component/RequestMenu';
import QRCodeScanner from './assets/component/QRcodeScanner';
import './App.css';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [data, setData] = useState(null); // เก็บข้อมูลจาก API

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
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
              <Route path="/Register" element={<RegisterForm />} />
              <Route path="/home" element={<Home />} />
              {isLoggedIn && (
                <>
                  <Route path="/BookingHistory" element={<BookingHistory />} />
                  <Route path="/ยืนยัน" element={<ยืนยัน />} />
                  <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                  <Route path="/Detail" element={<Detail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/ReserveRoom" element={<ReserveRoom />} />
                  {/* <Route path="/QRCodeScanner" element={<QRCodeScanner />} /> */}
                </>
              )}
              {isAdmin ? (
                <>
                  <Route path="/ManageRoom" element={<RoomManagement />} />
                  <Route path="/LockListManagement" element={<LockListManagement />} />
                  <Route path="/ManageEmployee" element={<ManageEmployee />} />
                  <Route path="/DepartmentManagement" element={<DepartmentManagement />} />
                  <Route path="/PositionManagement" element={<PositionManagement />} />
                  <Route path="/ReportMenu" element={<ReportMenu />} />
                  <Route path="/RoomRequestManagement" element={<RoomRequestManagement />} />
                  <Route path="/QRCodeScanner" element={<QRCodeScanner />} />
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
};

export default App;
