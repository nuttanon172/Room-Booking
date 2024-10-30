import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import room1 from '../pic/Qrcode1.png';

function QRCodeScanner() {
  const [isScanned, setIsScanned] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const handleScan = () => {
    setIsScanned(true);
    setCountdown(60);
  };

  const handleClose = () => {
    setIsScanned(false);
    setCountdown(60);
  };

  // Countdown effect
  useEffect(() => {
    if (countdown === 0) return; // Stop if countdown reaches zero

    const interval = setInterval(() => {
      setCountdown(prev => prev - 1); // Decrease countdown
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [countdown]);

  // Format countdown time as mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      {/* Header */}
      <h1 className="mb-50">Scan Here !!!!!!!</h1>
      
      {/* QR Code Section */}
      <div className="position-relative">
        <img 
          src={room1}
          alt="QR Code" 
          className="img-fluid" 
          style={{ width: '600px', height: '600px', cursor: 'pointer' }} 
          onClick={handleScan}  // Change state on QR Code click
        />
        
        {/* Success message when scanned */}
        {isScanned && (
          <div 
            className="position-absolute d-flex align-items-center justify-content-center p-3"
            style={{
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#4CAF50',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 'bold',
              width: '350px', 
              height: '80px',
              zIndex: 2,
              fontSize: '24px',
              position: 'relative' 
            }}
          >
            <span>Successful!!!</span>

            {/* Close button */}
            <button 
              className="btn" 
              style={{
                position: 'absolute', 
                top: '5px', 
                right: '5px', 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: '#fff',
                fontSize: '20px', 
                cursor: 'pointer'
              }}
              onClick={handleClose}  // Hide message on click
            >
              &times;
            </button>
          </div>
        )}
      </div>
      
      {/* Countdown Timer */}
      <div className="mt-3 p-2 bg-light rounded">
        <h4 style={{ fontSize: '100px' }}>{formatTime(countdown)}</h4>  {/* Display formatted time */}
      </div>
    </div>
  );
}

export default QRCodeScanner;
