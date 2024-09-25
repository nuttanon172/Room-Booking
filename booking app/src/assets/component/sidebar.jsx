import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import home from '../pic/home.png';
import reserve from '../pic/จอง.png';
import profile from '../pic/profile.png';
import history from '../pic/README.png';
import cancelIcon from '../pic/cancel.png';
import exit from '../pic/ออก.png';

function Sidebar({ isLoggedIn }) {
  return (
    <div className="sidebar-container d-flex flex-column flex-shrink-0 p-3 bg-white">
      <ul className="nav nav-pills flex-column w-100">
        <li className="nav-item">
          <Link
            to="/home"
            className="nav-link btn text-start shadow text-dark fs-5 w-100"
            aria-current="page"
          >
            <img className="bi pe-none" width="30" height="30" src={home} alt="" />
            หน้าหลัก
          </Link>
        </li>
        {!isLoggedIn && (
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link btn text-start shadow text-dark fs-5 w-100"
            >
              <img className="bi pe-none" width="30" height="30" src={exit} alt="" />
              เข้าสู่ระบบ
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li className="nav-item">
              <Link
                to="/reserve"
                className="nav-link btn text-start shadow text-dark fs-5 w-100"
              >
                <img className="bi pe-none" width="30" height="30" src={reserve} alt="" />
                ห้องที่จอง
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cancel"
                className="nav-link btn text-start shadow text-dark fs-5 w-100"
              >
                <img className="bi pe-none" width="30" height="30" src={cancelIcon} alt="" />
                ยกเลิกการจองห้อง
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/history"
                className="nav-link btn text-start shadow text-dark fs-5 w-100"
              >
                <img className="bi pe-none" width="30" height="30" src={history} alt="" />
                ประวัติการจองห้อง
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link btn text-start shadow text-dark fs-5 w-100"
              >
                <img className="bi pe-none" width="30" height="30" src={profile} alt="" />
                โปรไฟล์
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/logout"
                className="nav-link btn text-start shadow text-dark fs-5 w-100"
              >
                <img className="bi pe-none" width="30" height="30" src={exit} alt="" />
                ออกจากระบบ
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
