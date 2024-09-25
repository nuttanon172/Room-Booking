import React from 'react';
import { Link } from 'react-router-dom'; // นำเข้า Link จาก react-router-dom
import '../css/sidebar.css';
import '../css/bootstrap.min.css';
import home from '../pic/home.png';
import reserve from '../pic/จอง.png';
import profile from '../pic/profile.png';
import history from '../pic/README.png';
import cancelIcon from '../pic/cancel.png';
import exit from '../pic/ออก.png';

function Sidebar({ isLoggedIn }) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-white" style={{ height: '100vh', overflowY: 'auto' }}>
            <ul className="nav nav-pills flex-column pb-3 w-100">
                <li className="nav-item">
                    <Link 
                        to="/home" // เปลี่ยนเส้นทางไปที่หน้า home
                        className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                        style={{ backgroundColor: '#A4C6CC' }} 
                        aria-current="page"
                    >
                        <img className="bi pe-none me-2" width="50" height="50" src={home} alt="" />
                        Home
                    </Link>
                </li>
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link 
                                to="/login" // เปลี่ยนเส้นทางไปที่หน้า login
                                className="nav-link btn text-start p-3 mb-1 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC' }} 
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={exit} alt="" />
                                Login
                            </Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li>
                            <Link 
                                to="/reserve" // เปลี่ยนเส้นทางไปที่หน้า reserve
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC' }} 
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={reserve} alt="" />
                                ห้องที่จอง
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/cancel" // เปลี่ยนเส้นทางไปที่หน้า cancel
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC', whiteSpace: 'nowrap' }} 
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={cancelIcon} alt="" />
                                ยกเลิกการจองห้อง
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/history" // เปลี่ยนเส้นทางไปที่หน้า history
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC', whiteSpace: 'nowrap' }} 
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={history} alt="" />
                                ประวัติการจองห้อง
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/profile" // เปลี่ยนเส้นทางไปที่หน้า profile
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC' }} 
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={profile} alt="" />
                                โปรไฟล์
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/logout" // เปลี่ยนเส้นทางไปที่หน้า logout
                                className="nav-link btn text-start p-3 mb-3 shadow text-dark fs-4 w-100" 
                                style={{ backgroundColor: '#A4C6CC' }} 
                                aria-current="page"
                            >
                                <img className="bi pe-none me-2" width="50" height="50" src={cancelIcon} alt="" />
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
