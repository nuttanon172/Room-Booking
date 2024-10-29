import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import room1 from '../pic/Qrcode1.png';

function QRCodeScanner() {
  const [isScanned, setIsScanned] = useState(false);

  const handleScan = () => {
    setIsScanned(true);
  };

  const handleClose = () => {
    setIsScanned(false);  // เมื่อคลิกปุ่มกากบาท จะซ่อนปุ่ม 'Successful'
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      {/* หัวข้อด้านบน */}
      <h1 className="mb-50">Scan Here !!!!!!!</h1>
      
      {/* ส่วนของ QR Code */}
      <div className="position-relative">
        {/* รูปภาพ QR Code ที่เปลี่ยนไปตามสถานะ isScanned */}
        <img 
          src={room1}
          alt="QR Code" 
          className="img-fluid" 
          style={{ width: '600px', height: '600px', cursor: 'pointer' }} 
          onClick={handleScan}  // เมื่อคลิกที่ QR Code จะเปลี่ยนสถานะ
        />
        
        {/* ข้อความ 'สแกนสำเร็จ!!!!' ปรากฏเมื่อมีการสแกน */}
        {isScanned && (
          <div 
            className="position-absolute d-flex align-items-center justify-content-center p-3"
            style={{
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',  // จัดให้อยู่ตรงกลาง
              backgroundColor: '#4CAF50',  // สีเขียวให้ตรงกับตัวอย่าง
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 'bold',
              width: '350px', 
              height: '80px',
              zIndex: 2,  // ให้อยู่ด้านบนสุดของ QR Code
              fontSize: '24px',  // ขนาดตัวอักษรใหญ่ขึ้น
              position: 'relative'  // สำหรับจัดตำแหน่งปุ่มกากบาท
            }}>
            <span>Successful!!!</span>

            {/* ปุ่มกากาบาท */}
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
              onClick={handleClose}  // ซ่อนปุ่มเมื่อคลิก
            >
              &times;
            </button>
          </div>
        )}
      </div>
      
      {/* เวลา 15:00 ด้านล่าง */}
      <div className="mt-3 p-2 bg-light rounded">
        <h4 style={{ fontSize: '100px' }}>15:00</h4>  {/* ปรับขนาดตัวอักษร */}
      </div>
    </div>
  );
}

export default QRCodeScanner;