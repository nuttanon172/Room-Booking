import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './assets/component/headbar';
import Sidebar from './assets/component/sidebar';
import ManageRoom from './assets/component/ManageRoom';
import ManageEmployee from './assets/component/ManageEmployee';
import Register from './assets/component/register';
import LoginForm from './assets/component/login';
import Home from './assets/component/home';
import './App.css';
import History from './assets/component/bookingHistory';
import AddRoom from './assets/component/AddRoom';
import LockEmp from './assets/component/LockEmp';
import ManageRank from './assets/component/ManageRank'
import ReportMenu from './assets/component/ReportMenu'
import RequestMenu from './assets/component/RequestMenu'
import ManageDepartment from './assets/component/ManageDepartment'




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    console.log('Login function called, setting isLoggedIn to true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('handleLogout called');

    setIsLoggedIn(false);
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
          <div className="col-md-2 col-sm-1">
            <Sidebar isLoggedIn={isLoggedIn} />
          </div>
          <div className="col-md-1 col-sm-2"></div>
          <div className="col-md-8 col-sm-6">
            <Routes>
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" />
                  ) : (
                    <LoginForm onLogin={handleLogin} />
                  )
                }
              />
              {isLoggedIn && (
                <>
                  <Route path="/home" element={<Home/>} />

                  <Route path="/history" element={<History/>} />

                  <Route path="/profile" element={<Register />} />

                  <Route path="/ManageRoom" element={<ManageRoom />} />

                  <Route path="/Addroom" element={<AddRoom />} />

                  <Route path="/ManageEmployee" element={<ManageEmployee />} />

                  <Route path="/LockEmp" element={<LockEmp />} />

                  <Route path="/ManageRank" element={<ManageRank />} />

                  <Route path="/ReportMenu" element={<ReportMenu />} />

                  <Route path="/RequestMenu" element={<RequestMenu />} />

                  <Route path="/ManageDepartment" element={<ManageDepartment />} />


                </>
              )}
              <Route
                path="/"
                element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
              />
              <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
