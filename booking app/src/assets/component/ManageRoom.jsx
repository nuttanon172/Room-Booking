import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import room1 from "../pic/room1.jpg";

function RoomManagement() {
  const [rooms, setRooms] = useState([
    {
      id: "001",
      name: "Melon room",
      status: "ว่าง",
      statusColor: "text-success",
      type: "ทั่วไป",
      img: "path_to_image1",
    },
    {
      id: "002",
      name: "Apple room",
      status: "กำลังใช้งาน",
      statusColor: "text-warning",
      type: "ทั่วไป",
      img: "path_to_image2",
    },
    {
      id: "003",
      name: "Banana room",
      status: "ปรับปรุงห้อง",
      statusColor: "text-danger",
      type: "VIP",
      img: "path_to_image3",
    },
    {
        id: "001",
        name: "Melon room",
        status: "ว่าง",
        statusColor: "text-success",
        type: "ทั่วไป",
        img: "path_to_image1",
      },
      {
        id: "002",
        name: "Apple room",
        status: "กำลังใช้งาน",
        statusColor: "text-warning",
        type: "ทั่วไป",
        img: "path_to_image2",
      },
      {
        id: "003",
        name: "Banana room",
        status: "ปรับปรุงห้อง",
        statusColor: "text-danger",
        type: "VIP",
        img: "path_to_image3",
      },
  ]);

  return (
    <div className="container mt-5 ">
      {/* Top Section */}
      <div className="mb-4 ">
        <h1 className="mb-3">จัดการห้องประชุม</h1>

        <div className="col-12 input-group mb-3 ">
          <div className="col-md-5">
            <input
              type="text"
              className=" form-control form-control-lg"
              placeholder="ค้นหาชื่อหรือรหัส"
            />
          </div>
          <div class="col-md-7 d-flex justify-content-end mb-3 ">
            <button
              className="btn btn-primary btn-lg me-3"
              style={{ backgroundColor: "#49647C" ,width:'200px' }}
            >
              เพิ่มห้อง
            </button>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="row ">
        <div className="col-12 ">
          {rooms.map((room) => (
            <div key={room.id} className="card mb-4 shadow-sm border-0 ">
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-2 d-flex align-items-center ms-3">
                  <img
                    src={room1}
                    alt={`${room1.jpg} image`}
                    className="img-fluid rounded-circle border border-dark border-2"
                    style={{
                      objectFit: "cover",
                      height: "130px",
                      width: "140px",
                    }}
                  />
                </div>

                {/* Room Details */}
                <div className="col-md-7 d-flex align-items-center">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">ชื่อ : {room.name}</h5>
                    <p className="card-text mb-2">รหัส : {room.id}</p>
                    <p className={`card-text mb-2 ${room.statusColor}`}>
                      สถานะ : {room.status}
                    </p>
                    <p className="card-text mb-2">ประเภท : {room.type}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="col-md-2  d-flex flex-column justify-content-center align-items-end">
                  {/* ปุ่มแก้ไขอยู่ด้านบน และขนาดปุ่มใหญ่ขึ้น */}
                  <button
                    className="btn btn-secondary mb-2 btn-lg  "
                    style={{ width: "300px", backgroundColor: "#35374B" }}
                  >
                    แก้ไขข้อมูล
                  </button>

                  {/* ปุ่มลบอยู่ด้านล่าง และขนาดปุ่มใหญ่ขึ้น */}
                  <button
                    className="btn btn-danger  btn-lg  "
                    style={{ width: "300px", backgroundColor: "#AC5050" }}
                  >
                    ลบห้อง
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomManagement;
