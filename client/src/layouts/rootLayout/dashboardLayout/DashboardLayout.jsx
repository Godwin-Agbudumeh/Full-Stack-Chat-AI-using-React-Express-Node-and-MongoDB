import React from 'react';
import { Outlet } from 'react-router-dom';
import './dashboardLayout.css'

export default function DashboardLayout() {
  return (
    <div className='dashboardLayout'>
      <div className='menu'>MENU</div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}
