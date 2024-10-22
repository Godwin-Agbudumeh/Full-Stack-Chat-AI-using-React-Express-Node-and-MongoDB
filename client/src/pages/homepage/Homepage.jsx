import React from 'react'; 
import {Link} from 'react-router-dom'
import './homepage.css';

export default function Homepage() {
  return (
    <div>
      Homepage
      <Link to="/dashboard">dashboard</Link>
    </div>
  )
}
