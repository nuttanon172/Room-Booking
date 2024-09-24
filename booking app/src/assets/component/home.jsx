import React, { useState } from 'react';
import '../css/bootstrap.min.css';
import '../js/bootstrap.js';
import room from '../pic/room.png';

function Home() {
    return (
        <div class="card" style="width: 18rem;">
        <img src="room.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      
    );
}
  
  export default Home;