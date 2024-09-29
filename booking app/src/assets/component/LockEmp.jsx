import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function LockListManagement() {
  const [lockedEmployees, setLockedEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      position: "Developer",
      department: "IT",
      warningCount: 1, // จำนวนการโดนเตือน
      img: "",
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      position: "HR Manager",
      department: "HR",
      warningCount: 2,
      img: "",
    },
    {
      id: "EMP003",
      name: "Michael Brown",
      position: "Sales Executive",
      department: "Sales",
      warningCount: 3,
      img: "",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // ฟังก์ชันปลดล็อกและลบพนักงานออกจากรายการ
  const unlockEmployee = (id) => {
    const confirmUnlock = window.confirm("คุณต้องการปลดล็อกพนักงานคนนี้หรือไม่?");
    if (confirmUnlock) {
      setLockedEmployees(lockedEmployees.filter((employee) => employee.id !== id));
    }
  };

  const filteredEmployees = lockedEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Top Section */}
      <div className="mb-4">
        <h1 className="mb-3">รายชื่อที่โดน Lock</h1>

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
        </div>
      </div>

      {/* Lock List */}
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
                    <h5 className="card-title mb-2">ชื่อ-นามสกุล : {employee.name}</h5>
                    <p className="card-text mb-2">รหัสพนักงาน : {employee.id}</p>
                    <p className="card-text mb-2">ตำแหน่ง : {employee.position}</p>
                    <p className="card-text mb-2">แผนก : {employee.department}</p>
                  </div>
                </div>

                <div className="col-md-3 d-flex flex-column justify-content-center align-items-end">
                  <p className="mb-2" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    เตือน : {employee.warningCount}/3
                  </p>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => unlockEmployee(employee.id)}
                    style={{ width: "300px", backgroundColor: "#49647C" }}
                  >
                    ปลดล็อคและรีเซ็ต
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

export default LockListManagement;
