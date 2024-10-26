import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../js/bootstrap.js";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(""); // เพิ่ม state สำหรับจัดการ error

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5020/Profile");
        if (response.data && response.data.length > 0) {
          setProfile(response.data[0]);
          setEditedProfile(response.data[0]);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchRolesAndDepartments = async () => {
      try {
        const roleResponse = await axios.get("http://localhost:5020/Roles");
        const deptResponse = await axios.get("http://localhost:5020/Departments");
        setRoles(roleResponse.data);
        setDepartments(deptResponse.data);
      } catch (error) {
        console.error("Error fetching roles or departments:", error);
      }
    };

    fetchProfile();
    fetchRolesAndDepartments();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSaveClick = async () => {
    if (!editedProfile.role_id) {
      setError("กรุณาเลือกตำแหน่ง");
      return;
    }

    if (!editedProfile.dept_id) {
      setError("กรุณาเลือกแผนก");
      return;
    }

    try {
      const updatedProfile = {
        ...editedProfile,
        id: parseInt(editedProfile.id, 10),
        dept_id: parseInt(editedProfile.dept_id, 10),
        role_id: parseInt(editedProfile.role_id, 10),
      };

      console.log("Sending data:", updatedProfile);
      await axios.put("http://localhost:5020/Profile", updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setError(""); // ล้างข้อความ error เมื่อบันทึกสำเร็จ
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div
      className="container p-10"
      style={{
        maxWidth: "1200px", // ขยายขนาด container
        backgroundColor: "#E8F4FB",
        borderRadius: "15px",
        marginTop: "20px",
        padding: "20px",
        fontSize: "18px" // เพิ่มขนาดฟอนต์
      }}
    >
      <div
        className="card shadow-sm p-4 mb-3"
        style={{ borderRadius: "10px", backgroundColor: "#F0F8FF" }}
      >
        <div className="d-flex align-items-center">
          <img
            src="https://yt3.googleusercontent.com/NvH3G0-twMfxjeJLZOQvmaJ5loWfS6hOfIKPv2M_Gh5r3b7nLo8IljtEdjH_Ga27xxRtrErD=s900-c-k-c0x00ffffff-no-rj"
            alt="Profile"
            className="rounded-circle"
            style={{ width: "140px", height: "140px", objectFit: "cover" }} // เพิ่มขนาดรูปภาพ
          />
          <div className="ms-4" style={{ width: "100%" }}>
            <p className="mb-2">ชื่อ :{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                profile.name || "N/A"
              )}
            </p>
            <p className="mb-2">นามสกุล :{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="lname"
                  value={editedProfile.lname || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                profile.lname || "N/A"
              )}
            </p>
            <p className="mb-2">ตำแหน่ง :{" "}
              {isEditing ? (
                <select
                  name="role_id"
                  value={editedProfile.role_id || ""}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">โปรดเลือกตำแหน่ง</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              ) : (
                profile.role_name || "N/A"
              )}
            </p>
            <p className="mb-2">แผนก :{" "}
              {isEditing ? (
                <select
                  name="dept_id"
                  value={editedProfile.dept_id || ""}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">โปรดเลือกแผนก</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              ) : (
                profile.dpname || "N/A"
              )}
            </p>
            <p className="mb-2">เพศ :{" "}
              {isEditing ? (
                <div>
                  <label className="me-3">
                    <input
                      type="radio"
                      name="sex"
                      value="ชาย"
                      checked={editedProfile.sex === "ชาย"}
                      onChange={handleInputChange}
                      className="form-check-input"
                    /> ชาย
                  </label>
                  <label className="me-3">
                    <input
                      type="radio"
                      name="sex"
                      value="หญิง"
                      checked={editedProfile.sex === "หญิง"}
                      onChange={handleInputChange}
                      className="form-check-input"
                    /> หญิง
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="ไม่ระบุ"
                      checked={editedProfile.sex === "ไม่ระบุ"}
                      onChange={handleInputChange}
                      className="form-check-input"
                    /> ไม่ระบุ
                  </label>
                </div>
              ) : (
                profile.sex || "N/A"
              )}
            </p>
            <p className="mb-2">อีเมล์ :{" "}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                profile.email || "N/A"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>} {/* แสดงข้อความแจ้ง error */}

      <div className="text-end">
        <button
          className="btn btn-lg" // เพิ่มขนาดปุ่มด้วย btn-lg
          style={{
            backgroundColor: "#4C6275",
            color: "white",
            border: "none",
            padding: "10px 20px",
            fontSize: "18px", // เพิ่มขนาดฟอนต์ในปุ่ม
          }}
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? "บันทึก" : "แก้ไขข้อมูล"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
