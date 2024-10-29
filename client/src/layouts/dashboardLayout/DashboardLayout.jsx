import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './dashboardLayout.css'
import {useAuth} from '@clerk/clerk-react';
import ChatTitle from '../../components/chatTitle/ChatTitle';

export default function DashboardLayout() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = ()=>{
    setShowMenu(!showMenu);
  }

  const {userId, isLoaded} = useAuth();

  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in")
    }
  }, [isLoaded, userId, navigate]);

  if(!isLoaded) return "Loading..."
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
