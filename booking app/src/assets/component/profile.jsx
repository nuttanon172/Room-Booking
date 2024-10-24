import React, { useState, useEffect } from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({}); // ข้อมูลพนักงาน
  const [isEditing, setIsEditing] = useState(false); // สถานะของโหมดแก้ไข
  const [editedProfile, setEditedProfile] = useState({}); // ข้อมูลที่แก้ไข

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5020/Profile'); // URL ของ API
        if (response.data && response.data.length > 0) {
          setProfile(response.data[0]); // เลือกคนแรก
          setEditedProfile(response.data[0]); // สำเนาข้อมูลเพื่อแก้ไข
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
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
      const response = await axios.put('http://localhost:5020/EditProfile', editedProfile); // ส่งข้อมูลไปยัง API
      setProfile(editedProfile); // อัปเดตโปรไฟล์หลังจากบันทึกสำเร็จ
      setIsEditing(false); // ปิดโหมดแก้ไข
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <div className="container p-10" style={{ maxWidth: '900px', backgroundColor: '#E8F4FB', borderRadius: '15px' }}>
      {/* Edit Button */}
      <div className="d-flex justify-content-end mb-4">
        <button 
          className="btn" 
          style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }} 
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? 'บันทึก' : 'แก้ไขข้อมูล'}
        </button>
      </div>

      {/* Profile Card */}
      <div className="card shadow-sm p-3 mb-3" style={{ borderRadius: '10px', backgroundColor: '#F0F8FF' }}>
        <div className="d-flex align-items-center">
          {/* Profile Image */}
          <img
            src="https://cdn.discordapp.com/attachments/1280874345505357917/1291370203044642936/a953aa30c5e87e56.webp"
            alt="Profile"
            className="rounded-circle"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          {/* Profile Info */}
          <div className="ms-4">
            <h5>ID : {profile.id || 'N/A'}</h5>
            <p className="mb-1">ชื่อ : {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedProfile.name || ''}
                onChange={handleInputChange}
              />
            ) : (
              profile.name || 'N/A'
            )}</p>
            <p className="mb-1">นามสกุล : {isEditing ? (
              <input
                type="text"
                name="lname"
                value={editedProfile.lname || ''}
                onChange={handleInputChange}
              />
            ) : (
              profile.lname || 'N/A'
            )}</p>
            <p className="mb-1">ตำแหน่ง : {isEditing ? (
              <input
                type="text"
                name="role_name"
                value={editedProfile.role_name || ''}
                onChange={handleInputChange}
              />
            ) : (
              profile.role_name || 'N/A'
            )}</p>
            <p className="mb-1">แผนก : {isEditing ? (
              <input
                type="text"
                name="dpname"
                value={editedProfile.dpname || ''}
                onChange={handleInputChange}
              />
            ) : (
              profile.dpname || 'N/A'
            )}</p>
            <p className="mb-1">เพศ : {isEditing ? (
              <input
                type="text"
                name="sex"
                value={editedProfile.sex || ''}
                onChange={handleInputChange}
              />
            ) : (
              profile.sex || 'N/A'
            )}</p>
            <p className="mb-1">อีเมล์ : {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedProfile.email || ''}
                onChange={handleInputChange}
              />
            ) : (
              profile.email || 'N/A'
            )}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
