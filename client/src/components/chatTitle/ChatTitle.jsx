import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './chatTitle.css';
//import {useAuth} from "@clerk/clerk-react";
import {useQuery} from '@tanstack/react-query';
import { useContext } from "react";
import { Context } from "../../context/Context";
 
export default function ChatTitle() {
  // const navigate = useNavigate()

  // const ourMenu = ()=>{
  //   setShowMenu(false);
  //   navigate('/dashboard')
  // }

  //const { userId } = useAuth();

  //const userId = "user_2no5Wei5fmHnEPP9vMueNFt5WBb";
  const {currentUser} = useContext(Context);
  const userId = currentUser?._id;

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        //This is actually a get request, 
        //but backend api, not detecting credentials,
        //so i used post to send userId, to fix
        method: "POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({userId})
      }).then((res) =>
        res.json()
      ),
  });

  return (
    <div className='chatTitle'>
      <span className='title'>DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      {/* <h3 onClick={ourMenu}>Create a new Chat</h3> */}
      <hr/>
      <span className='title'>RECENT CHATS</span>
      <div className="list">
        {isPending 
        ? "Loading..." 
        : error 
        ? "No chats yet!"
        : data?.map((chat)=>{return(
          <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>{chat.title}</Link>
        )})}
      </div>
      <hr/>
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
            <span>Copyright Godwin AI</span>
            <span>All rights reserved</span>
        </div>
      </div>
    </div>
  )
}
