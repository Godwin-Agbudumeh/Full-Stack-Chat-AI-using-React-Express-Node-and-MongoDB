import React from 'react';
import './rootLayout.css'
import {Link, Outlet} from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <header>
        <Link to='/'>
            <img src="logo.png" alt="" />
            <span>GODWIN AI</span>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
