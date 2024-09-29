import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      firstName: "John",
      lastName: "Doe",
      gender: "ชาย",
      email: "john.doe@example.com",
      department: "IT",
      position: "Developer",
      img: "",
    },
    {
      id: "EMP002",
      firstName: "Jane",
      lastName: "Smith",
      gender: "หญิง",
      email: "jane.smith@example.com",
      department: "HR",
      position: "HR Manager",
      img: "",
    },
    {
      id: "EMP003",
      firstName: "Bob",
      lastName: "Johnson",
      gender: "ชาย",
      email: "bob.johnson@example.com",
      department: "Sales",
      position: "Sales Executive",
      img: "",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "ชาย",
    email: "",
    department: "",
    position: "",
    img: "",
  });
  
  const [editEmployee, setEditEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  const addNewEmployee = () => {
    setEmployees([...employees, newEmployee]);
    setShowModal(false);
  };

  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?");
    if (confirmDelete) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const editEmployeeDetails = (employee) => {
    setEditEmployee(employee);
    setNewEmployee(employee);
    setShowModal(true);
  };

  const saveEditEmployee = () => {
    setEmployees(
      employees.map((employee) =>
        employee.id === editEmployee.id ? { ...employee, ...newEmployee } : employee
      )
    );
    setEditEmployee(null);
    setShowModal(false);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Top Section */}
      <div className="mb-4">
        <h1 className="mb-3">จัดการพนักงาน</h1>

        <div className="col-12 input-group mb-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="ค้นหาชื่อหรือรหัสพนักงาน"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-7 d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary btn-lg me-3"
              style={{ backgroundColor: "#49647C", width: "200px" }}
              onClick={() => {
                setNewEmployee({
                  id: "",
                  firstName: "",
                  lastName: "",
                  gender: "ชาย",
                  email: "",
                  department: "",
                  position: "",
                  img: "",
                });
                setShowModal(true);
              }}
            >
              เพิ่มพนักงาน
            </button>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="row">
        <div className="col-12">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="card mb-4 shadow-sm border-0">
              <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center ms-3">
                  {/* แสดงรูปภาพ */}
                  <img
                    src={employee.img || "path_to_placeholder_image"} // ใช้รูป placeholder ถ้ายังไม่มีรูป
                    alt="Employee"
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
                    <h5 className="card-title mb-2">ชื่อ : {employee.firstName} {employee.lastName}</h5>
                    <p className="card-text mb-2">รหัสพนักงาน : {employee.id}</p>
                    <p className="card-text mb-2">ตำแหน่ง : {employee.position}</p>
                   
                  </div>
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end">
                  <button
                    className="btn btn-secondary mb-2 mt-3 btn-lg"
                    onClick={() => editEmployeeDetails(employee)}
                    style={{ width: "300px", backgroundColor: "#35374B" }}
                  >
                    แก้ไขข้อมูล
                  </button>
                  <button
                    className="btn btn-danger btn-lg mb-2"
                    onClick={() => deleteEmployee(employee.id)}
                    style={{ width: "300px", backgroundColor: "#AC5050" }}
                  >
                    ลบพนักงาน
                  </button>
                  <button
                      className="btn btn-info btn-lg border-light mb-3 "
                      onClick={() => setShowDetails(employee)}
                      style={{ width: "300px", backgroundColor: "#DAEEF7" }}
                    >
                      ดูรายละเอียด
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal สำหรับแสดงรายละเอียดพนักงาน */}
      {showDetails && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">รายละเอียดพนักงาน: {showDetails.firstName} {showDetails.lastName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetails(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>รหัสพนักงาน: {showDetails.id}</p>
                <p>อีเมล: {showDetails.email}</p>
                <p>เพศ: {showDetails.gender}</p>
                <p>แผนก: {showDetails.department}</p>
                <p>ตำแหน่ง: {showDetails.position}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDetails(null)}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal สำหรับเพิ่ม/แก้ไขพนักงาน */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editEmployee ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มพนักงาน"}
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
                      setNewEmployee({
                        ...newEmployee,
                        img: URL.createObjectURL(e.target.files[0]), // อัปเดต URL รูปภาพทันที
                      })
                    }
                  />
                </div>
                {/* ชื่อ */}
                <div className="mb-3">
                  <label className="form-label">ชื่อ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.firstName}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, firstName: e.target.value })
                    }
                  />
                </div>
                {/* นามสกุล */}
                <div className="mb-3">
                  <label className="form-label">นามสกุล</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.lastName}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, lastName: e.target.value })
                    }
                  />
                </div>
                {/* รหัสพนักงาน */}
                <div className="mb-3">
                  <label className="form-label">รหัสพนักงาน</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.id}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, id: e.target.value })
                    }
                  />
                </div>
                {/* เพศ */}
                <div className="mb-3">
                  <label className="form-label">เพศ</label>
                  <select
                    className="form-select"
                    value={newEmployee.gender}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, gender: e.target.value })
                    }
                  >
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
                {/* อีเมล */}
                <div className="mb-3">
                  <label className="form-label">อีเมล</label>
                  <input
                    type="email"
                    className="form-control"
                    value={newEmployee.email}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                  />
                </div>
                {/* แผนก */}
                <div className="mb-3">
                  <label className="form-label">แผนก</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.department}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, department: e.target.value })
                    }
                  />
                </div>
                {/* ตำแหน่ง */}
                <div className="mb-3">
                  <label className="form-label">ตำแหน่ง</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.position}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, position: e.target.value })
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
                  onClick={editEmployee ? saveEditEmployee : addNewEmployee}
                >
                  {editEmployee ? "บันทึกการแก้ไข" : "บันทึก"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;
