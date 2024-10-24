import React from 'react'; 
import {Link} from 'react-router-dom'
import './homepage.css';

export default function Homepage() {
  return (
    <div className='homepage'>
      {/* <img src="/orbital.png" alt="" className='orbital'/> */}
      <div className="left">
        <h1>GODWIN AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h4>
          Lorem, ipsum dolor sit amet consectetur 
          adipisicing elit. Odit, inventore delectus 
          tempore eveniet quas amet, suscipit doloribus
          at sed quo voluptate accusamus.
        </h4>
        <Link to="/dashboard">Get Started</Link>
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
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
