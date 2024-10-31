import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/bootstrap.min.css";
import "../js/bootstrap.js";
import Select from "react-select";
import SeachIcon from "../pic/search.png";

function Home() {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State สำหรับการค้นหาด้วยชื่อห้อง
  const [allRooms, setAllRooms] = useState([]);

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [roomOptions, setroomOptions] = useState([]);
  const [typeOptions, settypeOptions] = useState([]);

  const fetchRooms = async () => {
    try {
      console.log("fetchRooms called");

      const response = await axios.get("http://localhost:5020/home"); // URL ของ API
      console.log(response.data); // แสดงข้อมูลที่ได้รับจาก API
      setAllRooms(response.data);  // Store all rooms

      //building opt
      const buildings = Array.from(new Set(response.data.map(room => room.building)))
        .map(buildingName => {
          const buildingObj = response.data.find(room => room.building === buildingName);
          return { value: buildingObj.id, label: buildingName };
        });
      const floors = Array.from(new Set(response.data.map(room => room.floor)))
        .map(floorName => {
          const floorObj = response.data.find(room => room.floor === floorName);
          return { value: floorObj.id, label: floorName };
        });
      const rooms = Array.from(new Set(response.data.map(room => room.name)))
        .map(roomName => {
          const roomObj = response.data.find(room => room.name === roomName);
          return { value: roomObj.id, label: roomName };
        });
      const types = Array.from(new Set(response.data.map(room => room.type_name)))
        .map(typeName => {
          const typeObj = response.data.find(room => room.type_name === typeName);
          return { value: typeObj.room_type_id, label: typeName };
        });


      setBuildingOptions(buildings);
      setFloorOptions(floors);
      setroomOptions(rooms);
      settypeOptions(types);
      setFilteredRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  
  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const filtered = allRooms.filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.description && room.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRooms(filtered);
  }, [searchTerm, allRooms]);


  

  async function fetchFilteredRooms(event) {
    var check = 1;

    event.preventDefault();

    if (!selectedDate && !selectedTime && !selectedTime2) {
      setModalMessage("กรุณาเลือกวันที่และเวลาเริ่มต้นและเวลาสิ้นสุด");
      setShowModal(true);
    } else if (!selectedDate) {
      setModalMessage("กรุณาเลือกวันที่");
      setShowModal(true);
    } else if (!selectedTime || !selectedTime2) {
      setModalMessage("กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุด");
      setShowModal(true);
    }
    if (selectedTime && selectedTime2) {
      if (parseFloat(selectedTime.value) >= parseFloat(selectedTime2.value)) {
        setModalMessage("เวลาเริ่มต้นน้อยกว่าเวลาสิ้นสุด");
        setShowModal(true);
        check = 0;
      }
    }
    if (check) {
      const queryParams = new URLSearchParams({
        building: selectedBuilding ? selectedBuilding.label : "",
        floor: selectedFloor ? selectedFloor.label : "",
        room: selectedRoom ? selectedRoom.label : "",
        type: selectedType !== "all" ? selectedType.label : "",
        people: selectedPeople ? selectedPeople : "",
        date: selectedDate ? selectedDate : "",
        time: selectedTime ? selectedTime.value : "",
        time2: selectedTime2 ? selectedTime2.value : "",
      });
      const response = await fetch(`http://localhost:5020/home?${queryParams}`);
      if (!response.ok) {
        console.error("HTTP error:", response.status); // แสดงสถานะถ้าไม่ใช่ 200
        return;
      }
      const data = await response.json();
      setFilteredRooms(data);

      console.log(data);
    }
  }
  const resetFilters = () => {
    setSelectedBuilding(null);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setSelectedType("all");
    setSelectedPeople("");
    setSelectedDate("");
    setSelectedTime(null);
    setSelectedTime2(null);

    fetchRooms();
  };
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPeople, setSelectedPeople] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleSelectRoom = (room) => {
    if (!selectedDate && !selectedTime && !selectedTime2) {
      setModalMessage("กรุณาเลือกวันที่และเวลาเริ่มต้นและเวลาสิ้นสุด");
      setShowModal(true);
    } else if (!selectedDate) {
      setModalMessage("กรุณาเลือกวันที่");
      setShowModal(true);
    } else if (!selectedTime || !selectedTime2) {
      setModalMessage("กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุด");
      setShowModal(true);
    } else {
      navigate("/ยืนยัน", {
        state: {
          roomData: room,
          selectedTime: selectedTime ? selectedTime.value : null, // pass start time
          selectedTime2: selectedTime2 ? selectedTime2.value : null, // pass end time
          selectedDate: selectedDate, // pass selected date
          roompic: room.room_pic,
        },
      });
    }
  };

  const handleDetailRoom = (room) => {
    // Navigate to the next page
    navigate("/Detail", {
      state: {
        roomData: room,

        roompic: room.room_pic,
      },
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#aaa",
      },
      backgroundImage: `url(${SeachIcon})`,
      backgroundSize: "20px",
      backgroundPosition: "10px center",
      backgroundRepeat: "no-repeat",
      paddingLeft: "40px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#666",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const timeOptions = [
    { value: "6.00", label: "6.00" },
    { value: "7.00", label: "7.00" },
    { value: "8.00", label: "8.00" },
    { value: "9.00", label: "9.00" },
    { value: "10.00", label: "10.00" },
    { value: "11.00", label: "11.00" },
    { value: "12.00", label: "12.00" },
    { value: "13.00", label: "13.00" },
    { value: "14.00", label: "14.00" },
    { value: "15.00", label: "15.00" },
    { value: "16.00", label: "16.00" },
    { value: "17.00", label: "17.00" },
    { value: "18.00", label: "18.00" },
  ];

  return (
    <div className="container">
      {/* Search bar on top */}
      <div className="row mb-3" style={{ marginTop: "20px" }}>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="ค้นหาด้วยชื่อห้องหรือคำอธิบาย..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-12">
          <form className="flex-wrap" onSubmit={fetchFilteredRooms}>
            <div className="row">
              <div className="col-md-3 mb-2">
                <Select
                  styles={customStyles}
                  options={buildingOptions}
                  value={selectedBuilding}
                  onChange={setSelectedBuilding}
                  placeholder="ค้นหาตึก..."
                  isSearchable={true}
                />
              </div>
              <div className="col-md-3 mb-2">
                <Select
                  styles={customStyles}
                  options={floorOptions}
                  value={selectedFloor}
                  onChange={setSelectedFloor}
                  placeholder="ค้นหาชั้น..."
                  isSearchable={true}
                />
              </div>
              <div className="col-md-3 mb-2">
                <Select
                  styles={customStyles}
                  options={roomOptions}
                  value={selectedRoom}
                  onChange={setSelectedRoom}
                  placeholder="ค้นหาห้อง..."
                  isSearchable={true}
                />
              </div>

              <div className="col-md-3 mb-2">
                <Select
                  className="form-control"
                  value={selectedType}
                  options={typeOptions}
                  onChange={setSelectedType}
                ></Select>
              </div>
              <div className="col-md-3 mb-2">
                <label>เลือกจำนวนคน</label>
                <input
                  className="form-control"
                  type="number"
                  value={selectedPeople}
                  onChange={(e) => setSelectedPeople(e.target.value)}
                  placeholder="จำนวนคน"
                  aria-label="จำนวนคน"
                />
              </div>

              <div className="col-md-3 mb-2">
                <label>เลือกวัน</label>
                <input
                  className="form-control"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  aria-label="เลือกวันที่"
                />
              </div>

              <div className="col-md-3 mb-2">
                <label>เลือกเวลาเริ่มต้น</label>
                <Select
                  options={timeOptions}
                  value={selectedTime}
                  onChange={setSelectedTime}
                  placeholder="เลือกเวลาเริ่มต้น"
                  isSearchable={true}
                />
              </div>

              <div className="col-md-3 mb-2">
                <label>เลือกเวลาสิ้นสุด</label>
                <Select
                  options={timeOptions}
                  value={selectedTime2}
                  onChange={setSelectedTime2}
                  placeholder="เลือกเวลาสิ้นสุด"
                  isSearchable={true}
                />
              </div>
            </div>

            {/* Search and Reset buttons */}
            <div className="row">
              <div className="col-md-2 mb-2 mt-4">
                <button className="btn btn-outline-success w-100" type="submit">
                  ค้นหา
                </button>
              </div>
              <div className="col-md-2 mb-2 mt-4">
                <button
                  className="btn btn-outline-danger w-100"
                  type="button"
                  onClick={resetFilters}
                >
                  ล้างข้อมูล
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Display Rooms */}
<div className="row" style={{ padding: "10px" }}>
  {filteredRooms && filteredRooms.length > 0 ? (
    filteredRooms.map((room, index) =>
      room ? (
        <div className="col-md-3 col-sm-6 mb-4" key={index}> {/* Updated to col-md-3 */}
          <div
            className="card shadow"
            style={{
              width: "18rem",
              height: "22rem",
              borderRadius: "15px",
              border: "1px solid #ddd",
              backgroundColor: "#A4C6CC",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={room.room_pic}
                className="card-img-top"
                alt="room.room_pic"
                style={{
                  width: "18rem",
                  height: "10rem",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  backgroundColor:
                    room.type_name === "VIP Room"
                      ? "rgba(255, 215, 0, 0.8)"
                      : "#72B676",
                  color: "black",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {room.type_name}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#EED1A2",
                  color: "black",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {room.cap} Peoples
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{room.name}</h5>
              <p className="card-text mb-5">
                {room.building} <br /> {room.floor}
                <br />
                {room.time}
              </p>

              <button
                onClick={() => handleSelectRoom(room)}
                className="btn btn-primary"
                style={{
                  backgroundColor: "#4C6275",
                  width: "150px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                }}
              >
                เลือก
              </button>
              <button
                onClick={() => handleDetailRoom(room)}
                className="btn btn-secondary"
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#DAEEF7",
                  color: "black",
                }}
              >
                ข้อมูลห้อง
              </button>
            </div>
          </div>
        </div>
      ) : null
    )
  ) : (
    <p>
      {filteredRooms.message}
      <br></br>
      {filteredRooms.suggestion}
    </p>
  )}
</div>





    </div>
  );
}

export default Home;
