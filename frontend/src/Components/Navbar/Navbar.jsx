import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "./Navbar.css";
import { UserContext } from '../../Pages/UserContext';
import axios from 'axios';

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  // const [response, setResponse] = useState([])
  const { username, logout } = useContext(UserContext); // Access username and logout function from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  // Handle logout action
  const handleLogout = () => {
    axios.get(`http://127.0.0.1:5000/api/logout`); // Use parameters in the API endpoint
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          {/* Add your logo here */}
        </div>

        <ul className='nav-menu'>
        <li onClick={() => { setMenu("Dashboard") }}>
            <Link style={{ textDecoration: 'none' }} to='/Dashboard'>Home</Link>
            {menu === "Dashboard" ? <hr /> : <></>}
          </li>
        

          

          <li onClick={() => { setMenu("Library") }}>
            <Link style={{ textDecoration: 'none' }} to='/Library'>Library</Link>
            {menu === "Library" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("Home") }}>
            <Link style={{ textDecoration: 'none' }} to='/Home'>Search Engine</Link>
          </li>

          

          <li onClick={() => { setMenu("Chatbot") }}>
            <Link style={{ textDecoration: 'none' }} to='/Chatbot'>Discussion</Link>
            {menu === "Chatbot" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("Decision") }}>
            <Link style={{ textDecoration: 'none' }} to='/Decision'>Decision</Link>
            {menu === "Decision" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setMenu("Doc") }}>
            <Link style={{ textDecoration: 'none' }} to='/Doc'>Doc</Link>
            {menu === "Doc" ? <hr /> : <></>}
          </li>
          
        </ul>

        <div className="nav-logo-btn">
          {/* Conditionally render Login or Logout button */}
          {username ? (
            <button onClick={handleLogout}>Logout</button> // Show Logout button if user is logged in
          ) : (
            <Link to='/Login'><button>Login</button></Link> // Show Login button if user is not logged in
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
