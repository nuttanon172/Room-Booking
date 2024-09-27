import React from 'react';
import { Link } from 'react-router-dom';
import home from '../pic/home.png';
import reserve from '../pic/จอง.png';
import profile from '../pic/profile.png';
import history from '../pic/README.png';
import cancelIcon from '../pic/cancel.png';
import exit from '../pic/ออก.png';

function Sidebar({ isLoggedIn }) {
    const navItemStyle = {
        backgroundColor: '#A4C6CC',
        borderRadius: '10px',
        color: 'black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
    };

    const navItems = [
        { to: '/home', icon: home, text: 'หน้าหลัก' },
        { to: '/reserve', icon: reserve, text: 'ห้องที่จอง' },
        { to: '/cancel', icon: cancelIcon, text: 'ยกเลิกการจองห้อง' },
        { to: '/history', icon: history, text: 'ประวัติการจองห้อง' },
        { to: '/profile', icon: profile, text: 'โปรไฟล์' },
        { to: '/logout', icon: exit, text: 'ออกจากระบบ' },
        { to: '/ManageRoom', icon: '', text: 'จัดการห้องประชุม' },
        { to: '/ManageEmployee', icon: '', text: 'จัดการพนักงาน' },
        { to: '/adminmenu1', icon: '', text: 'AdminTest1' },
        { to: '/adminmenu1', icon: '', text: 'AdminTest1' },
        { to: '/adminmenu1', icon: '', text: 'AdminTest1' },
        { to: '/adminmenu1', icon: '', text: 'AdminTest1' },
    ];

    const renderNavItem = (item, index) => (
        <li key={index} className="nav-item mb-3">
            <Link 
                to={item.to}
                className="nav-link btn text-start d-flex align-items-center p-2 fs-5 w-100"
                style={navItemStyle}
            >
                {item.icon && <img className="me-3" width="30" height="30" src={item.icon} alt={`${item.text} icon`} />}
                {item.text}
            </Link>
        </li>
    );

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-white" style={{ width: '250px', height: '100vh', overflowY: 'auto' }}>
            <ul className="nav nav-pills flex-column pb-3 w-100">
                {renderNavItem(navItems[0])}
                {isLoggedIn && navItems.slice(1).map((item, index) => renderNavItem(item, index))}
            </ul>
        </div>
    );
}

export default Sidebar;
