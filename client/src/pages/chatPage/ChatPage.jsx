import React, {useState} from 'react'
import './chatPage.css';
import NewPrompt from '../../components/newPrompt/NewPrompt';
import { useLocation } from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import Markdown from "react-markdown";
import {useQuery} from '@tanstack/react-query';
import { IKImage } from 'imagekitio-react';

export default function ChatPage() {
  const { userId } = useAuth();

  const path =  useLocation().pathname;
 
  const chatId = path.split("/").pop()

  const { isPending, error, data } = useQuery({
    //qurey key 'chat' is needed, so that other components can call 'chat' and trigger a refetch
    //query key also has chatId as dependency for re-fetching anytime chatId changes
    queryKey: ['chat', chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
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
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending 
          ? "Loading" 
          : error 
          ? "Something went wrong" 
          : data?.history?.map((message, index)=>{return(
              <>
                {message.img && (
                  <IKImage 
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    height="300"
                    width="400"
                    transformation={[{height:300, width:400}]}
                    loading="lazy"
                    lqip={{active:true, quality:20}}
                  />
                )}
                <div className={message.role === "user" ? "message user" : "message"} key={index}>
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </>
          )})}
             
          <NewPrompt data={data}/>
        </div>
      </div>
    </div> 
  )
}
