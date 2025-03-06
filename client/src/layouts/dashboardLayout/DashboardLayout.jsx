import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './dashboardLayout.css'

import ChatTitle from '../../components/chatTitle/ChatTitle';
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function DashboardLayout() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = ()=>{
    setShowMenu(!showMenu);
  }

  const {currentUser} = useContext(Context);
  const userId = currentUser?._id;

  const navigate = useNavigate();

  console.log(showMenu)

  useEffect(()=>{
    if(currentUser === null){
      navigate("/login")
    }
  }, [currentUser]);

  return (
    <div className='dashboardLayout'>
      <div onClick={handleMenu}><i className="fa-solid fa-bars mobileMenuBars"></i></div>
      {showMenu && <div className='mobileMenu'><ChatTitle /></div>}
      <div className='menu'><ChatTitle /></div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}
