import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../js/bootstrap.js";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({}); // ข้อมูลพนักงาน
  const [isEditing, setIsEditing] = useState(false); // สถานะของโหมดแก้ไข
  const [editedProfile, setEditedProfile] = useState({}); // ข้อมูลที่แก้ไข
  const [roles, setRoles] = useState([]); // เก็บรายการตำแหน่งทั้งหมด
  const [departments, setDepartments] = useState([]); // เก็บรายการแผนกทั้งหมด
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5020/Profile"); // URL ของ API
        if (response.data && response.data.length > 0) {
          setProfile(response.data[0]); // เลือกคนแรก
          setEditedProfile(response.data[0]); // สำเนาข้อมูลเพื่อแก้ไข
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchRolesAndDepartments = async () => {
      try {
        // ดึงรายการตำแหน่ง (roles) และแผนก (departments) จาก API
        const roleResponse = await axios.get("http://localhost:5020/Roles");
        const deptResponse = await axios.get(
          "http://localhost:5020/Departments"
        );
        setRoles(roleResponse.data);
        setDepartments(deptResponse.data);
      } catch (error) {
        console.error("Error fetching roles or departments:", error);
      }
    };

    fetchProfile();
    fetchRolesAndDepartments();
  }, []);

  // ฟังก์ชันสำหรับเปิด/ปิดโหมดแก้ไข
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // ฟังก์ชันสำหรับจัดการกับการเปลี่ยนแปลงของฟิลด์ที่แก้ไข
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไข
  const handleSaveClick = async () => {
    try {
      const updatedProfile = {
        ...editedProfile,
        id: parseInt(editedProfile.id, 10), // แปลง id เป็นตัวเลข
        dept_id: parseInt(editedProfile.dept_id, 10), // แปลง dept_id เป็นตัวเลข
        role_id: parseInt(editedProfile.role_id, 10), // แปลง role_id เป็นตัวเลข
      };

      console.log("Sending data:", updatedProfile); // เพิ่ม logging เพื่อดูข้อมูลที่ส่งไป
      await axios.put("http://localhost:5020/Profile", updatedProfile); // อัปเดตข้อมูลที่แก้ไข
      setProfile(updatedProfile); // อัปเดตโปรไฟล์ด้วยข้อมูลใหม่
      setIsEditing(false); // ปิดโหมดแก้ไข
    } catch (error) {
      console.error("Error updating profile:", error); // เพิ่ม logging ข้อผิดพลาด
    }
};


  const fetchRolesAndDepartments = async () => {
    try {
      // ดึงรายการตำแหน่ง (roles) และแผนก (departments) จาก API
      const roleResponse = await axios.get("http://localhost:5020/Roles");
      const deptResponse = await axios.get("http://localhost:5020/Departments");
      setRoles(roleResponse.data); // เก็บรายการตำแหน่ง
      setDepartments(deptResponse.data); // เก็บรายการแผนก
    } catch (error) {
      console.error("Error fetching roles or departments:", error);
    }
  };

  return (
    <div
      className="container p-10"
      style={{
        maxWidth: "900px",
        backgroundColor: "#E8F4FB",
        borderRadius: "15px",
      }}
    >
      {/* Profile Card */}
      <div
        className="card shadow-sm p-3 mb-3"
        style={{ borderRadius: "10px", backgroundColor: "#F0F8FF" }}
      >
        <div className="d-flex align-items-center">
          {/* Profile Image */}
          <img
            src="https://yt3.googleusercontent.com/NvH3G0-twMfxjeJLZOQvmaJ5loWfS6hOfIKPv2M_Gh5r3b7nLo8IljtEdjH_Ga27xxRtrErD=s900-c-k-c0x00ffffff-no-rj"
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          {/* Profile Info */}
          <div className="ms-4">
            <h5>ID : {profile.id || "N/A"}</h5>
            <p className="mb-1">
              ชื่อ :{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name || ""}
                  onChange={handleInputChange}
                />
              ) : (
                profile.name || "N/A"
              )}
            </p>
            <p className="mb-1">
              นามสกุล :{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="lname"
                  value={editedProfile.lname || ""}
                  onChange={handleInputChange}
                />
              ) : (
                profile.lname || "N/A"
              )}
            </p>
            <p className="mb-1">
              ตำแหน่ง :{" "}
              {isEditing ? (
                <select
                  name="role_id"
                  value={editedProfile.role_id || ""}
                  onChange={handleInputChange}
                  className="form-control"
                >
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

            <p className="mb-1">
              แผนก :{" "}
              {isEditing ? (
                <select
                  name="dept_id"
                  value={editedProfile.dept_id || ""}
                  onChange={handleInputChange}
                  className="form-control"
                >
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

            <p className="mb-1">
              เพศ :{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="sex"
                  value={editedProfile.sex || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                profile.sex || "N/A"
              )}
            </p>

            <p className="mb-1">
              อีเมล์ :{" "}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email || ""}
                  onChange={handleInputChange}
                />
              ) : (
                profile.email || "N/A"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="text-end">
        <button
          className="btn"
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
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