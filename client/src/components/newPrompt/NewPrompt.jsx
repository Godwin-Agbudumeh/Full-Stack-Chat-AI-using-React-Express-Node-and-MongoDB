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

  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current.scrollIntoView({behavior: "smooth"});
  },[question, answer, img.dbData]); 

  const add = async (text)=>{
    setQuestion(text); 

    //Sening our question and image and getting the response from google ai
    //img.aiData is gotten from onUploadStart in Upload.jsx 
    const result = await model.generateContent(Object.entries(img.aiData).length ? [img.aiData, text] : (text));
    const response = await result.response;
    setAnswer(response.text());  
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
        {img.isLoading && <div>Loading...</div>}
        {img.dbData?.filePath &&
          <IKImage
            // getting the file path ie clerk url to show the image on page 
            //img.dbData is gotten from onSuccess in Upload.jsx file
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="300"
            transformation={[{width:300}]}
          />
        }
        {question && <div className='message user'>{question}</div>}
        {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
        <div className="endChat" ref={endRef}></div>
        <form action="" className="newForm" onSubmit={handleSubmit}>
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
