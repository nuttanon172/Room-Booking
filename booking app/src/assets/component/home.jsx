import React from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import room from '../pic/room.png';

function Home() {
  return (
    <div className="container">
      {/* ช่องค้นหาด้านบนสุด */}
      <div className="row mb-3" style={{ marginTop: "20px" }}> {/* เพิ่มระยะห่างจากด้านบน */}
        <div className="col-md-12">
          <form className="d-flex flex-wrap">
            <div className="row">
              {/* First Row: Search Building, Search Room, Room Type */}
              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="ค้นหาตึก..."
                  aria-label="Search Building"
                />
              </div>
              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="ค้นหาห้อง..."
                  aria-label="Search Room"
                />
              </div>
              <div className="col-md-3 mb-2">
                <select className="form-control">
                  <option value="all">ประเภทห้อง: ทั้งหมด</option>
                  <option value="normal">Normal</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  type="number"
                  placeholder="จำนวนคน"
                  aria-label="จำนวนคน"
                />
              </div>
            </div>

            {/* Second Row: Date, Time Range */}
            <div className="row">
              <div className="col-md-4 mb-2">
              <label>เลือกวันที่</label>
                <input
                  className="form-control"
                  type="date"
                  aria-label="เลือกวันที่"
                />
              </div>
              <div className="col-md-3 mb-2">
                <label>เริ่มเวลา</label>
                <input
                  className="form-control"
                  type="time"
                  aria-label="เลือกช่วงเวลาเริ่มต้น"
                />
              </div>
              <div className="col-md-3 mb-2">
                <label>สิ้นสุดเวลา</label>
                <input
                  className="form-control"
                  type="time"
                  aria-label="เลือกช่วงเวลาสิ้นสุด"
                />
              </div>
              <div className="col-md-3 mb-2 mt-2">
              
                <button className="btn btn-outline-success w-100" type="submit">
                  ค้นหา
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* กรอบรอบ row (ไม่มีกรอบ) */}
      <div className="row" style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "10px" }}>
        <div className="col-md-3 mb-4" style={{ display: "inline-block" }}>
          <div className="card" style={{ width: "18rem", borderRadius: "10px", border: "1px solid #ddd" }}>
            <div style={{ position: "relative" }}>
              <img src={room} className="card-img-top" alt="room" />
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
