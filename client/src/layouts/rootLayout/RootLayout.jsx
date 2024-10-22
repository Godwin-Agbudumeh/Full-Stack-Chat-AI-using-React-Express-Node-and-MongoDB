import React from 'react';
import './rootLayout.css'
import {Link, Outlet} from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className='rootLayout'>
        <header>
          <Link to='/' className='logo'>
              <img src="logo.png" alt="" />
              <span>GODWIN AI</span>
          </Link>
          <div className='user'>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>    
  )
}
