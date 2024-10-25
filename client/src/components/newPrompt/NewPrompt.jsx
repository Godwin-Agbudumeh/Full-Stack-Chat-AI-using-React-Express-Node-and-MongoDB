import React, {useRef, useEffect, useState} from 'react'
import { IKImage } from 'imagekitio-react';
import Upload from '../upload/Upload';
import model from '../../lib/gemini';
import Markdown from "react-markdown";
import './newPrompt.css'


export default function NewPrompt() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error:"",
    dbData:{},
    aiData:{},
  })

  const chat = model.startChat({
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

  useEffect(()=>{
    endRef.current.scrollIntoView({behavior: "smooth"});
  },[question, answer, img.dbData]); 

  const add = async (text)=>{
    setQuestion(text); 

    //Sending our question and image and getting the response from google ai
    //img.aiData is gotten from onUploadStart in Upload.jsx 
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : (text));
    //const response = await result.response;
    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }
    //setAnswer(response.text()); 
    setImg({
      isLoading: false,
      error:"",
      dbData:{},
      aiData:{},
    });
  };
 
  const handleSubmit = async (e)=>{
    e.preventDefault();

    //to reach the text name in input element
    const text = e.target.text.value;

    if(!text) return;

    add(text);
  }
 
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
        <form action="" className="newForm" onSubmit={handleSubmit}>
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
