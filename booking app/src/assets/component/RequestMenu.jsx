import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

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
      status: null,
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
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reason, setReason] = useState("");


  // เปิด Modal เพื่อยืนยันคำร้อง
  const handleApproveClick = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // ฟังก์ชันยืนยันคำร้อง
  const approveRequest = () => {
    setRoomRequests(
      roomRequests.map((request) =>
        request.id === selectedRequest.id ? { ...request, status: "approved" } : request
      )
    );
    setShowModal(false);
  };

  // ฟังก์ชันยกเลิกคำร้อง
  const rejectRequest = () => {
    setRoomRequests(
      roomRequests.map((request) =>
        request.id === selectedRequest.id ? { ...request, status: "rejected" } : request
      )
    );
    setReason(""); // รีเซ็ตเหตุผล
    setShowRejectModal(false);
  };
  const deleteRequest = (id) => {
  
    setRoomRequests(roomRequests.filter((request) => request.id !== id));
    
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
                  <img
                    src={request.img || "path_to_placeholder_image"}
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
                    <p className="card-text mb-2">ตึก : {request.building} ชั้น : {request.floor}</p>
                    <p className="card-text mb-2">วันที่จอง : {request.bookingDate} เวลา : {request.bookingTime}</p>
                  </div>
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end">
                  <p className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    {request.status === "approved" ? "ยืนยันคำร้องแล้ว" : request.status === "rejected" ? "ไม่อนุมัติ" : ""}
                  </p>

                  {request.status === null && (
                    <div>
                      <button
                        className="btn btn-success btn-lg mb-2 mt-2"
                        onClick={() => handleApproveClick(request)}
                        style={{ width: "300px" }}
                      >
                        ยืนยันคำร้อง
                      </button>
                      <button
                        className="btn btn-danger btn-lg mb-2"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowRejectModal(true);
                        }}
                        style={{ width: "300px" }}
                      >
                        ยกเลิกคำร้อง
                      </button>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal ยืนยันการยอมรับคำร้อง */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div style={{ backgroundColor: '#49647C', color: 'white', borderRadius: '10px' }}>
          <Modal.Header closeButton className="d-flex justify-content-center w-100 ">
            <Modal.Title className="w-100 text-center ">ยืนยันการยอมรับคำร้อง</Modal.Title>
          </Modal.Header>
          <Modal.Body className="container">
            <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={approveRequest} className="bg-success mx-5 p-2 fs-2">
                ยืนยัน
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)} className="bg-danger mx-5 p-2 fs-2">
                ยกเลิก
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </div>
      </Modal>

    

      {/* Modal ยืนยันการยกเลิกคำร้อง */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
      <div style={{ backgroundColor: '#49647C', color: 'white', borderRadius: '10px' }}>
        <Modal.Header closeButton  className="d-flex justify-content-center w-100 ">
          <Modal.Title className="w-100 text-center ">ยืนยันการยกเลิกคำร้อง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          คุณต้องการยกเลิกคำร้องสำหรับห้อง {selectedRequest?.roomName} ใช่หรือไม่?
          <Form.Group className="mt-3 ">
            <Form.Label>เหตุผลที่ไม่อนุมัติ:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="กรุณากรอกเหตุผล"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={() => {
            rejectRequest();
            setReason(""); // รีเซ็ตเหตุผล
          }}>
            ยกเลิกคำร้อง
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default RoomRequestManagement;
