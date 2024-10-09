// File: Register.jsx
import React from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';

function Register() {
  return (
    <div className="container p-10" style={{ maxWidth: '900px', backgroundColor: '#E8F4FB', borderRadius: '15px' }}>
      {/* Search Bar and Edit Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* แก้ไขข้อมูล */}
        <div className="input-group" style={{ width: '70%' }}>
          <span className="input-group-text" id="search-icon">
            🔍
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="ค้นหาชื่อหรือรหัส"
            aria-label="ค้นหาชื่อหรือรหัส"
            aria-describedby="search-icon"
          />
        </div>
        <button className="btn" style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}>
          แก้ไขข้อมูล
        </button>
      </div>

      {/* Profile Card */}
      <div className="card shadow-sm p-3 mb-3" style={{ borderRadius: '10px', backgroundColor: '#F0F8FF' }}>
        <div className="d-flex align-items-center">
          {/* Profile Image */}
          <img
            src="https://cdn.discordapp.com/attachments/1280874345505357917/1291370203044642936/a953aa30c5e87e56.webp?ex=66ffd9b8&is=66fe8838&hm=729fcef5a97216516a5438fc278c03d93e17e984d1ec61331d7788a6572634ae&"
            alt="Profile"
            className="rounded-circle"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          {/* Profile Info */}
          <div className="ms-4">
            <h5>ID : 233 455</h5>
            <p className="mb-1">ชื่อ : หน่วง</p>
            <p className="mb-1">นามสกุล : กะรไชย</p>
            <p className="mb-1">ตำแหน่ง : Admin</p>
            <p className="mb-1">แผนก : วิศวกรรมคอมพิวเตอร์</p>
            <p className="mb-1">รหัสพนักงาน : 233 455</p>
            <p className="mb-1">เพศ : ชาย</p>
            <p className="mb-1">อีเมล์ : nuang@mut.ac.th</p>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="text-end">
        <button className="btn" style={{ backgroundColor: '#A4C6CC', color: 'white' }}>
          ลบข้อมูล
        </button>
      </div>
    </div>
  );
}

export default Register;