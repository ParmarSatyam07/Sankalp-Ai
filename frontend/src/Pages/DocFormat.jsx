import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate for redirection
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import "./DocFormat.css";

const DocFormat = () => {
  const [generatedDoc, setGeneratedDoc] = useState(""); // State to hold selected chatroom ID

  const { username } = useContext(UserContext); // Access the username from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection
  const location = useLocation(); // Get the current location

  const SaveDoc = async () => {
    if (username) {
      try {
        await axios.post(
          `http://127.0.0.1:5000/api/${username}/library/save_doc`, // Replace with the actual save_chat API endpoint
          { generated_doc:generatedDoc, // Fetch and send the summary from the response
          } 
        );
        alert("Doc saved successfully!"); // Show success message
      } catch (err) {
        console.error("Error saving Doc:", err);
        alert("Failed to save Doc. Please try again.");
      }
    }else{
      navigate('/Doc'); // Redirect to login page if username is not available
    }
  };

  // Use useEffect to check username and fetch chats or redirect to login
  useEffect(() => {
    if (username) {
      if(location.state && location.state.generated_doc){
        setGeneratedDoc(location.state.generated_doc); // Set selected chatroom id
      }
      else{
        console.log("No generated doc found in location state"); // Log error message if no generated doc found in location
      }     
      
    } else {
      navigate('/login'); // Redirect to login if username is not present
    }
  }, [username, navigate]); // Dependency array includes username and navigate

  return (
    <div className="Contain">
      <header>
        <h1>Generated Doc</h1>
        <div className=".button-container">
          <button className="Save" onClick={SaveDoc}>Save</button>
          <button className="Edit">Edit</button>
        </div>
      </header>
      <main>
        <p className="P5" ><ReactMarkdown>{generatedDoc}</ReactMarkdown></p> {/* Render markdown content using react-markdown */}
      </main>
      <footer>
        <div className="footer-button">
          <button className="Download">Download</button>
          <button className="Print">Print</button>
        </div>
      </footer>
    </div>
  );
}

export default DocFormat;
