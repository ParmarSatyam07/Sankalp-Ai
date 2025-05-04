// LoginSig.jsx
import './LoginSig.css';
import { useState, useContext } from 'react'; // Import useContext
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';  // Import UserContext

function LoginSig() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateUsername } = useContext(UserContext); // Get the updateUsername function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/login", {
      username,
      password
    }).then((response) => {
      // Assuming the login was successful
      if (response.data.username) {
        updateUsername(response.data.username); // Update the username in context
        navigate('/dashboard'); // Redirect to Dashboard page after login
      } else {
        console.log("Login failed");
        alert(response.data.message);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className='btn'>
            Continue
          </button>
          <p className="loginsignup-login">Don't have an account <a href='/signup'>SignUp here</a></p>
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <div className="impline">By continuing I agree to the terms of use & privacy policy</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSig;
