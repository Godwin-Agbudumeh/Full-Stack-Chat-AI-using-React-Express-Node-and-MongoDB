import React from 'react';
import { Outlet } from 'react-router-dom';
import './dashboardLayout.css'
import {useAuth} from '@clerk/clerk-React';

export default function DashboardLayout() {
const {userId} = useAuth()

  return (
    <div className='dashboardLayout'>
      <div className='menu'>MENU</div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}
