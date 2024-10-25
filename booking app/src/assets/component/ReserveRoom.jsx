import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../js/bootstrap.js";
import background from "../pic/background.png";
import SeachIcon from "../pic/search.png";
import RoomImage from "../pic/room1.jpg";

function ReserveRoom() {
  const [rooms, setRooms] = useState([
    {
      id: "001",
      name: "Melon room",
      building: "ตึก A",
      floor: "ชั้น 1",
      status: "ว่าง",
      statusColor: "text-success",
      type: "ทั่วไป",
      capacity: "15 - 20 คน",
      img: RoomImage,
      date: "15/9/67",
      time: "16.00-18.00",
    },
    // Add more room objects as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);


  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="grid-container"
      style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}
    >
      <div className="grid-item" style={{ gridColumn: "1 / -1" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1170px",
            height: "auto",
            borderRadius: "41px",
            background: "white",
            margin: "0 auto",
          }}
        >
          <div style={{ position: "relative", borderRadius: "41px" }}>
            <img
              src={background}
              alt="background"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "41px",
                filter: "brightness(100%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "3%",
              width: "316px",
              maxWidth: "1170px",
              height: "59px",
              borderRadius: "40px",
              background: "#4C6275",
            }}
          >
            <div
              className="text-center text-white"
              style={{
                fontSize: "25px",
                fontWeight: "lighter",
                margin: "0",
                paddingTop: "10px",
              }}
            >
              การเข้าใช้ห้อง
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "3%",
              width: "395px",
              height: "58px",
              borderRadius: "24px",
              background: "#ffffff",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              border: focused ? "2px solid black" : "none", // เพิ่มขอบเมื่อโฟกัส
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            tabIndex="0" // ทำให้ div นี้สามารถโฟกัสได้
          >
            <img
              src={SeachIcon}
              alt="search"
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <input
              type="text"
              placeholder="ค้นหาชื่อหรือรหัส"
              style={{
                flex: 1,
                height: "100%",
                borderRadius: "24px",
                border: "none",
                paddingLeft: "10px",
                outline: "none",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setFocused(true)} // ตั้งค่าเมื่อ input ถูกโฟกัส
              onBlur={() => setFocused(false)} // ตั้งค่าเมื่อ input สูญเสียการโฟกัส
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "absolute",
              top: "35%",
              left: "3%",
              width: "94%",
            }}
          >
            {filteredRooms.map((room, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  border: "solid black",
                  borderRadius: "24px",
                  padding: "20px",
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                <img
                  src={room.img}
                  alt="room"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "35px",
                    marginRight: "20px",
                    border: "solid 1px black",
                  }}
                />
                <div
                  style={{ position: "absolute", left: 50, marginTop: "110px" }}
                >
                  {room.type}
                </div>
                <div style={{ flex: 1 }}>
                  <div>ชื่อ: {room.name}</div>
                  <div>
                    ตึก: {room.building} ชั้น: {room.floor}
                  </div>
                  <div>
                    สถานะ:{" "}
                    <span style={{ color: room.statusColor }}>
                      {room.status}
                    </span>
                  </div>
                  <div>จำนวน: {room.capacity}</div>
                </div>
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "40px",
                    width: "30%",
                  }}
                >
                  <div style={{ marginLeft: "-80px" }}>Date: {room.date}</div>
                  <div style={{ marginLeft: "-80px" }}>Time: {room.time}</div>
                </div>
                <div style={{ marginLeft: "40px", width: "30%" }}>
                  <button
                    style={{
                      background: "#4C6275",
                      color: "white",
                      width: "100%",
                      borderRadius: "12px",
                      padding: "10px",
                      display: "block",
                      border: "none",
                      transition: "box-shadow 0.3s ease", // Smooth transition
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = "none";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.5)";
                    }}
                  >
                    ข้อมูลห้อง
                  </button>
                  <button
                    style={{
                      background: "#4C6275",
                      color: "white",
                      width: "100%",
                      borderRadius: "12px",
                      padding: "10px",
                      marginTop: "10px",
                      display: "block",
                      border: "none",

                      transition: "box-shadow 0.3s ease", // Smooth transition
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = "none";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.5)";
                    }}
                  >
                    แสดงQR Code
                  </button>
                  <button
                    style={{
                      background: "#D2691E",
                      color: "white",
                      width: "100%",
                      borderRadius: "12px",
                      padding: "10px",
                      marginTop: "10px",
                      display: "block",
                      border: "none",
                      transition: "box-shadow 0.3s ease", // Smooth transition
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = "none";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.5)";
                    }}
                  >
                    ยกเลิกการจองห้อง
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveRoom;
