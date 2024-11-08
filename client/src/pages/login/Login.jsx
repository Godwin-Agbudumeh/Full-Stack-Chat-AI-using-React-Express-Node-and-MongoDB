import React from 'react'
import './login.css';
import {SignIn} from '@clerk/clerk-react';

export default function Login() {
  return (
    <div className='login'>
        {/* <SignIn path="/sign-in" signUpUrl='/sign-up' forceRedirectUrl="/dashboard"/> */}
        {/* <SignIn /> */}
        <SignIn 
          path="/sign-in" 
          signUpUrl={`${import.meta.env.VITE_CLERK_CLIENT_URL}/sign-up`} 
          forceRedirectUrl={`${import.meta.env.VITE_CLERK_CLIENT_URL}/dashboard`}
        />
    </div>
  )
}
