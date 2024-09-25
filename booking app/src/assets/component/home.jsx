import React from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import room1 from '../pic/room1.png';

function Home() {
  return (
    <div className="container">
      {/* ช่องค้นหาด้านบนสุด */}
      <div className="row mb-4">
        <div className="col-md-12">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="ค้นหาห้อง..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">ค้นหา</button>
          </form>
        </div>
      </div>

      {/* กรอบรอบ row (ไม่มีกรอบ) */}
      <div className="row" style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "10px" }}>
        <div className="col-md-3 mb-4" style={{ display: "inline-block" }}>
          <div className="card" style={{ width: "18rem", borderRadius: "10px", border: "1px solid #ddd" }}> {/* เพิ่มกรอบให้กับการ์ด */}
            <div style={{ position: "relative" }}>
              <img src={room1} className="card-img-top" alt="room1" />
              <div style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                backgroundColor: "rgba(255, 215, 0, 0.8)",
                color: "black",
                padding: "5px",
                borderRadius: "5px"
              }}>
                VIP
              </div>
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "5px",
                borderRadius: "5px"
              }}>
                10 Peoples
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">Name2</h5>
              <p className="card-text">
                D202<br />
                6.00 - 18.00 น.
              </p>
              <a href="#" className="btn btn-primary">เลือก</a>
              <a href="#" className="btn btn-secondary" style={{ marginLeft: "10px" }}>ข้อมูลห้อง</a>
            </div>
          </div>
        </div>

        {/* คุณสามารถเพิ่มการ์ดเพิ่มเติมที่นี่ได้ */}
      </div>
    </div>
  );
}

export default Home;
