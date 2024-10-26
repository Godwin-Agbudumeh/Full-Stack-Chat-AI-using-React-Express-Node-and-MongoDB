import React from 'react'; 
import {Link} from 'react-router-dom'
import './homepage.css';

export default function Homepage() {
  const test = async()=>{
    await fetch("http://localhost:3000/api/test", {
      credentials:"include",
    })
  }
  return (
    <div className='homepage'>
      <div className="left">
        <h1>GODWIN AI</h1>
        <h2>Take your creativity to greater heights</h2>
        <h4>
          Get instant results to your questions. You get this 
          at a blazing speed.
        </h4>
        <Link to="/dashboard">Start now</Link>
        <button onClick={test}>TEST BACKEND AUTH</button>
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
