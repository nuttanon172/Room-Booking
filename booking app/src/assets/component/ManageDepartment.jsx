import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DepartmentManagement() {
  const [departments, setDepartments] = useState([
    { id: "D001", name: "ฝ่ายบัญชี" },
    { id: "D002", name: "ฝ่ายทรัพยากรบุคคล" },
    { id: "D003", name: "ฝ่ายไอที" },
  ]);

  const [newDepartment, setNewDepartment] = useState({
    id: "",
    name: "",
  });

  const [editDepartment, setEditDepartment] = useState(null); // เก็บแผนกที่กำลังแก้ไข
  const [showModal, setShowModal] = useState(false); // แสดง/ซ่อน modal
  const [searchTerm, setSearchTerm] = useState(""); // เก็บคำค้นหา

  // ฟังก์ชันเพิ่มแผนก
  const addNewDepartment = () => {
    setDepartments([...departments, newDepartment]);
    setShowModal(false);
  };

  // ฟังก์ชันลบแผนก
  const deleteDepartment = (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบแผนกนี้ใช่หรือไม่?");
    if (confirmDelete) {
      setDepartments(departments.filter((dept) => dept.id !== id));
    }
  };

  // ฟังก์ชันสำหรับแสดงฟอร์มแก้ไขแผนก
  const editDepartmentDetails = (dept) => {
    setEditDepartment(dept);
    setNewDepartment(dept);
    setShowModal(true);
  };

  // ฟังก์ชันบันทึกการแก้ไขแผนก
  const saveEditDepartment = () => {
    setDepartments(
      departments.map((dept) =>
        dept.id === editDepartment.id ? { ...dept, ...newDepartment } : dept
      )
    );
    setEditDepartment(null);
    setShowModal(false);
  };

  // ฟังก์ชันสำหรับการค้นหาแผนก
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Top Section */}
      <div className="mb-4">
        <h1 className="mb-3">จัดการแผนก</h1>

        <div className="row">
          <div className="col-md-8 mb-3">
            {/* ฟิลด์ค้นหา */}
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="ค้นหาแผนกหรือรหัสแผนก"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3 d-flex justify-content-end">
            <button
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: "#49647C", width: "200px" }}
              onClick={() => {
                setNewDepartment({ id: "", name: "" });
                setShowModal(true);
              }}
            >
              เพิ่มแผนก
            </button>
          </div>
        </div>
      </div>

      {/* Department List */}
      <div className="row">
        <div className="col-12">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept) => (
              <div key={dept.id} className="card mb-4 shadow-sm border-0">
                <div className="row g-0">
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-2">ชื่อแผนก : {dept.name}</h5>
                      <p className="card-text mb-2">รหัสแผนก : {dept.id}</p>
                    </div>
                  </div>

                  <div className="col-md-4 d-flex flex-column justify-content-center align-items-end">
                    <button
                      className="btn btn-secondary mb-2 mt-3 btn-lg"
                      onClick={() => editDepartmentDetails(dept)}
                      style={{ width: "300px", backgroundColor: "#35374B" }}
                    >
                      แก้ไขแผนก
                    </button>
                    <button
                      className="btn btn-danger btn-lg mb-3"
                      onClick={() => deleteDepartment(dept.id)}
                      style={{ width: "300px", backgroundColor: "#AC5050" }}
                    >
                      ลบแผนก
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>ไม่พบข้อมูลแผนกที่ค้นหา</p>
          )}
        </div>
      </div>

      {/* Modal สำหรับเพิ่ม/แก้ไขแผนก */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editDepartment ? "แก้ไขข้อมูลแผนก" : "เพิ่มแผนก"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">ชื่อแผนก</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newDepartment.name}
                    onChange={(e) =>
                      setNewDepartment({ ...newDepartment, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">รหัสแผนก</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newDepartment.id}
                    onChange={(e) =>
                      setNewDepartment({ ...newDepartment, id: e.target.value })
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
                  onClick={editDepartment ? saveEditDepartment : addNewDepartment}
                >
                  {editDepartment ? "บันทึกการแก้ไข" : "บันทึก"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentManagement;