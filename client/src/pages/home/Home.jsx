import React from 'react'; 
import {Link} from 'react-router-dom'
import './home.css';

export default function Home() {
  return (
    <div className='home'>
      <div className="left">
        <h1>GODWIN AI</h1>
        <h2>Take your creativity to greater heights</h2>
        <h4>
          Get instant results to your questions. You get this 
          at a blazing speed.
        </h4>
        <Link to="/dashboard">Start now</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/robot.png" alt="" className='bot'/>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="copyright">
          <span>Copyright 2024 Godwin AI</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </div>
  )
}
