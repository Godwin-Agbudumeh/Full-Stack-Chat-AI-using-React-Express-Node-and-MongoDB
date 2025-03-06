import "./login.css"
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Login() {
  const [inputs, setInputs] = useState({
    email:"",
    password:"",
  });
  
  const [error, setError] = useState(null);

  //we are destruturing the context value which is an object, 
  //and extracting dispatch, isfetching from it.
  const { dispatch, isFetching } = useContext(Context); 

  const navigate = useNavigate();

  const handleChange = (e)=>{
    setInputs((prev)=>{return ({...prev, [e.target.name]: e.target.value})});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, inputs);
      console.log(res);
      dispatch({type: "LOGIN_SUCCESS", payload:res.data})
      navigate("/dashboard");
    }catch(err){
      console.log(err)
      //error data coming from backend from res.status(404), wrong credentials, caught by catch block
      setError(err.response.data); //data coming from backend from res.status(404)
      dispatch({type: "LOGIN_FAILURE"})
    }  
  };

  return (
    <div className="login">
        <span className="login-title">Login</span>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input required type="text" className="login-input" placeholder="Enter your username" name="username" onChange={handleChange}/>
            <label>Password</label>
            <input required type="password" className="login-input" placeholder="Enter your password..." name="password" onChange={handleChange}/>
            <button type="submit" className="login-button">Login</button>
        </form>
        <button className="login-register-button" disabled={isFetching}><Link className="link" to="/register">Register</Link></button>
        <p>Don't have an account? <Link to={"/register"} style={{color: "teal"}}>Register</Link></p>
        {error && (<p style={{color:"lightcoral", padding:"6px"}}>{error}</p>)}
    </div>
  )
}

