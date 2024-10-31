import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function PositionManagement() {
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPosition, setNewPosition] = useState({
    id: "",
    name: "",
  });
  const [editPosition, setEditPosition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ฟังก์ชันดึงข้อมูลตำแหน่งจาก API
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5020/permissions" ,{
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        })
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const addNewPosition = async () => {
    if (!newPosition.id || !newPosition.name) {
      setErrorMessage("กรุณากรอกข้อมูลในทุกช่องให้ครบถ้วน");
      return;
    }
  
    try {
      const formattedPosition = {
        id: parseInt(newPosition.id, 10), // แปลง id เป็น integer
        name: newPosition.name,
      };
  
      await axios.post("http://localhost:5020/positions", formattedPosition);
      setPositions([...positions, formattedPosition]);
      setShowModal(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding position:", error);
      setErrorMessage("ไม่สามารถเพิ่มตำแหน่งได้ กรุณาลองอีกครั้ง");
    }
  };
  

  const updatePosition = async () => {
    if (!newPosition.id || !newPosition.name) {
      setErrorMessage("กรุณากรอกข้อมูลในทุกช่องให้ครบถ้วน");
      return;
    }
  
    try {
      const formattedPosition = {
        id: parseInt(newPosition.id, 10),
        name: newPosition.name,
      };
  
      // ส่งคำขอไปยัง /positions/:id โดยแทนที่ :id ด้วย newPosition.id
      await axios.put(`http://localhost:5020/positions/${formattedPosition.id}`, formattedPosition);
      setPositions(
        positions.map((position) =>
          position.id === editPosition.id ? { ...position, ...formattedPosition } : position
        )
      );
      setEditPosition(null);
      setShowModal(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating position:", error);
      setErrorMessage("ไม่สามารถแก้ไขข้อมูลตำแหน่งได้ กรุณาลองอีกครั้ง");
    }
  };
  
  
  

  const deletePosition = async (id) => {
    if (window.confirm("คุณต้องการลบตำแหน่งนี้ใช่หรือไม่?")) {
      try {
        await axios.delete(`http://localhost:5020/positions/${id}`);
        setPositions(positions.filter((position) => position.id !== id));
      } catch (error) {
        console.error("Error deleting position:", error);
      }
    }
  };

  const editPositionDetails = (position) => {
    setEditPosition(position);
    setNewPosition(position);
    setShowModal(true);
  };

  const filteredPositions = positions.filter(
    (position) =>
      position.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.id.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
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
            onClick={() => {
              setNewPosition({
                id: "",
                name: "",
              });
              setShowModal(true);
            }}
          >
            เพิ่มตำแหน่ง
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {filteredPositions.map((position) => (
            <div key={position.id} className="card mb-4 shadow-sm border-0">
              <div className="row g-0">
                <div className="col-md-8 d-flex align-items-center">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">ชื่อตำแหน่ง : {position.name}</h5>
                    <p className="card-text mb-2">รหัสตำแหน่ง : {position.id}</p>
                  </div>
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end">
                  <button
                    className="btn btn-secondary mb-2 btn-lg"
                    onClick={() => editPositionDetails(position)}
                  >
                    แก้ไขข้อมูล
                  </button>
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={() => deletePosition(position.id)}
                  >
                    ลบตำแหน่ง
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="mb-3">
                  <label className="form-label">ชื่อตำแหน่ง</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newPosition.name}
                    onChange={(e) =>
                      setNewPosition({ ...newPosition, name: e.target.value })
                    }
                  />
                </div>
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
                  onClick={editPosition ? updatePosition : addNewPosition}
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
