import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import Select from 'react-select';
import SeachIcon from '../pic/search.png';

function Home() {

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const navigate = useNavigate();

  // const fetchRooms = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5020/home');
      
  //     const buildings = Array.from(new Set(response.data.map(building => building.building)))
  //       .map(buildingName => {
  //         const buildingObj = response.data.find(building => building.building === buildingName);
  //         return { value: buildingObj.id, label: buildingName };
  //       });

  //     const floors = Array.from(new Set(response.data.map(floor => floor.floor)))
  //       .map(floorsName => {
  //         const floorsObj = response.data.find(floors => floors.floor === floorsName);
  //         return { value: floorsObj.id, label: floorsName };
  //       });

  //     const rooms = Array.from(new Set(response.data.map(room => room.name)))
  //       .map(roomsName => {
  //         const roomsObj = response.data.find(rooms => rooms.name === roomsName);
  //         return { value: roomsObj.id, label: roomsName };
  //       });

  //     const types = Array.from(new Set(response.data.map(type => type.type_name)))
  //       .map(typesName => {
  //         const typeObj = response.data.find(type => type.type_name === typesName);
  //         return { value: typeObj.room_type_id, label: typesName };
  //       });

  //     setBuildingOptions(buildings);
  //     setFloorOptions(floors);
  //     setroomOptions(rooms);
  //     settypeOptions(types);
  //     setAllRooms(response.data);
  //     setFilteredRooms(response.data);

  //   } catch (error) {
  //     console.error('Error fetching rooms:', error);
  //   }
  // };

  useEffect(() => {
    fetchRooms();
  }, []);

  // const fetchFilteredRooms = async (event) => {
  //   event.preventDefault();
  //   let check = 1;

  //   const now = new Date();
  //   const selectedDateTime = new Date(`${selectedDate}T${selectedTime?.value || "00:00"}`);

  //   if (!selectedDate && !selectedTime && !selectedTime2) {
  //     setModalMessage('กรุณาเลือกวันที่และเวลาเริ่มต้นและเวลาสิ้นสุด');
  //     setShowModal(true);
  //     return;
  //   } else if (!selectedDate) {
  //     setModalMessage('กรุณาเลือกวันที่');
  //     setShowModal(true);
  //     return;
  //   } else if (!selectedTime || !selectedTime2) {
  //     setModalMessage('กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุด');
  //     setShowModal(true);
  //     return;
  //   } else if (selectedDateTime < now) {
  //     setModalMessage('ไม่สามารถจองวันที่หรือเวลาที่ผ่านมาแล้วได้');
  //     setShowModal(true);
  //     return;
  //   }

  //   if (selectedTime && selectedTime2) {
  //     if (parseFloat(selectedTime.value) >= parseFloat(selectedTime2.value)) {
  //       setModalMessage('เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด');
  //       setShowModal(true);
  //       check = 0;
  //     }
  //   }

  //   if (check) {
  //     const queryParams = new URLSearchParams({
  //       building: selectedBuilding ? selectedBuilding.label : '',
  //       floor: selectedFloor ? selectedFloor.label : '',
  //       room: selectedRoom ? selectedRoom.label : '',
  //       type: selectedType !== 'all' ? selectedType.label : '',
  //       people: selectedPeople ? selectedPeople.value : '',
  //       date: selectedDate ? selectedDate : '',
  //       time: selectedTime ? selectedTime.value : '',
  //       time2: selectedTime2 ? selectedTime2.value : '',
  //     });

  //     const response = await fetch(`http://localhost:5020/home?${queryParams}`);
  //     if (!response.ok) {
  //       console.error("HTTP error:", response.status);
  //       return;
  //     }

  //     const data = await response.json();
  //     setFilteredRooms(data);
  //   }
  // };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBuilding(null);
    setSelectedFloor(null);
    setSelectedRoom(null);
    setSelectedType('all');
    setSelectedPeople(null);
    setSelectedDate('');
    setSelectedTime(null);
    setSelectedTime2(null);
    fetchRooms();
  };

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
          roompic: room.room_pic,
        },
      });
    }
  };

  const timeOptions = [
    { value: '6.00', label: '6.00' }, { value: '7.00', label: '7.00' },
    { value: '8.00', label: '8.00' }, { value: '9.00', label: '9.00' },
    { value: '10.00', label: '10.00' }, { value: '11.00', label: '11.00' },
    { value: '12.00', label: '12.00' }, { value: '13.00', label: '13.00' },
    { value: '14.00', label: '14.00' }, { value: '15.00', label: '15.00' },
    { value: '16.00', label: '16.00' }, { value: '17.00', label: '17.00' },
    { value: '18.00', label: '18.00' },
  ];

  const peopleOptions = [
    { value: [3, 5], label: '3-5 คน' }, { value: [5, 10], label: '5-10 คน' },
    { value: [10, 20], label: '10-20 คน' }, { value: [20, 30], label: '20-30 คน' },
    { value: [30, 50], label: '30-50 คน' }, { value: [50, 100], label: '50-100 คน' },
    { value: [100, 200], label: '100-200 คน' }, { value: [200, 9999], label: '200 คนขึ้นไป' },
  ];

  // const currentHour = new Date().getHours();
  // const availableStartTimes = timeOptions.filter(option => parseFloat(option.value) > currentHour);

  // กรองเวลาสิ้นสุดให้มากกว่าเวลาเริ่มต้น 1 ชั่วโมง
  // const availableEndTimes = selectedTime
  //   ? timeOptions.filter(option => parseFloat(option.value) > parseFloat(selectedTime.value))
  //   : [];

  // const handleStartTimeChange = (selectedOption) => {
  //   setSelectedTime(selectedOption);
  //   setSelectedTime2(null); // รีเซ็ตเวลาสิ้นสุดเมื่อเลือกเวลาเริ่มต้นใหม่
  // };

  // const fetchRooms = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5020/home');
  //     // การตั้งค่า buildingOptions, floorOptions, roomOptions, typeOptions
  //     setAllRooms(response.data);
  //     setFilteredRooms(response.data);
  //   } catch (error) {
  //     console.error('Error fetching rooms:', error);
  //   }
  // };

  useEffect(() => {
    fetchRooms();
  }, []);

  // const fetchFilteredRooms = async (event) => {
  //   event.preventDefault();
  //   const now = new Date();
  //   const selectedDateTime = new Date(`${selectedDate}T${selectedTime?.value || "00:00"}`);

  //   if (!selectedDate || !selectedTime || !selectedTime2) {
  //     setModalMessage('กรุณาเลือกวันที่และเวลาเริ่มต้นและเวลาสิ้นสุด');
  //     setShowModal(true);
  //     return;
  //   } else if (selectedDateTime < now) {
  //     setModalMessage('ไม่สามารถจองวันที่หรือเวลาที่ผ่านมาแล้วได้');
  //     setShowModal(true);
  //     return;
  //   } else if (parseFloat(selectedTime.value) >= parseFloat(selectedTime2.value)) {
  //     setModalMessage('เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด');
  //     setShowModal(true);
  //     return;
  //   }

  //   const queryParams = new URLSearchParams({
  //     building: selectedBuilding ? selectedBuilding.label : '',
  //     floor: selectedFloor ? selectedFloor.label : '',
  //     room: selectedRoom ? selectedRoom.label : '',
  //     type: selectedType !== 'all' ? selectedType.label : '',
  //     people: selectedPeople ? selectedPeople.value : '',
  //     date: selectedDate,
  //     time: selectedTime.value,
  //     time2: selectedTime2.value,
  //   });

  //   const response = await fetch(`http://localhost:5020/home?${queryParams}`);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setFilteredRooms(data);
  //   }
  // };

  // const availableStartTimes = selectedDate === new Date().toISOString().split("T")[0]
  // ? timeOptions.filter(option => parseFloat(option.value) > currentHour)
  // : timeOptions;


    // เวลาปัจจุบันในหน่วยชั่วโมง
    const currentHour = new Date().getHours();

    // กรองเวลาเริ่มต้น โดยเช็คว่าเป็นวันที่ปัจจุบันหรือไม่
    const availableStartTimes = selectedDate === new Date().toISOString().split("T")[0]
      ? timeOptions.filter(option => parseFloat(option.value) > currentHour)
      : timeOptions;
  
    // กรองเวลาสิ้นสุดให้มากกว่าเวลาเริ่มต้น 1 ชั่วโมง
    const availableEndTimes = selectedTime
      ? timeOptions.filter(option => parseFloat(option.value) > parseFloat(selectedTime.value))
      : [];
  
    const handleStartTimeChange = (selectedOption) => {
      setSelectedTime(selectedOption);
      setSelectedTime2(null); // รีเซ็ตเวลาสิ้นสุดเมื่อเลือกเวลาเริ่มต้นใหม่
    };
  
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5020/home');
        setAllRooms(response.data);
        setFilteredRooms(response.data);

        const buildings = Array.from(new Set(response.data.map(building => building.building)))
        .map(buildingName => {
          const buildingObj = response.data.find(building => building.building === buildingName);
          return { value: buildingObj.id, label: buildingName };
        });

      const floors = Array.from(new Set(response.data.map(floor => floor.floor)))
        .map(floorsName => {
          const floorsObj = response.data.find(floors => floors.floor === floorsName);
          return { value: floorsObj.id, label: floorsName };
        });

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
      fetchRooms();
    }, []);
  
    const fetchFilteredRooms = async (event) => {
      event.preventDefault();
      const now = new Date();
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime?.value || "00:00"}`);
  
      if (!selectedDate || !selectedTime || !selectedTime2) {
        setModalMessage('กรุณาเลือกวันที่และเวลาเริ่มต้นและเวลาสิ้นสุด');
        setShowModal(true);
        return;
      } else if (selectedDateTime < now) {
        setModalMessage('ไม่สามารถจองวันที่หรือเวลาที่ผ่านมาแล้วได้');
        setShowModal(true);
        return;
      } else if (parseFloat(selectedTime.value) >= parseFloat(selectedTime2.value)) {
        setModalMessage('เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด');
        setShowModal(true);
        return;
      }
  
      const queryParams = new URLSearchParams({
        building: selectedBuilding ? selectedBuilding.label : '',
        floor: selectedFloor ? selectedFloor.label : '',
        room: selectedRoom ? selectedRoom.label : '',
        type: selectedType !== 'all' ? selectedType.label : '',
        people: selectedPeople ? selectedPeople.value : '',
        date: selectedDate,
        time: selectedTime.value,
        time2: selectedTime2.value,
      });
  
      const response = await fetch(`http://localhost:5020/home?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredRooms(data);
      }
    };


  //   const [filteredRooms, setFilteredRooms] = useState([]);
  // const [allRooms, setAllRooms] = useState([]); // Store all rooms separately
  // const [searchTerm, setSearchTerm] = useState(""); // State สำหรับการค้นหาด้วยชื่อห้อง

  // const [buildingOptions, setBuildingOptions] = useState([]);
  // const [floorOptions, setFloorOptions] = useState([]);
  // const [roomOptions, setroomOptions] = useState([]);
  // const [typeOptions, settypeOptions] = useState([]);

  // const [selectedBuilding, setSelectedBuilding] = useState(null);
  // const [selectedFloor, setSelectedFloor] = useState(null);
  // const [selectedRoom, setSelectedRoom] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);
  // const [selectedTime2, setSelectedTime2] = useState(null);
  // const [selectedType, setSelectedType] = useState('all');
  // const [selectedPeople, setSelectedPeople] = useState(null);
  // const [selectedDate, setSelectedDate] = useState('');
  // const [showModal, setShowModal] = useState(false);
  // const [modalMessage, setModalMessage] = useState('');

  // const fetchRooms = async () => {
  //   try {
  //     console.log('fetchRooms called');

  //     const response = await axios.get('http://localhost:5020/home'); // URL ของ API
  //     console.log(response.data); // แสดงข้อมูลที่ได้รับจาก API
      
  //     //building opt
  //     const buildings = Array.from(new Set(response.data.map(building => building.building)))
  //     .map(buildingName => {
  //       const buildingObj = response.data.find(building => building.building === buildingName);
  //       return { value: buildingObj.id, label: buildingName };
  //     });

  //     //floor opt
  //     const floors = Array.from(new Set(response.data.map(floor => floor.floor)))
  //     .map(floorsName => {
  //       const floorsObj = response.data.find(floors => floors.floor === floorsName);
  //       return { value: floorsObj.id, label: floorsName };
  //     });
  //     //rooms opt
  //     const rooms = Array.from(new Set(response.data.map(room => room.name)))
  //     .map(roomsName => {
  //       const roomsObj = response.data.find(rooms => rooms.name === roomsName);
  //       return { value: roomsObj.id, label: roomsName };
  //     });
  //     const types = Array.from(new Set(response.data.map(type => type.type_name)))
  //     .map(typesName => {
  //       const typeObj = response.data.find(type => type.type_name === typesName);
  //       return { value: typeObj.room_type_id, label: typesName };
  //     });
  //     setBuildingOptions(buildings);
  //     setFloorOptions(floors);
  //     setroomOptions(rooms);
  //     settypeOptions(types);
  //     setAllRooms(response.data);
  //     setFilteredRooms(response.data);
   
  //   } catch (error) {
  //     console.error('Error fetching rooms:', error);
  //   }
  // };
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

  // const navigate = useNavigate();

  // const handleSelectRoom = (room) => {
  //   if (!selectedDate && !selectedTime && !selectedTime2 ) {
  //     setModalMessage('กรุณาเลือกวันที่และเวลาเริ่มต้นและเวลาสิ้นสุด');
  //     setShowModal(true);
  //   } else if (!selectedDate) {
  //     setModalMessage('กรุณาเลือกวันที่');
  //     setShowModal(true);
  //   } else if (!selectedTime || !selectedTime2) {
  //     setModalMessage('กรุณาเลือกเวลาเริ่มต้นและเวลาสิ้นสุด');
  //     setShowModal(true);
  //   } else {
  //     navigate('/ยืนยัน', {
  //       state: {
  //         roomData: room,
  //         selectedTime: selectedTime ? selectedTime.value : null, // pass start time
  //         selectedTime2: selectedTime2 ? selectedTime2.value : null, // pass end time
  //         selectedDate: selectedDate, // pass selected date
  //         roompic: room.room_pic,
  //       },
  //     });
  //   }
  // };

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

  // const timeOptions = [
  //   { value: '6.00', label: '6.00' },
  //   { value: '7.00', label: '7.00' },
  //   { value: '8.00', label: '8.00' },
  //   { value: '9.00', label: '9.00' },
  //   { value: '10.00', label: '10.00' },
  //   { value: '11.00', label: '11.00' },
  //   { value: '12.00', label: '12.00' },
  //   { value: '13.00', label: '13.00' },
  //   { value: '14.00', label: '14.00' },
  //   { value: '15.00', label: '15.00' },
  //   { value: '16.00', label: '16.00' },
  //   { value: '17.00', label: '17.00' },
  //   { value: '18.00', label: '18.00' },
  // ];

  // const peopleOptions = [
  //   { value: [3, 5], label: '3-5 คน' },
  //   { value: [5, 10], label: '5-10 คน' },
  //   { value: [10, 20], label: '10-20 คน' },
  //   { value: [20, 30], label: '20-30 คน' },
  //   { value: [30, 50], label: '30-50 คน' },
  //   { value: [50, 100], label: '50-100 คน' },
  //   { value: [100, 200], label: '100-200 คน' },
  //   { value: [200, 9999], label: '200 คนขึ้นไป' },
  // ];

  return (
    <div className="container">
      <div className="row mb-3" style={{ marginTop: '20px' }}>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="ค้นหาด้วยชื่อห้อง รหัสห้อง หรือรายละเอียด"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-2">
          <Select
            options={peopleOptions}
            value={selectedPeople}
            onChange={setSelectedPeople}
            placeholder="เลือกจำนวนคน..."
            isSearchable={true}
          />
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <button onClick={resetFilters} className="btn btn-success" style={{ boxShadow: '0 0 0.2rem rgba(0, 0, 0, 0.5)' }}>รีเซ็ตค่า</button>
        </div>
      </div>

      <div className="row mb-3 p-3" style={{ marginTop: '20px', borderRadius: '10px', backgroundColor: '#E8F4F8' }}>
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
              <input
                className="form-control"
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                aria-label="เลือกวันที่"
              />
            </div>
            <div className="col-md-3 mb-2">
        <Select
          options={availableStartTimes}
          value={selectedTime}
          onChange={handleStartTimeChange}
          placeholder="เลือกเวลาเริ่มต้น"
          isSearchable={true}
        />
      </div>
      <div className="col-md-3 mb-2">
        <Select
          options={availableEndTimes}
          value={selectedTime2}
          onChange={setSelectedTime2}
          placeholder="เลือกเวลาสิ้นสุด"
          isSearchable={true}
          
        />
      </div>
            <div className="col-md-3 mb-2">
              <button onClick={fetchFilteredRooms} className="btn btn-primary" style={{ boxShadow: '0 0 0.2rem rgba(0, 0, 0, 0.5)' }}>
                ค้นหา
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Display Rooms */}
      <div className="row" style={{ padding: '10px' }}>
      {filteredRooms && filteredRooms.length > 0 ? (  // ตรวจสอบให้แน่ใจ filteredRooms ไม่เป็น null และมี length
          filteredRooms.map((room, index) => (
            room ? (
              <div className="col-md-3 col-sm-6 mb-4" key={index}>
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

      {/* Modal for showing error message */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ข้อผิดพลาด</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>ปิด</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
