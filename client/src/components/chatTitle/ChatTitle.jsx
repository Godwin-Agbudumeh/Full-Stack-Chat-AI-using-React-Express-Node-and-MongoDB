import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './chatTitle.css';
import {useAuth} from "@clerk/clerk-react";
import {useQuery} from '@tanstack/react-query';
 
export default function ChatTitle() {
  const { userId } = useAuth();
  //const userId = "user_2no5Wei5fmHnEPP9vMueNFt5WBb"
  console.log(userId)

  // useEffect(()=>{
  //   try{
  //     const test = async ()=>{
  //       const res = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
  //         method: "POST",
  //         body: JSON.stringify({userId})
  //       });
  
  //       console.log(res)
  //     }
  //     test()
  //   }catch(err){
  //     console.log(err)
  //   }
  // },[])

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        //This is actually a get request, 
        //but backend api, not detecting credentials,
        //so i used post to send userId, to fix
        method: "GET",
        // credentials:"include",
        // headers:{
        //   "Content-Type":"application/json"
        // },
        // body: JSON.stringify({userId})
      }).then((res) =>
        res.json()
      ),
  });

  return (
    <div className='chatTitle'>
      <span className='title'>DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <hr/>
      <span className='title'>RECENT CHATS</span>
      <div className="list">
        {isPending 
        ? "Loading..." 
        : error 
        ? "Something went wrong!" + error
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
