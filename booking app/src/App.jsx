import { useState } from 'react';
import './App.css';
import LoginForm from './assets/component/login';
import Header from './assets/component/headbar';
import Sidebar from './assets/component/sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true); // เปลี่ยนสถานะเป็นล็อกอิน
    setSelectedComponent('home'); // เลือกคอมโพเนนต์แรกหลังล็อกอิน
  };

  const handleSidebarSelect = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <div>Home Component</div>;
      case 'reserve':
        return <div>Reserve Component</div>;
      case 'cancel':
        return <div>Cancel Component</div>;
      case 'profile':
        return <div>Profile Component</div>;
      case 'Login':
        return <LoginForm onLogin={handleLogin} />;
      case 'logout':
        setIsLoggedIn(false); // เมื่อล็อกเอาท์ จะกลับไปหน้า Login
        setSelectedComponent(null); // รีเซ็ตการเลือกคอมโพเนนต์
        return <LoginForm onLogin={handleLogin} />;
      default:
        return <LoginForm onLogin={handleLogin} />;
    }
  };

  return (
    <div>
      <Header />
      <Sidebar isLoggedIn={isLoggedIn} onSelect={handleSidebarSelect} />
      {renderComponent()} 
    </div>
  );
}

export default App;
