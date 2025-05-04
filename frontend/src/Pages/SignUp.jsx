// LoginSig.jsx
import './SignUp.css';
import { useState, useContext } from 'react'; // Import useContext
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';  // Import UserContext

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();
  const { updateUsername } = useContext(UserContext); // Get the updateUsername function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/register", {
      username,
      password,
      firstName,
      lastName,
      email,
      dob,
      gender,
      profession,
      bio
    }).then((response) => {
      // Assuming the login was successful
      console.log(response);
      if (response.data.message=="Registration successful") {
        navigate('/login');
      } else {
        console.log("Registration failed");
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
          <h1>Sign up</h1>
          <div className="loginsignup-fields">
            <div className='full'>
            <input 
              type="text" 
              name="firstName" 
              placeholder="Firstname" 
              value={firstName} 
              onChange={(e) => setFirstname(e.target.value)} 
              
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Lastname" 
              value={lastName} 
              onChange={(e) => setLastname(e.target.value)} 
              
            />
            </div>
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="date" 
              name="dob" 
              placeholder="DOB" 
              value={dob} 
              onChange={(e) => setDOB(e.target.value)} 
            />
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
            <input 
              type="text" 
              name="gender" 
              placeholder="Gender" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
            />
            <input 
              type="text" 
              name="profession" 
              placeholder="Profession" 
              value={profession} 
              onChange={(e) => setProfession(e.target.value)} 
            />
            <input 
              type="text" 
              name="bio" 
              placeholder="Bio" 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
            />
          </div>
          <button type="submit" className='btn'>
            Continue
          </button>
          <p className="loginsignup-login">Already have an account <a href='/login'>Login here</a></p>
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <div className="impline">By continuing I agree to the terms of use & privacy policy</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
