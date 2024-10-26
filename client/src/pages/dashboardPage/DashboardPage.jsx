import React from 'react'
import './dashboardPage.css';
import {useAuth} from "@clerk/clerk-react";

export default function DashboardPage() {

const { userId } = useAuth();

  const handleSubmit = async(e)=>{
    e.preventDefault()

     //to reach the text name in input element
    const text = e.target.text.value

    if(!text) return;

    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      credentials: "include", 
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({userId, text})
    })
  }

  return (
    <div className='dashboardPage'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>GODWIN AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer" onSubmit={handleSubmit}>
        <form>
          <input type="text" name="text" placeholder='Ask me anything...'/>
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}
