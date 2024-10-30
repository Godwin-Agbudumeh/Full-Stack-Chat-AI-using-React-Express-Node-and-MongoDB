import React from 'react'
import './dashboard.css';
import {useAuth} from "@clerk/clerk-react";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from "react-router-dom";

export default function DashboardPage() {

const { userId } = useAuth();

const queryClient = useQueryClient();

const navigate = useNavigate()

const mutation = useMutation({
  mutationFn: (text)=>{
    return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
      method: "POST",
      credentials: "include", 
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({userId, text})
    }).then(res=>res.json())
  },
  //id is response from backend on success
  onSuccess: (id)=>{
    //Invalidate and refresh ie it forgets old fetch and refetches, just like a useState hook
    //'userChats' key from chatlist.jsx used here to invalidate and fetch again so it reflects new chat just added
    queryClient.invalidateQueries( {queryKey: ['userChats']})
    navigate(`/dashboard/chats/${id}`);
  }
})

  const handleSubmit = async(e)=>{ 
    e.preventDefault()

     //to reach the text name in input element
    const text = e.target.text.value

    if(!text) return;

    //calls the useMutation hook to start operation
    mutation.mutate(text);
  }

  return (
    <div className='dashboard'>
      <div className="headingContainer">
        <img src="/logo.png" alt="" />
        <h1>GODWIN AI</h1>
      </div>
      <div className="formContainer" onSubmit={handleSubmit}>
        <form>
          <input type="text" name="text" placeholder='How can i help?'/>
          <button>
            <i className="fa-solid fa-arrow-right dashboardArrow"></i>
          </button>
        </form>
      </div>
    </div>
  )
}
