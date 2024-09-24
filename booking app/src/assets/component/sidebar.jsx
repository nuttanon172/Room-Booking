import React from 'react';
import '../css/sidebar.css';
import '../css/bootstrap.min.css';
import home from '../pic/home.png';
import reserve from '../pic/จอง.png';
import profile from '../pic/profile.png';
import history from '../pic/README.png';

import cancelIcon from '../pic/cancel.png';
import exit from '../pic/ออก.png';

function Sidebar({ isLoggedIn, onSelect }) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-white" style={{ height: '100vh', overflowY: 'auto' }}>
            <ul className="nav nav-pills flex-column pb-3 w-100">
                <li className="nav-item">
                    <a 
                        href="#" 
                        className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                        style={{ backgroundColor: '#A4C6CC' }} 
                        onClick={() => onSelect('home')} // เรียก onSelect เมื่อคลิก
                        aria-current="page"
                    >
                        <img className="bi pe-none me-2" width="50" height="50" src={home} alt="" />
                        Home
                    </a>
                </li>
                {!isLoggedIn && (
                    <>
                <li>
                    <a 
                        href="#" 
                        className="nav-link btn text-start p-3 mb-1 shadow text-dark fs-4 w-100" 
                        style={{ backgroundColor: '#A4C6CC' }} 
                        onClick={() => onSelect('Login')} // เปลี่ยนไปที่หน้าล็อกอิน
                        aria-current="page"
                    >
                        <img className="bi pe-none me-2" width="50" height="50" src={exit} alt="" />
                        Login
                    </a>
                </li>
                </>
                )}
                {isLoggedIn && (
                    <>
                        <li>
                            <a 
                                href="#" 
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC' }} 
                                onClick={() => onSelect('reserve')} // เปลี่ยนไปที่หน้า Reserv
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={reserve} alt="" />
                                ห้องที่จอง
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC', whiteSpace: 'nowrap' }} 
                                onClick={() => onSelect('cancel')} // เปลี่ยนไปที่หน้า Cancel
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={cancelIcon} alt="" />
                                ยกเลิกการจองห้อง
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC', whiteSpace: 'nowrap' }} 
                                onClick={() => onSelect('history')} // เปลี่ยนไปที่หน้า Cancel
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={history} alt="" />
                                ประวัติการจองห้อง
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC' }} 
                                onClick={() => onSelect('profile')} // เปลี่ยนไปที่หน้า Profile
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={profile} alt="" />
                                โปรไฟล์
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC' }} 
                                onClick={() => onSelect('logout')} // เปลี่ยนไปที่หน้า Logout
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={cancelIcon} alt="" />
                                ออกจากระบบ
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
