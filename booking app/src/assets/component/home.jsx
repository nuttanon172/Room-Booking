import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import room1 from '../pic/room1.jpg';
import Select from 'react-select';
import SeachIcon from '../pic/search.png';

function Home() {
  const [Room, setRoom] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State สำหรับการค้นหาด้วยชื่อห้อง

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5020/home'); // URL ของ API
        console.log(response.data); // แสดงข้อมูลที่ได้รับจาก API
        setRoom(response.data);
        setFilteredRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSelectRoom = (room) => {
    if (!selectedDate && !selectedTime && !selectedTime2) {
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
          selectedTime: selectedTime ? selectedTime.value : null,
          selectedTime2: selectedTime2 ? selectedTime2.value : null,
          selectedDate: selectedDate,
          roompic: room1,
        },
      });
    }
  };

  const handleDetailRoom = (room) => {
    navigate('/Detail', {
      state: {
        roomData: room,
        roompic: room1,
      },
    });
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

  const buildingOptions = [
    { value: 'MII', label: 'MII' },
    { value: 'MIIX', label: 'MIIX' },
    { value: 'D', label: 'D' },
    { value: 'F', label: 'F' },
  ];

  const roomOptions = [
    { value: '202', label: '202' },
    { value: '302', label: '302' },
    { value: '402', label: '402' },
    { value: '502', label: '502' },
  ];
  
  const FloorOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];

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

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = Room.filter((room) => {
      const roomStartTime = parseFloat(room.time.split('-')[0]);
      const roomEndTime = parseFloat(room.time.split('-')[1]);

      return (
        (!selectedBuilding || room.building === selectedBuilding.value) &&
        (!selectedFloor || room.floor === selectedFloor.value) &&
        (!selectedRoom || room.room === selectedRoom.value) &&
        (selectedType === 'all' || room.type === selectedType) &&
        (!selectedPeople || room.Cap >= parseInt(selectedPeople)) &&
        (!selectedTime || roomStartTime <= parseFloat(selectedTime.value) && roomEndTime >= parseFloat(selectedTime.value)) &&
        (!selectedTime2 || roomStartTime <= parseFloat(selectedTime2.value) && roomEndTime >= parseFloat(selectedTime2.value)) &&
        (room.name.toLowerCase().includes(searchTerm.toLowerCase())) // กรองตามชื่อห้อง
      );
    });
    setFilteredRooms(filtered);
  };

  const resetFilters = () => {
    setSelectedBuilding(null);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setSelectedType('all');
    setSelectedPeople('');
    setSelectedDate('');
    setSelectedTime(null);
    setSelectedTime2(null);
    setSearchTerm(''); // รีเซ็ตการค้นหาชื่อห้อง
    setFilteredRooms(Room);
  };

  return (
    <div className="container">
      {/* Search bar on top */}
      <div className="row mb-3" style={{ marginTop: '20px' }}>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="ค้นหาด้วยชื่อห้อง"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Search form */}
      <div className="row mb-3">
        <div className="col-md-12">
          <form className="flex-wrap" onSubmit={handleSearch}>
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
                  options={FloorOptions}
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
                <select
                  className="form-control"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">ประเภทห้อง: ทั้งหมด</option>
                  <option value="Normal">Normal</option>
                  <option value="VIP">VIP</option>
                </select>
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
      <div className="row" style={{ padding: '10px' }}>
        {filteredRooms.map((room, index) => (
          <div className="col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card shadow " style={{ width: '18rem', height: '22rem', borderRadius: '15px', border: '1px solid #ddd', backgroundColor: '#A4C6CC' }}>
              <div style={{ position: 'relative' }}>
                <img src={room1} className="card-img-top" alt="room1" />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    backgroundColor: room.type === 'VIP' ? 'rgba(255, 215, 0, 0.8)' : '#72B676',
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
                  {room.building} {room.room}
                  <br />
                  {room.time}
                </p>

                <button onClick={() => handleSelectRoom(room)} key={index} className="btn btn-primary" style={{ backgroundColor: '#4C6275', width: '150px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}>เลือก</button>
                <button onClick={() => handleDetailRoom(room)} key={index} className="btn btn-secondary" style={{ marginLeft: '10px', backgroundColor: '#DAEEF7', color: 'black' }}>
                  ข้อมูลห้อง
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for alerts */}
      <div className="modal fade show" tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">แจ้งเตือน</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>ตกลง</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
