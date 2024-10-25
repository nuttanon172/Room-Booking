import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS
import room1 from '../pic/room1.jpg';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal and button components

// Sample booking data
const bookings = [
  {
    roomName: 'Banana room',
    roomCode: '001',
    bookingDate: '15/9/2567',
    time: '12.00-14.00 น.',
    type: 'VIP',
    image: room1,
  },
  {
    roomName: 'Banana room',
    roomCode: '002',
    bookingDate: '12/9/2567',
    time: '12.00-14.00 น.',
    type: 'VIP',
    image: room1,
  },
  {
    roomName: 'Banana room',
    roomCode: '003',
    bookingDate: '10/9/2567',
    time: '12.00-14.00 น.',
    type: 'VIP',
    image: room1,  
  },
];

// Card component for each booking
const BookingCard = ({ booking, handleShowModal }) => {
  return (
    <div
      className="card mb-3 p-3 shadow-sm"
      style={{
        backgroundColor: '#e7f3ff', // Light blue background matching the image
        borderRadius: '15px',
        border: '1px solid #d0e0ff', // Soft blue border
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
      }}
    >
      <div className="row no-gutters align-items-center">
        {/* Column for image */}
        <div className="col-md-2 text-center">
          <img
            src={booking.image}
            className="rounded-circle img-fluid mb-2"
            alt="Room"
            style={{ width: '80px', height: '80px' }}
          />
          {/* VIP label beneath image */}
          <span
            className="badge badge-light"
            style={{
              display: 'block',
              margin: '0 auto',
              backgroundColor: 'transparent',
              color: '#000', // Black color for "VIP" text
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            {booking.type}
          </span>
        </div>

        {/* Column for room details */}
        <div className="col-md-7">
          <div
            className="card-body"
            style={{
              backgroundColor: '#e7f3ff', // Same background color as the card
              borderRadius: '15px',
              padding: '10px',
              border: 'none',
            }}
          >
            <h5 className="card-title">ชื่อ: {booking.roomName}</h5>
            <p className="card-text mb-1">รหัส: {booking.roomCode}</p>
            <p className="card-text mb-1">จองเมื่อ: {booking.bookingDate}</p>
            <p className="card-text mb-1">เวลา: {booking.time}</p>
          </div>
        </div>

        {/* Column for button */}
        <div className="col-md-3 d-flex justify-content-center">
          <button
            className="btn"
            style={{
              backgroundColor: '#38384F', // Dark navy blue color for button
              color: 'white', // White text
              borderRadius: '15px',
              padding: '10px 20px',
              width: '500px',
            }}
            onClick={handleShowModal} // Open modal on button click
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
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleShowModal = () => setShowModal(true);
  
  // Function to close the modal
  const handleCloseModal = () => setShowModal(false);

  // Function to handle confirmation
  const handleConfirm = () => {
    setShowModal(false);
    alert('Booking confirmed!');
  };

  return (
    <div
      className="card shadow-lg p-4"
      style={{
        borderRadius: '15px',
        border: '2px solid #1e90ff', // Blue border for the container
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      {/* Updated "ประวัติการจอง" Title */}
      <h2
        className="text-left mb-4" // Align text to the left
        style={{
          padding: '10px 20px', // Padding to match the rounded style
          color: '#000000', // Bold black text
          fontWeight: 'bold', // Ensures the text is bold
          borderRadius: '30px', // Rounded corners to match the design
          backgroundColor: '#ffffff', // White background for the title box
          width: 'fit-content', // Adjusts the width to fit the content
          border: 'none', // No border around the text
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adds subtle shadow to the header
          marginLeft: '0', // Aligns the title to the left side of the container
        }}
      >
        ประวัติการจอง
      </h2>

      {/* Loop through bookings */}
      {bookings.map((booking, index) => (
        <BookingCard key={index} booking={booking} handleShowModal={handleShowModal} />
      ))}

      {/* Modal for confirmation */}
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
