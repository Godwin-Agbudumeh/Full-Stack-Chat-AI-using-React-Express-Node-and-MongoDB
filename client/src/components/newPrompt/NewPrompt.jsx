import React, {useRef, useEffect, useState} from 'react'
import { IKImage } from 'imagekitio-react';
import Upload from '../upload/Upload';
import './newPrompt.css'

export default function NewPrompt() {

  const [img, setImg] = useState({
    isLoading: false,
    error:"",
    dbData:{}
  })

  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current.scrollIntoView({behavior: "smooth"});
  },[]); 
 
  return (  
    <>
        {img.isLoading && <div>Loading...</div>}
        {img.dbData?.filePath &&
          <IKImage 
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="300"
            transformation={[{width:300}]}
          />
        }
        <div className="endChat" ref={endRef}></div>
        <form action="" className="newForm">
             <Upload setImg={setImg}/>
             <input id="file" type="file" multiple={false} hidden/>
             <input type="text" placeholder='Ask anything...'/>
             <button>
                <img src="/arrow.png" alt="" /> 
             </button>
        </form>
    </>
  )
}
