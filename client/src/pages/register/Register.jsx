import "./register.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e)=>{
    setInputs((prev)=>{return ({...prev, [e.target.name]: e.target.value})});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, inputs);
      console.log(res)
      navigate("/login");
    }catch(err){
      if (err) {
        setError(true);
      }
    }  
  };

  return (
    <div className="register">
        <span className="register-title">Register</span>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input required type="text" className="register-input" placeholder="Enter your username..." name="username" onChange={handleChange}/>
            <label>Email</label>
            <input required type="email" className="register-input" placeholder="Enter your email..." name="email" onChange={handleChange}/>
            <label>Password</label>
            <input required type="text" className="register-input" placeholder="Enter your password..." name="password" onChange={handleChange}/>
            <button type="submit" className="register-button">Register</button> 
        </form>
        <button className="register-login-button"><Link className="link" to="/login">Login</Link></button>
        <p>Already have an account? <Link to={"/login"} style={{color: "lightcoral"}}>Login</Link></p>
        {error &&
          <p style={{color: "lightcoral"}}>Something went wrong, please try again</p>
        }
    </div>
  )
}
