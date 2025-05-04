import React from 'react'
import './LoginSig.css'
const LoginSig = () => {
  return (
    <>
    <div className="loginsignup">
        <div className="loginsignup-container">
            <h1>Sign Up</h1>
            <div className="loginsignup-fields">
                <input type="text" placeholder="Username" />
                
                <input type="password" placeholder="Password" />
                
            </div>
            <button className='btn'>
                Continue
            </button>
            <p className="loginsignup-login">Already have an account <span>Login here</span></p>
            <div className="loginsignup-agree">
                <input type="checkbox" name='' id=''/>
               <div className="impline">By continuing i agree to the terms of use $ privacy policy</div>
            </div>

        </div>
    </div>
    </>
    
    
  )
}

export default LoginSig;