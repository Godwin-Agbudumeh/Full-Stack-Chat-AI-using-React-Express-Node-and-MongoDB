import React from 'react';
import {Link} from 'react-router-dom';
import './chatList.css';
import {useAuth} from "@clerk/clerk-react";
import {useQuery} from '@tanstack/react-query';
 
export default function ChatList() {
  const { userId } = useAuth();

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
        res.json(),
      ),
  });

  return (
    <div className='chatList'>
      <span className='title'>DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Godwin AI</Link>
      <Link to="/">Contact</Link>
      <hr/>
      <span className='title'>RECENT CHATS</span>
      <div className="list">
        {isPending 
        ? "Loading..." 
        : error 
        ? "Something went wrong!" 
        : data?.map((chat)=>{return(
          <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>{chat.title}</Link>
        )})}
      </div>
      <hr/>
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
            <span>Upgrade to Godwin AI Pro</span>
            <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}
