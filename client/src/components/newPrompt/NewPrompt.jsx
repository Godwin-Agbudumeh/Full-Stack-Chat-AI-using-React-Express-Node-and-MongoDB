import React, {useRef, useEffect} from 'react'
import './newPrompt.css'

export default function NewPrompt() {

  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current.scrollIntoView({behavior: "smooth"});
  },[]);
 
  return (  
    <>
        <div className="endChat" ref={endRef}></div>
        <form action="" className="newForm">
            <label htmlFor="file">
                <img src="/attachment.png" alt="" />
            </label>
             <input id="file" type="file" multiple={false} hidden/>
             <input type="text" placeholder='Ask anything...'/>
             <button>
                <img src="/arrow.png" alt="" /> 
             </button>
        </form>
    </>
  )
}
