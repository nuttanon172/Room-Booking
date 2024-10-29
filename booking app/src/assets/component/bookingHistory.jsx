import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS
import room1 from '../pic/room1.jpg';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal and button components
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Card component for each booking
const BookingCard = ({ booking, handleShowModal }) => {
  return (
    <div
      className="card mb-3 p-3 shadow-sm"
      style={{
        backgroundColor: '#e7f3ff',
        borderRadius: '15px',
        border: '1px solid #d0e0ff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="row no-gutters align-items-center">
        <div className="col-md-2 text-center">
          <img
            src={booking.image}
            className="rounded-circle img-fluid mb-2"
            alt="Room"
            style={{ width: '80px', height: '80px' }}
          />
          <span
            className="badge badge-light"
            style={{
              display: 'block',
              margin: '0 auto',
              backgroundColor: 'transparent',
              color: '#000',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            {booking.type}
          </span>
        </div>

        <div className="col-md-7">
          <div
            className="card-body"
            style={{
              backgroundColor: '#e7f3ff',
              borderRadius: '15px',
              padding: '10px',
              border: 'none',
            }}
          >
            <h5 className="card-title">ชื่อ: {booking.roomDetails.name}</h5>
            <p className="card-text mb-1">รหัส: {booking.room_id}</p>
            <p className="card-text mb-1">จองเมื่อ: {booking.booking_date}</p>
            <p className="card-text mb-1">เวลา: {booking.start_time}</p>
          </div>
        </div>

        <div className="col-md-3 d-flex justify-content-center">
          <button
            className="btn"
            style={{
              backgroundColor: '#38384F',
              color: 'white',
              borderRadius: '15px',
              padding: '10px 20px',
              width: '150px',
            }}
            onClick={handleShowModal}
          >
            จองอีกครั้ง
          </button>
        </div>
      </div>
    </div>
  );
};

// Component to display booking history
const BookingHistory = () => {
  const [bookings, setBookings] = useState([]); // Initialize bookings state here
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const [bookingsResponse, roomsResponse] = await Promise.all([
          axios.get('http://localhost:5020/historyBooking', {
            headers: { "Authorization": `Bearer ${token}` },
          }),
          axios.get('http://localhost:5020/rooms', {
            headers: { "Authorization": `Bearer ${token}` },
          }),
        ]);

        const roomsData = roomsResponse.data;
        setRooms(roomsData);

        const enrichedBookings = bookingsResponse.data.map((booking) => {
          const roomDetails = roomsData.find(room => room.id === booking.room_id);
          return { ...booking, roomDetails };
        });

        setBookings(enrichedBookings);
        console.log(enrichedBookings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const navigate = useNavigate();
  const handleConfirm = () => {
      setShowModal(false);
      navigate('/home'); // Redirects to the home page
  };

  return (
    <div
      className="card shadow-lg p-4"
      style={{
        borderRadius: '15px',
        border: '2px solid #1e90ff',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h2
        className="text-left mb-4"
        style={{
          padding: '10px 20px',
          color: '#000000',
          fontWeight: 'bold',
          borderRadius: '30px',
          backgroundColor: '#ffffff',
          width: 'fit-content',
          border: 'none',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          marginLeft: '0',
        }}
      >
        ประวัติการจอง
      </h2>

      {bookings.map((booking, index) => (
        <BookingCard key={index} booking={booking} handleShowModal={handleShowModal} />
      ))}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการจอง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ยืนยันการจองอีกครั้งหรือไม่?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingHistory;
