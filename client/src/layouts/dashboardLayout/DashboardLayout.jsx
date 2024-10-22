import React, { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import './dashboardLayout.css'
import {useAuth} from '@clerk/clerk-react';

export default function DashboardLayout() {
  const {userId, isLoaded} = useAuth();

  const navigate = useNavigation();

  useEffect(()=>{
    if(isLoaded && !userId){
      navigate("/sign-in ")
    }
  }, [])


  return (
    <div className='dashboardLayout'>
      <div className='menu'>MENU</div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}
