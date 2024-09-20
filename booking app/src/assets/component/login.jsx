import React, { useState } from 'react';
import './cs/login.css'
import './cs/bootstrap.min.css'
import './cs/style.css' 
import user_image from './pic/user.png'
import pass_image from './pic/padlock.png'
function LoginForm({ onLogin }) {
    const [user, setUser] = useState('');  // สร้าง state สำหรับ user
    const [pass, setPass] = useState('');  // สร้าง state สำหรับ password
    const [showPassword, setShowPassword] = useState(false); // สร้าง state สำหรับแสดง password
  
    const handleSubmit = (e) => {
      e.preventDefault(); // ป้องกันการ reload หน้าหลังจาก submit form
      // เพิ่ม logic ในการจัดการเมื่อ submit form
      if(user =="ww@gmail.com" && pass =="123")
      {
        console.log("kuy");
        onLogin()
      }
     
      else{
        console.log("kuy กว่าเดิม");

      }
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);  // toggle การแสดงผล password
    };
  return (
    
    <div className='background'>
    <div className='signin'>
    <form onSubmit={handleSubmit}>      
        <h1 style={{fontSize:'80px'}}>Login</h1>
        <p> user : ww@gmail.com pass:123</p>
      <p className="list">Username</p>
      <div className="form-floating">
        <img id='user_logo' src={user_image } alt="" />
        <input
          type="email"
          className="user"
          name="user"
          placeholder="Type your username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          
        />
         </div>
      <p className="list">Password</p>
      <div className="form-floating">
        <img id ="padlock_logo"src={pass_image} alt="" />
        <input
        type={showPassword ? 'text' : 'password'}
          className="pass"
          name="pass"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>

      <label className="switch">
        <input type="checkbox" onChange={toggleShowPassword} />
        <span className="slider round"></span>
      </label>
      <div className="textbutton"></div>
      <div className="sp">Show password</div>
      <button type="submit" className=" btn-primary con">
        Confirm
      </button>
    </form>
      </div>
      </div>

   
    
  );
}

export default LoginForm;