import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './assets/component/headbar';
import Sidebar from './assets/component/sidebar';
import Register from './assets/component/register';
import LoginForm from './assets/component/login';
<<<<<<< HEAD
//import { useNavigate } from 'react-router-dom';
import Home from './assets/component/home';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  //const navigate = useNavigate();


 // const handleHomeClick = () => {
 //   navigate(LoginForm); // กำหนด path ที่ต้องการจะไป
  //};


 

=======
import Home from './assets/component/home';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
>>>>>>> 40924a678a7a5fbbfd1f20545449b376c28f7862

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

<<<<<<< HEAD
  const renderComponent = () => {
    if (!isLoggedIn) {
      return <LoginForm onLogin={handleLogin} />;
    }
  


    

    switch (selectedComponent) {
      case 'home':
        return <Home />
      case 'reserve':
        return <div>Reserve Component</div>;
      case 'cancel':
        return <div>Cancel Component</div>;
      case 'profile':
        return <div>Profile Component</div>;
      case 'logout':
        handleLogout();
        return <LoginForm onLogin={handleLogin} />;
      default:
        return <div>Select a component from the sidebar</div>;
      //return <div>Select a component from the sidebar</div>;
    }
  };
=======
  console.log("App rendered, isLoggedIn:", isLoggedIn);
>>>>>>> 40924a678a7a5fbbfd1f20545449b376c28f7862

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

                  <Route path="/profile" element={<Register />} />


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
