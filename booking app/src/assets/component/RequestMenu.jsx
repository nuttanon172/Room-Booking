import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function RoomRequestManagement() {
  const [roomRequests, setRoomRequests] = useState([
    {
      id: "R001",
      roomName: "Melon Room",
      roomCode: "001",
      building: "A",
      floor: "3",
      bookingDate: "2024-09-30",
      bookingTime: "14:00",
      img: "",
      status: null, // สถานะคำร้อง (null = ยังไม่ได้ทำอะไร, "approved" = ยืนยัน, "rejected" = ไม่อนุมัติ)
    },
    {
      id: "R002",
      roomName: "Apple Room",
      roomCode: "002",
      building: "B",
      floor: "5",
      bookingDate: "2024-09-30",
      bookingTime: "16:00",
      img: "",
      status: null,
    },
    {
      id: "R003",
      roomName: "Banana Room",
      roomCode: "003",
      building: "C",
      floor: "2",
      bookingDate: "2024-09-30",
      bookingTime: "18:00",
      img: "",
      status: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // ฟังก์ชันยืนยันคำร้อง
  const approveRequest = (id) => {
    setRoomRequests(
      roomRequests.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  // ฟังก์ชันยกเลิกคำร้อง
  const rejectRequest = (id) => {
    setRoomRequests(
      roomRequests.map((request) =>
        request.id === id ? { ...request, status: "rejected" } : request
      )
    );
  };

  // ฟังก์ชันลบคำร้อง
  const deleteRequest = (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบคำร้องนี้ใช่หรือไม่?");
    if (confirmDelete) {
      setRoomRequests(roomRequests.filter((request) => request.id !== id));
    }
  };

  const filteredRequests = roomRequests.filter(
    (request) =>
      request.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.roomCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Top Section */}
      <div className="mb-4">
        <h1 className="mb-3">คำขอการใช้งานห้อง</h1>

        <div className="col-12 input-group mb-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="ค้นหาชื่อห้องหรือรหัสห้อง"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Request List */}
      <div className="row">
        <div className="col-12">
          {filteredRequests.map((request) => (
            <div key={request.id} className="card mb-4 shadow-sm border-0">
              <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center ms-3">
                  {/* แสดงรูปภาพ */}
                  <img
                    src={request.img || "path_to_placeholder_image"} // ใช้รูป placeholder ถ้ายังไม่มีรูป
                    alt="Room"
                    className="img-fluid rounded-circle border border-dark border-2"
                    style={{
                      objectFit: "cover",
                      height: "130px",
                      width: "140px",
                    }}
                  />
                </div>

                <div className="col-md-6 d-flex align-items-center">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">ชื่อห้อง : {request.roomName}</h5>
                    <p className="card-text mb-2">รหัสห้อง : {request.roomCode}</p>

                    {/* แสดงตึกและชั้น */}
                    <p className="card-text mb-2">ตึก : {request.building} ชั้น : {request.floor}</p>

                    {/* แสดงวันที่และเวลา */}
                    <p className="card-text mb-2">
                      วันที่จอง : {request.bookingDate} เวลา : {request.bookingTime}
                    </p>
                  </div>
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end">
                  {/* แสดงสถานะคำร้อง */}
                  <p className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    {request.status === "approved"
                      ? "ยืนยันคำร้องแล้ว"
                      : request.status === "rejected"
                      ? "ไม่อนุมัติ"
                      : ""}
                  </p>

                  {/* ปุ่มยืนยันและยกเลิก */}
                  {request.status === null && (
                    <div>
                      <button
                        className="btn btn-success btn-lg mb-2 mt-2"
                        onClick={() => approveRequest(request.id)}
                        style={{ width: "300px" }}
                      >
                        ยืนยันคำร้อง
                      </button>
                      <button
                        className="btn btn-danger btn-lg mb-2"
                        onClick={() => rejectRequest(request.id)}
                        style={{ width: "300px" }}
                      >
                        ยกเลิกคำร้อง
                      </button>
                    </div>
                  )}
                  {/* ปุ่มลบคำร้อง */}
                  <button
                    className="btn btn-secondary btn-lg mb-3"
                    onClick={() => deleteRequest(request.id)}
                    style={{ width: "300px", backgroundColor: "#6c757d" }}
                  >
                    ลบรายการ
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

export default RoomRequestManagement;
