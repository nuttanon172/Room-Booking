import React from 'react';
import { Link } from 'react-router-dom';

import home from '../pic/home.png';
import reserve from '../pic/จอง.png';
import profile from '../pic/profile.png';
import history from '../pic/README.png';
import cancelIcon from '../pic/cancel.png';
import exit from '../pic/ออก.png';

function Sidebar({ isLoggedIn }) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-white" style={{ width: '250px', height: '100vh', overflowY: 'auto' }}>
            <ul className="nav nav-pills flex-column pb-3 w-100">
                <li className="nav-item ">
                    <Link 
                        to="/home"
                        className="nav-link btn text-start d-flex align-items-center p-2 mb-3 fs-5 w-100"
                        style={{
                            backgroundColor: '#A4C6CC', 
                            borderRadius: '10px',
                            color: 'black',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // เพิ่มเงา
                            transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                        }}
                    >
                        <img className="me-3" width="30" height="30" src={home} alt="home icon" />
                        หน้าหลัก
                    </Link>
                </li>
                {isLoggedIn && (
                    <>
                        <li className="nav-item mb-3">
                            <Link 
                                to="/reserve"
                                className="nav-link btn text-start d-flex align-items-center p-2 fs-5 w-100"
                                style={{
                                    backgroundColor: '#A4C6CC', 
                                    borderRadius: '10px',
                                    color: 'black',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // เพิ่มเงา
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <img className="me-3" width="30" height="30" src={reserve} alt="reserve icon" />
                                ห้องที่จอง
                            </Link>
                        </li>
                        <li className="nav-item mb-3">
                            <Link 
                                to="/cancel"
                                className="nav-link btn text-start d-flex align-items-center p-2 fs-5 w-100"
                                style={{
                                    backgroundColor: '#A4C6CC', 
                                    borderRadius: '10px',
                                    color: 'black',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // เพิ่มเงา
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <img className="me-3" width="30" height="30" src={cancelIcon} alt="cancel icon" />
                                ยกเลิกการจองห้อง
                            </Link>
                        </li>
                        <li className="nav-item mb-3">
                            <Link 
                                to="/history"
                                className="nav-link btn text-start d-flex align-items-center p-2 fs-5 w-100"
                                style={{
                                    backgroundColor: '#A4C6CC', 
                                    borderRadius: '10px',
                                    color: 'black',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // เพิ่มเงา
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <img className="me-3" width="30" height="30" src={history} alt="history icon" />
                                ประวัติการจองห้อง
                            </Link>
                        </li>
                        <li className="nav-item mb-3">
                            <Link 
                                to="/profile"
                                className="nav-link btn text-start d-flex align-items-center p-2 fs-5 w-100"
                                style={{
                                    backgroundColor: '#A4C6CC', 
                                    borderRadius: '10px',
                                    color: 'black',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // เพิ่มเงา
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <img className="me-3" width="30" height="30" src={profile} alt="profile icon" />
                                โปรไฟล์
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link 
                                to="/logout"
                                className="nav-link btn text-start d-flex align-items-center p-2 fs-5 w-100"
                                style={{
                                    backgroundColor: '#A4C6CC', 
                                    borderRadius: '10px',
                                    color: 'black',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // เพิ่มเงา
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <img className="me-3" width="30" height="30" src={exit} alt="logout icon" />
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

