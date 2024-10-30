import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import Select from 'react-select';
import SeachIcon from '../pic/search.png';

function Home() {

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]); // Store all rooms separately
  const [searchTerm, setSearchTerm] = useState(""); // State สำหรับการค้นหาด้วยชื่อห้อง

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [roomOptions, setroomOptions] = useState([]);
  const [typeOptions, settypeOptions] = useState([]);

  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fetchRooms = async () => {
    try {
      console.log('fetchRooms called');

      const response = await axios.get('http://localhost:5020/home'); // URL ของ API
      console.log(response.data); // แสดงข้อมูลที่ได้รับจาก API
      
      //building opt
      const buildings = Array.from(new Set(response.data.map(building => building.building)))
      .map(buildingName => {
        const buildingObj = response.data.find(building => building.building === buildingName);
        return { value: buildingObj.id, label: buildingName };
      });

      //floor opt
      const floors = Array.from(new Set(response.data.map(floor => floor.floor)))
      .map(floorsName => {
        const floorsObj = response.data.find(floors => floors.floor === floorsName);
        return { value: floorsObj.id, label: floorsName };
      });
      //rooms opt
      const rooms = Array.from(new Set(response.data.map(room => room.name)))
      .map(roomsName => {
        const roomsObj = response.data.find(rooms => rooms.name === roomsName);
        return { value: roomsObj.id, label: roomsName };
      });
      const types = Array.from(new Set(response.data.map(type => type.type_name)))
      .map(typesName => {
        const typeObj = response.data.find(type => type.type_name === typesName);
        return { value: typeObj.room_type_id, label: typesName };
      });
      setBuildingOptions(buildings);
      setFloorOptions(floors);
      setroomOptions(rooms);
      settypeOptions(types);
      setAllRooms(response.data);
      setFilteredRooms(response.data);
   
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };
  useEffect(() => {
    fetchRooms()
  }, []);

  useEffect(() => {
    let filtered = allRooms;
    if (searchTerm !== "") {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.id.toString().includes(searchTerm.toLowerCase()) ||
        (room.description && room.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedBuilding) {
      filtered = filtered.filter(room => room.building === selectedBuilding.label);
    }

    if (selectedFloor) {
      filtered = filtered.filter(room => room.floor === selectedFloor.label);
    }

    if (selectedRoom) {
      filtered = filtered.filter(room => room.name === selectedRoom.label);
    }

    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(room => room.type_name === selectedType.label);
    }

    if (selectedPeople) {
      const [minPeople, maxPeople] = selectedPeople.value;
      filtered = filtered.filter(room => room.cap >= minPeople && room.cap <= maxPeople);
    }

    setFilteredRooms(filtered);
  }, [searchTerm, allRooms, selectedBuilding, selectedFloor, selectedRoom, selectedType, selectedPeople]);

  const navigate = useNavigate();

  const handleSelectRoom = (room) => {
    if (!selectedDate && !selectedTime && !selectedTime2 ) {
      setModalMessage('กรุณาเลือกวันที่และเวลาเริ่มต้นและเวลาสิ้นสุด');
      setShowModal(true);
    } else if (!selectedDate) {
      setModalMessage('กรุณาเลือกวันที่');
      setShowModal(true);
    } else if (!selectedTime || !selectedTime2) {
      setModalMessage('กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุด');
      setShowModal(true);
    } else {
      navigate('/ยืนยัน', {
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
      navigate('/Detail', {
        state: {
          roomData: room,
          roompic: room.room_pic,
        },
      });
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedBuilding(null);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setSelectedTime(null);
    setSelectedTime2(null);
    setSelectedType('all');
    setSelectedPeople(null);
    setSelectedDate('');
    setFilteredRooms(allRooms);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '5px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#aaa',
      },
      backgroundImage: `url(${SeachIcon})`,
      backgroundSize: '20px',
      backgroundPosition: '10px center',
      backgroundRepeat: 'no-repeat',
      paddingLeft: '40px',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'black',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#666',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const timeOptions = [
    { value: '6.00', label: '6.00' },
    { value: '7.00', label: '7.00' },
    { value: '8.00', label: '8.00' },
    { value: '9.00', label: '9.00' },
    { value: '10.00', label: '10.00' },
    { value: '11.00', label: '11.00' },
    { value: '12.00', label: '12.00' },
    { value: '13.00', label: '13.00' },
    { value: '14.00', label: '14.00' },
    { value: '15.00', label: '15.00' },
    { value: '16.00', label: '16.00' },
    { value: '17.00', label: '17.00' },
    { value: '18.00', label: '18.00' },
  ];

  const peopleOptions = [
    { value: [3, 5], label: '3-5 คน' },
    { value: [5, 10], label: '5-10 คน' },
    { value: [10, 20], label: '10-20 คน' },
    { value: [20, 30], label: '20-30 คน' },
    { value: [30, 50], label: '30-50 คน' },
  ];

  return (
    <div className="container">
      {/* Search bar on top */}
      <div className="row mb-3" style={{ marginTop: '20px' }}>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="ค้นหาด้วยชื่อห้อง รหัสห้อง หรือรายละเอียด"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredRooms.length === 0 && searchTerm && (
            <p className="text-danger mt-2">ไม่พบห้องที่ต้องการ</p>
          )}
        </div>
      </div>

      {/* Search bar form */}
      <div className="row mb-3" style={{ marginTop: '20px' }}>
        <div className="col-md-12">
          <form className="flex-wrap">
            <div className="row">
              <div className="col-md-3 mb-2">
                <Select styles={customStyles}
                  options={buildingOptions}
                  value={selectedBuilding}
                  onChange={setSelectedBuilding}
                  placeholder="ค้นหาตึก..."
                  isSearchable={true}
                />
              </div>
              <div className="col-md-3 mb-2">
                <Select styles={customStyles}
                  options={floorOptions}
                  value={selectedFloor}
                  onChange={setSelectedFloor}
                  placeholder="ค้นหาชั้น..."
                  isSearchable={true}
                />
              </div>
              <div className="col-md-3 mb-2">
                <Select styles={customStyles}
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
                  placeholder="ค้นหาประเภทห้อง..."
                />
              </div>
              <div className="col-md-3 mb-2">
                <label>เลือกจำนวนคน</label>
                <Select
                  options={peopleOptions}
                  value={selectedPeople}
                  onChange={setSelectedPeople}
                  placeholder="เลือกจำนวนคน..."
                  isSearchable={true}
                />
              </div>
              <div className="col-md-3 mb-2">
                <label>เลือกวัน</label>
                <input
                  className="form-control"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
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
          </form>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <button onClick={handleReset} className="btn btn-warning">รีเซ็ตค่า</button>
        </div>
      </div>

      {/* Display Rooms */}
      <div className="row" style={{ padding: '10px' }}>
      {filteredRooms && filteredRooms.length > 0 ? (  // ตรวจสอบให้แน่ใจว่า filteredRooms ไม่เป็น null และมี length
          filteredRooms.map((room, index) => (
            room ? (
              <div className="col-md-4 col-sm-6 mb-4" key={index}>
                <div className="card shadow" style={{ width: '18rem', height: '22rem', borderRadius: '15px', border: '1px solid #ddd', backgroundColor: '#A4C6CC' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={room.room_pic} className="card-img-top" alt="room.room_pic"    
                    style={{ width: '18rem', height: '10rem', objectFit: 'cover' }} 
 />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        backgroundColor: room.type_name === 'VIP Room' ? 'rgba(255, 215, 0, 0.8)' : '#72B676',
                        color: 'black',
                        padding: '5px',
                        borderRadius: '5px',
                      }}
                    >
                      {room.type_name}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#EED1A2',
                        color: 'black',
                        padding: '5px',
                        borderRadius: '5px',
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

                    <button onClick={() => handleSelectRoom(room)} className="btn btn-primary" style={{ backgroundColor: '#4C6275', width: '150px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>
                      เลือก
                    </button>
                    <button onClick={() => handleDetailRoom(room)} className="btn btn-secondary" style={{ marginLeft: '10px', backgroundColor: '#DAEEF7', color: 'black' }}>
                      ข้อมูลห้อง
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          ))
        ) : (
          <p className="text-danger mt-2">ไม่พบห้องที่ต้องการ</p>
        )}
      </div>
    </div>
  );
}

export default Home;
