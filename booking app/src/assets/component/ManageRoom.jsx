import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import room1 from "../pic/room1.jpg"; //for test img

function RoomManagement() {
  const [rooms, setRooms] = useState([
    {
      id: "001",
      name: "Melon room",
      building: "ตึก A",
      floor: "ชั้น 1",
      status: "เปิดใช้งาน",
      statusColor: "text-success",
      type: "ทั่วไป",
      capacity: 10,
      description: "ห้องนี้สามารถใช้สำหรับการประชุมขนาดเล็ก",
      img: room1, // เพิ่มฟิลด์ img สำหรับรูปภาพ
    },
    {
      id: "002",
      name: "Apple room",
      building: "ตึก B",
      floor: "ชั้น 2",
      status: "เปิดใช้งาน",
      statusColor: "text-success",
      type: "ทั่วไป",
      capacity: 20,
      description: "ห้องนี้สามารถใช้สำหรับการประชุมทั่วไป",
      img: "", // เพิ่มฟิลด์ img สำหรับรูปภาพ
    },
    {
      id: "003",
      name: "Banana room",
      building: "ตึก C",
      floor: "ชั้น 3",
      status: "ปรับปรุงห้อง",
      statusColor: "text-danger",
      type: "VIP",
      capacity: 5,
      description: "ห้อง VIP สำหรับการประชุมสำคัญ",
      img: "", // เพิ่มฟิลด์ img สำหรับรูปภาพ
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newRoom, setNewRoom] = useState({
    id: "",
    name: "",
    building: "",
    floor: "",
    status: "เปิดใช้งาน",
    statusColor: "text-success",
    type: "ทั่วไป",
    capacity: "",
    description: "",
    img: "",
  });
  
  const [editRoom, setEditRoom] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [showDescription, setShowDescription] = useState(null); 

  const addNewRoom = () => {
    setRooms([...rooms, newRoom]);
    setShowModal(false);
  };

  const deleteRoom = (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบห้องนี้ใช่หรือไม่?");
    if (confirmDelete) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  const editRoomDetails = (room) => {
    setEditRoom(room);
    setNewRoom(room);
    setShowModal(true);
  };

  const saveEditRoom = () => {
    setRooms(
      rooms.map((room) =>
        room.id === editRoom.id ? { ...room, ...newRoom } : room
      )
    );
    setEditRoom(null);
    setShowModal(false);
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Top Section */}
      <div className="mb-4">
        <h1 className="mb-3">จัดการห้องประชุม</h1>

        <div className="col-12 input-group mb-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="ค้นหาชื่อหรือรหัส"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-7 d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary btn-lg me-3"
              style={{ backgroundColor: "#49647C", width: "200px" }}
              onClick={() => {
                setNewRoom({
                  id: "",
                  name: "",
                  building: "",
                  floor: "",
                  status: "เปิดใช้งาน",
                  statusColor: "text-success",
                  type: "ทั่วไป",
                  capacity: "",
                  description: "",
                  img: "",
                });
                setShowModal(true);
              }}
            >
              เพิ่มห้อง
            </button>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="row">
        <div className="col-12">
          {filteredRooms.map((room) => (
            <div key={room.id} className="card mb-4 shadow-sm border-0">
              <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center ms-3">
                  {/* ใช้ img จาก room object แทน */}
                  <img
                    src={room.img || "path_to_placeholder_image"} // ใช้รูป placeholder ถ้ายังไม่มีรูป
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
                    <h5 className="card-title mb-2">ชื่อ : {room.name}</h5>
                    <p className="card-text mb-2">รหัส : {room.id}</p>
                    <p className="card-text mb-2">ตึก : {room.building}</p>
                    <p className="card-text mb-2">ชั้น : {room.floor}</p>
                    <p className="card-text mb-2">ความจุ : {room.capacity} คน</p>
                    <p className={`card-text mb-2 ${room.statusColor}`}>
                      สถานะ : {room.status}
                    </p>
                    <p className="card-text mb-2">ประเภท : {room.type}</p>
                   
                  </div>
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end">
                  <button
                    className="btn btn-secondary mb-2 btn-lg"
                    onClick={() => editRoomDetails(room)}
                    style={{ width: "300px", backgroundColor: "#35374B" }}
                  >
                    แก้ไขข้อมูล
                  </button>
                  <button
                    className="btn btn-danger btn-lg mb-2"
                    onClick={() => deleteRoom(room.id)}
                    style={{ width: "300px", backgroundColor: "#AC5050" }}
                  >
                    ลบห้อง
                  </button>
                  <button className="btn btn-info btn-lg border-light" 
                  onClick={() => setShowDescription(room)} 
                  style={{ width: "300px", backgroundColor: "#DAEEF7" }} > 
                  ดูรายละเอียด 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal สำหรับแสดงรายละเอียดห้อง */}
      {showDescription && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">รายละเอียดห้อง: {showDescription.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDescription(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>รหัสห้อง: {showDescription.id}</p>
                <p>ตึก: {showDescription.building}</p>
                <p>ชั้น: {showDescription.floor}</p>
                <p>ความจุ: {showDescription.capacity} คน</p>
                <p>สถานะ: {showDescription.status}</p>
                <p>ประเภท: {showDescription.type}</p>
                <p>รายละเอียด: {showDescription.description}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDescription(null)}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal สำหรับเพิ่ม/แก้ไขห้อง */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editRoom ? "แก้ไขข้อมูลห้อง" : "เพิ่มห้อง"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* เลือกรูปภาพ */}
                <div className="mb-3">
                  <label className="form-label">เลือกรูปภาพ</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setNewRoom({
                        ...newRoom,
                        img: URL.createObjectURL(e.target.files[0]), // อัปเดต URL รูปภาพทันที
                      })
                    }
                  />
                </div>
                {/* ชื่อห้อง */}
                <div className="mb-3">
                  <label className="form-label">ชื่อห้อง</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRoom.name}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, name: e.target.value })
                    }
                  />
                </div>
                {/* รหัสห้อง */}
                <div className="mb-3">
                  <label className="form-label">รหัสห้อง</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRoom.id}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, id: e.target.value })
                    }
                  />
                </div>
                {/* ตึก */}
                <div className="mb-3">
                  <label className="form-label">ตึก</label>
                  <select
                    className="form-select"
                    value={newRoom.building}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, building: e.target.value })
                    }
                  >
                    <option value="ตึก A">ตึก A</option>
                    <option value="ตึก B">ตึก B</option>
                    <option value="ตึก C">ตึก C</option>
                  </select>
                </div>
                {/* ชั้น */}
                <div className="mb-3">
                  <label className="form-label">ชั้น</label>
                  <select
                    className="form-select"
                    value={newRoom.floor}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, floor: e.target.value })
                    }
                  >
                    <option value="ชั้น 1">ชั้น 1</option>
                    <option value="ชั้น 2">ชั้น 2</option>
                    <option value="ชั้น 3">ชั้น 3</option>
                  </select>
                </div>
                {/* สถานะห้อง */}
                <div className="mb-3">
                  <label className="form-label">สถานะห้อง</label>
                  <select
                    className="form-select"
                    value={newRoom.status}
                    onChange={(e) =>
                      setNewRoom({
                        ...newRoom,
                        status: e.target.value,
                        statusColor: e.target.value === "เปิดใช้งาน" ? "text-success" : "text-danger",
                      })
                    }
                  >
                    <option value="เปิดใช้งาน">เปิดใช้งาน</option>
                    <option value="ปรับปรุงห้อง">ปรับปรุงห้อง</option>
                  </select>
                </div>
                {/* ประเภทห้อง */}
                <div className="mb-3">
                  <label className="form-label">ประเภทห้อง</label>
                  <select
                    className="form-select"
                    value={newRoom.type}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, type: e.target.value })
                    }
                  >
                    <option value="ทั่วไป">ทั่วไป</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                {/* ความจุ */}
                <div className="mb-3">
                  <label className="form-label">ความจุ (คน)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newRoom.capacity}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, capacity: e.target.value })
                    }
                  />
                </div>
                {/* รายละเอียด */}
                <div className="mb-3">
                  <label className="form-label">รายละเอียด</label>
                  <textarea
                    className="form-control"
                    value={newRoom.description}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  ปิด
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={editRoom ? saveEditRoom : addNewRoom}
                >
                  {editRoom ? "บันทึกการแก้ไข" : "บันทึก"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomManagement;
