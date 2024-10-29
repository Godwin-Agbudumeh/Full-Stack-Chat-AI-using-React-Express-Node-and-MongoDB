import React, { useRef } from 'react'
import { IKContext, IKUpload  } from 'imagekitio-react';

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY; 

//to authenticate owner for imagekit, it must use backend api
//actual image upload takes place via react client
const authenticator =  async () => {
    try {
        //backend api to authenticate owner for imagekit
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/imageupload`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

export default function ImageUpload({setImg}) {

    const ikUploadRef = useRef(null);
    const onError = err => {
        console.log("Error", err);
      }; 
    
      //on successful upload to clerk via our backend ....3000/api/upload/
      //res is the response gotten
    const onSuccess = res => {
      console.log("Success", res); 
      setImg(prev=>({...prev, isLoading: false, dbData: res}));
    };
    
    const onUploadProgress = progress => {
      console.log("Progress", progress);
    };
    
    //on start of upload from user pc before going to clerk via backend
    //ie before going to onUploadProgress above, then to onSuccess above
    const onUploadStart = evt => {
      const file = evt.target.files[0];
       
      //it is reading the file ie image details, so that we can send it to google gemini ai 
      //and ask questions all in prompt.jsx 
      const reader = new FileReader()
      reader.onloadend = ()=>{
        setImg(prev=>({...prev, isLoading:true, aiData:{
          inlineData:{
            data:reader.result.split(",")[1],
            mimeType: file.type,
          }
        }}));
      }; 
      reader.readAsDataURL(file);
    };

  return (
    <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
     >
        {/*IKUpload resolves into <input type="file"/> according to imagekit docs*/}
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{display: "none"}}
          ref={ikUploadRef}
        />  
        {
          //upon click of label, it calls the IKUpload, and upload process begins
          //we are using label here to avoid showing that add image button that this IKUpload shows on page
            <label onClick={()=>ikUploadRef.current.click()}>
                <i class="fa-regular fa-file-image"></i>
            </label> 
        }
    </IKContext>
  )
}
