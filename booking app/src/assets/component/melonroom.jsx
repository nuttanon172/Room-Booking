// File: RoomDetails.jsx
import React from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';

function melonroom() {
  return (
    <div className="container py-4" style={{ backgroundColor: '#E0F2F1', borderRadius: '15px', maxWidth: '1000px' }}>
      {/* Main Container */}
      <div className="row gx-5">
        {/* Image and Room Information */}
        <div className="col-md-6">
          <div className="card" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            {/* Room Image */}
            <img
              src="https://cdn.pixabay.com/photo/2016/10/27/22/52/conference-room-1778616_960_720.jpg"
              alt="Room"
              className="card-img-top"
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <div className="card-body">
              {/* Room Title */}
              <h5 className="card-title text-center">Melon room</h5>
              {/* Room Details */}
              <p className="mb-1"><strong>รหัสห้อง :</strong> 001</p>
              <p className="mb-1"><strong>สถานะ :</strong> <span style={{ color: 'green' }}>ว่าง</span></p>
              <p className="mb-1"><strong>สถานที่ :</strong> MUT ตึก D ชั้น 2</p>
              <p className="mb-1"><strong>เวลา :</strong> สามารถจองได้</p>
            </div>
          </div>
        </div>

        {/* Room Description */}
        <div className="col-md-6">
          <div className="card" style={{ borderRadius: '15px', padding: '20px', backgroundColor: 'white' }}>
            <h5 className="card-title text-center">รายละเอียดห้อง</h5>
            <ul className="list-unstyled">
              <li>• ขนาด: ประมาณ 30-40 ตารางเมตร</li>
              <li>• จำนวนที่นั่ง: 15-20 ที่นั่ง</li>
              <li>• การตกแต่ง: โต๊ะประชุมขนาดกลาง, เก้าอี้, กระดานไวท์บอร์ด, โปรเจคเตอร์และจอภาพขนาดใหญ่, ระบบเสียง</li>
              <li>• เหมาะสำหรับการประชุมทีมขนาดเล็ก, การสัมภาษณ์, หรือการประชุมทางโทรศัพท์</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary px-5 py-2" style={{ borderRadius: '10px' }}>กลับ</button>
      </div>
    </div>
  );
}

export default melonroom;
