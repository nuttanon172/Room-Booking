// File: RoomDetails.jsx
import React from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function melonroom() {
  const location = useLocation();
  const { roomData, roompic } = location.state || {};
  const navigate = useNavigate();

  console.log(roomData);
  return (
    <div className="container py-4" style={{ backgroundColor: '#E0F2F1', borderRadius: '15px', maxWidth: '1000px' }}>
      {/* Main Container */}
      <div className="row gx-5">
        {/* Image and Room Information */}
        <div className="col-md-6">
          <div className="card" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            {/* Room Image */}
            <img
              src={roompic}
              alt="Room"
              className="card-img-top"
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <div className="card-body">
              {/* Room Title */}
              <h5 className="card-title text-center">{roomData.name}</h5>
              {/* Room Details */}
              <p className="mb-1"><strong>รหัสห้อง :</strong> {roomData.id}</p>
              <p className="mb-1"><strong>สถานะ :</strong> <span style={{ color: 'green' }}>ว่าง</span></p>
              <p className="mb-1"><strong>สถานที่ :</strong> MUT ตึก {roomData.building} ชั้น {roomData.floor}</p>
              <p className="mb-1"><strong>เวลา :</strong> สามารถจองได้</p>
            </div>
          </div>
        </div>

        {/* Room Description */}
        <div className="col-md-6">
          <div className="card" style={{ borderRadius: '15px', padding: '20px', backgroundColor: 'white' }}>
            <h5 className="card-title text-center">รายละเอียดห้อง</h5>
            <p>{roomData.description}</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary px-5 py-2" onClick={() => navigate('/ReserveRoom')} style={{ borderRadius: '10px' }}>กลับ</button>
      </div>
    </div>
  );
}

export default melonroom;
