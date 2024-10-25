import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PositionManagement() {
  const [positions, setPositions] = useState([
    {
      id: "POS001",
      title: "Dev",
      skills: ["All"],
      img: "",
    },
    {
      id: "POS002",
      title: "VIP",
      skills: ["จัดการพนักงาน"],
      img: "",
    },
    {
      id: "POS003",
      title: "SuperMember",
      skills: ["จองห้อง VIP"],
      img: "",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newPosition, setNewPosition] = useState({
    id: "",
    title: "",
    skills: [],
    img: "",
  });

  const [editPosition, setEditPosition] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const skillOptions = [
    "จองห้อง VIP ได้",
    "เข้าหน้าจัดการพนักงาน",
    "เข้าหน้าจัดการตำแหน่ง",
    "เข้าหน้าจัดการห้องประชุม",
    "เข้าหน้าจัดการแผนก",
    
  ];

  const handleSkillChange = (skill) => {
    if (newPosition.skills.includes(skill)) {
      setNewPosition({
        ...newPosition,
        skills: newPosition.skills.filter((s) => s !== skill),
      });
    } else {
      setNewPosition({ ...newPosition, skills: [...newPosition.skills, skill] });
    }
  };

  const addNewPosition = () => {
    setPositions([...positions, newPosition]);
    setShowModal(false);
  };

  const deletePosition = (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบตำแหน่งนี้ใช่หรือไม่?");
    if (confirmDelete) {
      setPositions(positions.filter((position) => position.id !== id));
    }
  };

  const editPositionDetails = (position) => {
    setEditPosition(position);
    setNewPosition(position);
    setShowModal(true);
  };

  const saveEditPosition = () => {
    setPositions(
      positions.map((position) =>
        position.id === editPosition.id ? { ...position, ...newPosition } : position
      )
    );
    setEditPosition(null);
    setShowModal(false);
  };

  const filteredPositions = positions.filter(
    (position) =>
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Top Section */}
      <div className="mb-4">
        <h1 className="mb-3">จัดการตำแหน่ง</h1>

        <div className="col-12 input-group mb-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="ค้นหาชื่อตำแหน่งหรือรหัสตำแหน่ง"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-7 d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary btn-lg me-3"
              style={{ backgroundColor: "#49647C", width: "200px" }}
              onClick={() => {
                setNewPosition({
                  id: "",
                  title: "",
                  skills: [],
                  img: "",
                });
                setShowModal(true);
              }}
            >
              เพิ่มตำแหน่ง
            </button>
          </div>
        </div>
      </div>

      {/* Position List */}
      <div className="row">
        <div className="col-12">
          {filteredPositions.map((position) => (
            <div key={position.id} className="card mb-4 shadow-sm border-0">
              <div className="row g-0">
                

                <div className="col-md-8 d-flex align-items-center">
                  <div className="card-body d-flex flex-column ">
                    <h5 className="card-title mb-2">ชื่อตำแหน่ง : {position.title}</h5>
                    <p className="card-text mb-2">รหัสตำแหน่ง : {position.id}</p>
                    <p className="card-text mb-2">ความสามารถ : {position.skills.join(", ")}</p>
                  </div>
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end">
                  <button
                    className="btn btn-secondary mb-2 btn-lg"
                    onClick={() => editPositionDetails(position)}
                    style={{ width: "300px", backgroundColor: "#35374B" }}
                  >
                    แก้ไขข้อมูล
                  </button>
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={() => deletePosition(position.id)}
                    style={{ width: "300px", backgroundColor: "#AC5050" }}
                  >
                    ลบตำแหน่ง
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal สำหรับเพิ่ม/แก้ไขตำแหน่ง */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editPosition ? "แก้ไขข้อมูลตำแหน่ง" : "เพิ่มตำแหน่ง"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                
               
                {/* ชื่อตำแหน่ง */}
                <div className="mb-3">
                  <label className="form-label">ชื่อตำแหน่ง</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newPosition.title}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, title: e.target.value })
                    }
                  />
                </div>
                {/* รหัสตำแหน่ง */}
                <div className="mb-3">
                  <label className="form-label">รหัสตำแหน่ง</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newPosition.id}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, id: e.target.value })
                    }
                  />
                </div>
                {/* ความสามารถของตำแหน่ง */}
                <div className="mb-3">
                  <label className="form-label">ความสามารถของตำแหน่ง</label>
                  <div>
                    {skillOptions.map((skill) => (
                      <div key={skill} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newPosition.skills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                        />
                        <label className="form-check-label">{skill}</label>
                      </div>
                    ))}
                  </div>
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
                  onClick={editPosition ? saveEditPosition : addNewPosition}
                >
                  {editPosition ? "บันทึกการแก้ไข" : "บันทึก"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PositionManagement;
