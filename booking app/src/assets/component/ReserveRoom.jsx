import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../js/bootstrap.js";
import SeachIcon from "../pic/search.png";
import RoomImage from "../pic/room1.jpg";
import { useNavigate } from "react-router-dom";

function ReserveRoom() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch rooms data
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:5020/rooms/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      return await response.json();
    };

    // Fetch user booking data
    const fetchUserBookings = async () => {
      const response = await fetch("http://localhost:5020/userBooking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user bookings");
      }
      return await response.json();
    };

    // Fetch all room addresses at once
    const fetchRoomAddresses = async () => {
      const response = await fetch("http://localhost:5020/addresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      return await response.json();
    };

    const fetchData = async () => {
      try {
        const [roomsData, bookingsData, addressData] = await Promise.all([
          fetchRooms(),
          fetchUserBookings(),
          fetchRoomAddresses(),
        ]);

        // Combine the data based on room ID
        const formattedRooms = bookingsData.map((booking) => {
          const room = roomsData.find((room) => room.id === booking.room_id);
          const address = room
            ? addressData.find((address) => address.id === room.address_id)
            : null;

          return {
            id: room ? room.id : booking.room_id,
            name: room ? room.name : `Room ${booking.room_id}`,
            description: room ? room.description : "none description",
            building: address ? address.building_name : "Unknown",
            floor: address ? address.floor_name : "Unknown",
            status: mapStatusToLabel(booking.status_id).label,
            statusColor: mapStatusToLabel(booking.status_id).color,
            type: room ? room.room_type_id : "General",
            capacity: room ? `${room.cap} people` : "15 - 20 people",
            img: RoomImage,
            date: new Date(booking.start_time).toLocaleDateString("th-TH"),
            time: `${new Date(booking.start_time).toLocaleTimeString("th-TH")} - ${new Date(booking.end_time).toLocaleTimeString("th-TH")}`,
            bookingID: booking.id
          };
        });

        setRooms(formattedRooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const mapStatusToLabel = (statusId) => {
    switch (statusId) {
      case 1: return { label: "Pending", color: "text-secondary" };
      case 5: return { label: "Waiting", color: "text-warning" };
      case 6: return { label: "Using", color: "text-success" };
      default: return { label: "Unknown", color: "text-secondary" };
    }
  };

  const sentwo = (room) => {
    navigate("/Detail", { state: { roomData: room } });
  };

  const showQRCode = (room) => {
    console.log(room)
    navigate('/QRcodeScanner', { state: { bookingData: room } });
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toString().includes(searchTerm.toLowerCase())
  );

  const cancelBooking = async (room) => {
    const reason = window.prompt("กรุณากรอกเหตุผลในการยกเลิกการจองห้อง:");

    // ตรวจสอบว่าเหตุผลไม่เว้นว่าง
    if (!reason || reason.trim() === "") {
      alert("กรุณากรอกเหตุผลหากต้องการยกเลิกการจอง");
      return;
    }

    const confirmCancel = window.confirm("คุณต้องการยกเลิกการจองห้องนี้หรือไม่?");
    if (!confirmCancel) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5020/cancelRoom/${room.bookingID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }), // ส่งเหตุผลไปพร้อมกับคำขอ
      });
      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }
      alert("ยกเลิกการจองห้องเรียบร้อยแล้ว");
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("ไม่สามารถยกเลิกการจองได้ กรุณาลองใหม่อีกครั้ง");
    }
  };


  return (
    <div
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div
        className="grid-item"
        style={{
          width: "100%",
          maxWidth: "1170px",
          height: "auto",
          borderRadius: "41px",
          background: "white",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            width: "316px",
            height: "59px",
            borderRadius: "40px",
            background: "#4C6275",
            marginBottom: "20px",
          }}
        >
          <div
            className="text-center text-white"
            style={{
              fontSize: "25px",
              fontWeight: "lighter",
              padding: "10px",
            }}
          >
            การเข้าใช้ห้อง
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            width: "395px",
            height: "58px",
            borderRadius: "24px",
            background: "#ffffff",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            border: focused ? "2px solid black" : "none",
            marginBottom: "20px",
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          tabIndex="0"
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
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {/* Room Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
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
              <div style={{ flex: 1 }}>
                <div>ชื่อ: {room.name}</div>
                <div>ตึก: {room.building}</div>
                <div>ชั้น: {room.floor}</div>
                <div>
                  สถานะ: <span className={room.statusColor}>{room.status}</span>
                </div>
                <div>จำนวน: {room.capacity}</div>
              </div>
              <div
                style={{ textAlign: "left", marginLeft: "40px", width: "30%" }}
              >
                <div>Date: {room.date}</div>
                <div>Time: {room.time}</div>
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
                    transition: "box-shadow 0.3s ease",
                  }}
                  onClick={() => sentwo(room)}
                >
                  ข้อมูลห้อง
                </button>
                {room.status === "Waiting" && (
                  <>
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
                        transition: "box-shadow 0.3s ease",
                      }}
                      onClick={() => showQRCode(room)}
                    >
                      แสดงQR Code
                    </button>
                    <button
                      style={{
                        background: "#FF4C4C", // ใช้สีแดงสำหรับปุ่มยกเลิก
                        color: "white",
                        width: "100%",
                        borderRadius: "12px",
                        padding: "10px",
                        marginTop: "10px",
                        display: "block",
                        border: "none",
                        transition: "box-shadow 0.3s ease",
                      }}
                      onClick={() => cancelBooking(room)}
                    >
                      ยกเลิกห้อง
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReserveRoom;
