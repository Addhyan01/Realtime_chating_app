import React, { useState } from 'react'
import "./Login.css"
import assets from "../../assets/assets"
import { login, signup } from '../../config/firebase'
import { toast } from 'react-toastify'

const Login = () => {

    const [currentState, setCurrentState] = useState('Sign Up');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (currentState === "Sign Up") { 
            signup(username, email, password);
            toast.success("Account created successfully");    
        }
        else{
            login(email, password);
        }

    }
    

  return (
    <div className='login'> 

    <img src={assets.logo_big} alt="" className="logo" />
    <form className="login-form" onSubmit={onSubmitHandler}>
      <h2>{currentState}</h2>
      {currentState === "Sign Up" ? <input type="text" value={username} placeholder='username' className="form-input" onChange={(e) => setUsername(e.target.value)} required /> : null}
      <input type="email" placeholder='email' className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required  />
      <input type="password" placeholder='password' className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type='submit' >{currentState === "Sign Up" ? "Create Account" : "Login Now" }</button>

      {
        currentState === "Sign Up"?<div className="login-term">
        <input type='checkbox' required />
        <p>I agree to the terms & conditions</p>
      </div> : null 
      }
      
      <div className="login-forgot">
        {
          currentState === "Sign Up"?  <p className="login-toggle"> Already have an account <span onClick={()=> setCurrentState("login")}> Login Here</span></p>
          : <p className="login-toggle"> Create an account <span onClick={()=> setCurrentState("Sign Up")}> Click Here</span></p>
        }
       
       
      </div>
    </form>
    
    
    </div>
  )
}

export default Login