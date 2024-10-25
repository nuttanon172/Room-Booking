// File: Register.jsx
import React from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';

function profile() {
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
            src="https://cdn.discordapp.com/attachments/1285222374341480488/1289578284191060008/6f4bc09feded7c58.webp?ex=671af31e&is=6719a19e&hm=504093e4471cf11ba88e4105436c0bdaa660149feb8468b623ad48f4f42efd3d&"
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
    </div>
  );
}

export default profile;
