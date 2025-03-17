import React, { useState } from 'react'
import "./Login.css"
import assets from "../../assets/assets"

const Login = () => {

    const [currentState, setCurrentState] = useState('Sign Up');
    

  return (
    <div className='login'> 

    <img src={assets.logo_big} alt="" className="logo" />
    <form className="login-form">
      <h2>{currentState}</h2>
      {currentState === "Sign Up" ? <input type="text" placeholder='username' className="form-input" required /> : null}
      <input type="email" placeholder='email' className="form-input" required  />
      <input type="password" placeholder='password' className="form-input" required />
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