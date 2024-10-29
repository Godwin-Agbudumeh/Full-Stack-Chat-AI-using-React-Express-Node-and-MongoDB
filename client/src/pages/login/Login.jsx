import React from 'react'
import './login.css';
import {SignIn} from '@clerk/clerk-react';

export default function Login() {
  return (
    <div className='login'>
        <SignIn path="/sign-in" signUpUrl='/sign-up' forceRedirectUrl="/dashboard"/>
    </div>
  )
}
