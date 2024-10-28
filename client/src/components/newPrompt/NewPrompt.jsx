import React, {useRef, useEffect, useState} from 'react'
import { IKImage } from 'imagekitio-react';
import Upload from '../upload/Upload';
import model from '../../lib/gemini';
import Markdown from "react-markdown";
import './newPrompt.css'
import {useAuth} from "@clerk/clerk-react";
import {useMutation, useQueryClient} from '@tanstack/react-query';


export default function NewPrompt({data}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error:"",
    dbData:{},
    aiData:{},
  })

  //for google gemini ai
  const chat = model.startChat({
    //we are sending previous chat from database to google ai
    //so as to generate interactive responses
    //to implement
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(()=>{
    endRef.current.scrollIntoView({behavior: "smooth"});
  },[data, question, answer, img.dbData]); 

const { userId } = useAuth();

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: ()=>{
    return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
      method: "PUT",
      credentials: "include", 
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        //backend api, not detecting credentials,
        //so i manually send userId, to fix
        userId,
        question: question.length ? question : undefined,
        answer,
        img: img.dbData?.filePath || undefined,
      })
    }).then(res=>res.json())
  },
  onSuccess: ()=>{
    //Invalidate and refresh ie it forgets old fetch and refetches, just like a useState hook
    //'chat' nad data._id key from ChatPage.jsx used here to invalidate and fetch again so it reflects new data just added
    queryClient.invalidateQueries( {queryKey: ['chat', data._id]}).then(()=>{
      formRef.current.reset();
      setQuestion("");
      setAnswer(""); 
      setImg({
        isLoading: false,
        error:"",
        dbData:{},
        aiData:{},
      })
    }); 
  },
  onError: (err)=>{
    console.log(err);
  }
})

  const add = async (text, isInitial)=>{
    if(!isInitial) setQuestion(text); 

    try{
    //Sending our question and image and getting the response from google ai
    //img.aiData is gotten from onUploadStart in Upload.jsx 
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : (text));
    
    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }   
    // setImg({
    //   isLoading: false,
    //   error:"",
    //   dbData:{},
    //   aiData:{},
    // });

    mutation.mutate()
    }catch(err){
      console.log(err)
    }
  };
 
  const handleSubmit = async (e)=>{
    e.preventDefault();

    //to reach the text name in input element
    const text = e.target.text.value;

    if(!text) return;

    add(text, false);
  }

useEffect(()=>{
  //it means we have only question if data?.history?.length === 1
  if(data?.history?.length === 1){
    //we now pass the question to add() function
    //which then generates answer from ai
    //which then calls mutation and save answer to db and invalidates chat and refetches
    add(data.history[0].parts[0].text, true);
  }
}, [])
 
  return (  
    <>
        {question && <div className='message user'>{question}</div>}
        {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
        {img.isLoading && <div>Loading...</div>}
        {img.dbData?.filePath &&
          //showing the image on page with IKImage from imagekit
          <IKImage
            // getting the file path ie clerk url to show the image on page 
            //img.dbData is gotten from onSuccess in Upload.jsx file
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="300"
            transformation={[{width:300}]}
          />
        }
        <div className="endChat" ref={endRef}></div>
        <form action="" className="newForm" onSubmit={handleSubmit} ref={formRef}>
              {/* using Upload.jsx to handle upload, the label to click is in upload.jsx*/}
             <Upload setImg={setImg}/>
             <input id="file" type="file" multiple={false} hidden/>
             <input type="text" name="text" placeholder='Ask anything...'/>
             <button>
                <img src="/arrow.png" alt="" /> 
             </button>
        </form>
    </>
  )
}
