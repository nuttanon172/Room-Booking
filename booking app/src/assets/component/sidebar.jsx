import React from 'react';
import './cs/sidebar.css';
import './cs/style.css';
import './cs/bootstrap.min.css';
import home from './pic/home.png';
import reserve from './pic/จอง.png';
import profile from './pic/profile.png';
import cancelIcon from './pic/cancel.png';
import exit from './pic/ออก.png';

function Sidebar({ isLoggedIn, onSelect }) {
  return (
    <div className="gg" style={{ width: '280px' }}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link link-body-emphasis" onClick={() => onSelect('home')}>
            <img className="logo" src={home} alt="" />
            หน้าหลัก
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link link-body-emphasis" onClick={() => onSelect('Login')}>
            <img className="logo" src={exit} alt="" />
            Login
          </a>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <a href="#" className="nav-link link-body-emphasis" onClick={() => onSelect('reserve')}>
                <img className="logo" src={reserve} alt="" />
                ห้องที่จอง
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis" onClick={() => onSelect('cancel')}>
                <img className="logo" src={cancelIcon} alt="" />
                ยกเลิกการจองห้อง
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis" onClick={() => onSelect('profile')}>
                <img className="logo" src={profile} alt="" />
                โปรไฟล์
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis" onClick={() => onSelect('logout')}>
                <img className="logo" src={exit} alt="" />
                ออกจากระบบ
              </a>
            </li>
          </>
        )}
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
