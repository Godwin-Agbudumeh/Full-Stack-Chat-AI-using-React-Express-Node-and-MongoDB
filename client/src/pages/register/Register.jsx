import React from 'react'
import './register.css';
import {SignUp} from '@clerk/clerk-react';

export default function Register() {
  return (
    <div className='register'>
      {/* <SignUp path="/sign-up" signInUrl='/sign-in'/> */}
      <SignUp />
    </div>
  )
}
