import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PositionManagement() {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null); // ใช้เก็บตำแหน่งที่เลือกแสดงรายละเอียด

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch positions with role access
    axios.get('http://localhost:5020/positions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          setPositions(response.data);
        }
      })
      .catch(error => console.error('Error fetching positions:', error));
  }, []);

  // ฟังก์ชันสำหรับจัดการการแสดงรายละเอียดของตำแหน่งที่เลือก
  const handleToggleDetails = (position) => {
    // ถ้าตำแหน่งที่คลิกคือที่แสดงอยู่แล้ว ให้ซ่อน
    if (selectedPosition && selectedPosition.id === position.id) {
      setSelectedPosition(null);
    } else {
      setSelectedPosition(position);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">จัดการตำแหน่ง</h1>
      {positions.length > 0 ? (
        positions.map(position => (
          <div key={position.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">ตำแหน่ง: {position.name}</h5>
              <p className="card-text">รหัสตำแหน่ง: {position.id}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleToggleDetails(position)}
              >
                {selectedPosition && selectedPosition.id === position.id ? 'ซ่อนรายละเอียด' : 'แสดงรายละเอียด'}
              </button>

              {/* แสดงรายละเอียดเพิ่มเติมเมื่อกดปุ่ม */}
              {selectedPosition && selectedPosition.id === position.id && (
                <div className="mt-3">
                  <h6>สิทธิ์การเข้าถึงเมนู:</h6>
                  <ul>
                    {position.role_access && position.role_access.map((access, index) => (
                      <li key={index}>{access}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>ไม่พบข้อมูลตำแหน่ง</p>
      )}
    </div>
  );
}

export default PositionManagement;
