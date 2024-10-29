import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    lname: "",
    nlock: "0", // ตั้งค่าเริ่มต้นเป็น 0
    sex: "ชาย",
    email: "",
    password: "",
    dept_id: "",
    role_id: "",
    img: "",
  });
  const [editEmployee, setEditEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null); // State for showing employee details
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // For error message

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("http://localhost:5020/employees");
      setEmployees(response.data);
    };

    const fetchRolesAndDepartments = async () => {
      try {
        const rolesResponse = await axios.get("http://localhost:5020/Roles");
        const departmentsResponse = await axios.get("http://localhost:5020/departments");
        setRoles(rolesResponse.data);
        setDepartments(departmentsResponse.data);
      } catch (error) {
        console.error("Error fetching roles or departments:", error);
      }
    };

    fetchEmployees();
    fetchRolesAndDepartments();
  }, []);

  const addNewEmployee = async () => {
    if (!newEmployee.id || !newEmployee.name || !newEmployee.lname || !newEmployee.email || !newEmployee.password || !newEmployee.dept_id || !newEmployee.role_id) {
      setErrorMessage("กรุณากรอกข้อมูลในทุกช่องให้ครบถ้วน");
      return;
    }

    const formattedEmployee = {
      ...newEmployee,
      id: parseInt(newEmployee.id, 10),
      nlock: parseInt(newEmployee.nlock, 10),
      dept_id: parseInt(newEmployee.dept_id, 10),
      role_id: parseInt(newEmployee.role_id, 10),
    };

    try {
      console.log("Sending data to API (Add):", formattedEmployee);
      await axios.post("http://localhost:5020/employees", formattedEmployee);
      setEmployees([...employees, formattedEmployee]);
      setShowModal(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding employee:", error);
      setErrorMessage("ไม่สามารถเพิ่มพนักงานได้ กรุณาลองอีกครั้ง");
    }
  };

  const updateEmployee = async () => {
    if (!newEmployee.id || !newEmployee.name || !newEmployee.lname || !newEmployee.email || !newEmployee.password || !newEmployee.dept_id || !newEmployee.role_id) {
      setErrorMessage("กรุณากรอกข้อมูลในทุกช่องให้ครบถ้วน");
      return;
    }

    const formattedEmployee = {
      ...newEmployee,
      id: parseInt(newEmployee.id, 10),
      dept_id: parseInt(newEmployee.dept_id, 10),
      role_id: parseInt(newEmployee.role_id, 10),
    };

    try {
      console.log("Sending data to API (Update):", formattedEmployee);
      await axios.put(`http://localhost:5020/employees/${editEmployee.id}`, formattedEmployee);
      setEmployees(
        employees.map((emp) => (emp.id === editEmployee.id ? { ...emp, ...formattedEmployee } : emp))
      );
      setEditEmployee(null);
      setShowModal(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating employee:", error);
      setErrorMessage("ไม่สามารถแก้ไขข้อมูลพนักงานได้ กรุณาลองอีกครั้ง");
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?")) {
      try {
        await axios.delete(`http://localhost:5020/employees/${id}`);
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEmployee({ ...newEmployee, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-3">จัดการพนักงาน</h1>

      {/* Search bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="ค้นหาด้วยชื่อหรือรหัสพนักงาน"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>
            เพิ่มพนักงาน
          </button>
        </div>
      </div>

      {/* Employee List */}
      <div className="row">
        <div className="col-md-12">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="card mb-4 shadow-sm border-0">
              <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center ms-3">
                  <img
                    src={employee.img || "path_to_placeholder_image"}
                    alt="Employee"
                    className="img-fluid rounded-circle border border-dark border-2"
                    style={{ objectFit: "cover", height: "130px", width: "140px" }}
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="card-body">
                    <h5 className="card-title">
                      ชื่อ : {employee.name} {employee.lname}
                    </h5>
                    <p>รหัสพนักงาน : {employee.id}</p>
                    <p>ตำแหน่ง : {employee.role_name}</p>
                  </div>
                </div>
                <div className="col-md-3 d-flex flex-column align-items-end">
                  <button
                    className="btn btn-secondary mb-2 mt-3"
                    style={{ width: '200px' }}
                    onClick={() => {
                      setEditEmployee(employee);
                      setNewEmployee(employee); // กำหนดข้อมูลพนักงานที่จะแก้ไข
                      setShowModal(true);
                    }}
                  >
                    แก้ไขข้อมูล
                  </button>
                  <button
                    className="btn btn-danger mb-2"
                    style={{ width: '200px' }}
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    ลบพนักงาน
                  </button>
                  <button
                    className="btn btn-info mb-2"
                    style={{ width: '200px' }}
                    onClick={() => setShowDetails(employee)}
                  >
                    แสดงรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal สำหรับเพิ่ม/แก้ไขพนักงาน */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editEmployee ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มพนักงาน"}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Error message */}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="mb-3">
                  <label>รหัสพนักงาน</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.id}
                    onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>ชื่อ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>นามสกุล</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.lname}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lname: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>เพศ</label>
                  <select
                    className="form-control"
                    value={newEmployee.sex}
                    onChange={(e) => setNewEmployee({ ...newEmployee, sex: e.target.value })}
                  >
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>อีเมล</label>
                  <input
                    type="email"
                    className="form-control"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>รหัสผ่าน</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>แผนก</label>
                  <select
                    className="form-control"
                    value={newEmployee.dept_id}
                    onChange={(e) => setNewEmployee({ ...newEmployee, dept_id: e.target.value })}
                  >
                    <option value="">เลือกแผนก</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label>ตำแหน่ง</label>
                  <select
                    className="form-control"
                    value={newEmployee.role_id}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role_id: e.target.value })}
                  >
                    <option value="">เลือกตำแหน่ง</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label>เลือกรูปภาพ</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  ปิด
                </button>
                <button
                  className="btn btn-primary"
                  onClick={editEmployee ? updateEmployee : addNewEmployee}
                >
                  {editEmployee ? "บันทึกการแก้ไข" : "เพิ่มพนักงาน"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal แสดงรายละเอียดพนักงาน */}
      {showDetails && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  รายละเอียดพนักงาน: {showDetails.name} {showDetails.lname}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetails(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>รหัสพนักงาน: {showDetails.id}</p>
                <p>ชื่อ: {showDetails.name}</p>
                <p>นามสกุล: {showDetails.lname}</p>
                <p>รหัสล็อก: {showDetails.nlock}</p> {/* แสดงรหัสล็อกที่นี่ */}
                <p>เพศ: {showDetails.sex}</p>
                <p>อีเมล: {showDetails.email}</p>
                <p>รหัสผ่าน: {showDetails.password}</p>
                <p>แผนก: {showDetails.dept_name}</p>
                <p>ตำแหน่ง: {showDetails.role_name}</p>
                {showDetails.img && (
                  <div className="mt-3">
                    <img
                      src={showDetails.img}
                      alt="Employee"
                      className="img-fluid rounded"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
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
    </div>
  );
}

export default EmployeeManagement;
