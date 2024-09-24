import { useState } from 'react';
import Header from './assets/component/headbar';
import Sidebar from './assets/component/sidebar';
import './App.css';
import LoginForm from './assets/component/login';
//import { useNavigate } from 'react-router-dom';
import Home from './assets/component/home';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  //const navigate = useNavigate();


 // const handleHomeClick = () => {
 //   navigate(LoginForm); // กำหนด path ที่ต้องการจะไป
  //};


 


  const handleLogin = () => {
    setIsLoggedIn(true); // เปลี่ยนสถานะเป็นล็อกอิน
    setSelectedComponent('home'); // เลือกคอมโพเนนต์แรกหลังล็อกอิน
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // เปลี่ยนสถานะเป็นล็อกเอาท์
    setSelectedComponent(null); // รีเซ็ตการเลือกคอมโพเนนต์
  };

  const handleSidebarSelect = (component) => {
    setSelectedComponent(component);
  };

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

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-md-3 col-sm-1">
          <Sidebar isLoggedIn={1} onSelect={handleSidebarSelect} />
        </div>
        <div className="col-md-1 col-sm-2"></div>
        <div className="col-md-8 col-sm-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default App;
