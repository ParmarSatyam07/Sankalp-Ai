import { useState } from "react";
import "./Modal.css";
import { useEffect, useContext} from "react";
import { UserContext } from '../Pages/UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import ReactMarkdown from 'react-markdown';
import axios from "axios";


export default function Modal1() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  const { username } = useContext(UserContext); // Access the username from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection
  const [libraryChats, setLibraryChats] = useState([]); // State to hold recent chats data

  // Check if the username is available; if not, redirect to the login page
  useEffect(() => {
    if (!username) {
        navigate('/login'); // Redirect to login if username is not present
    } else {
        // Fetch recent chats if username is present
        fetchLibraryChats();
    }
  }, [username, navigate]); // Dependency array includes username and navigate

  // Function to fetch recent chats
  const fetchLibraryChats = async () => {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/api/${username}/library`);
        setLibraryChats(res.data.library_chat_data); // Set the recent chats data
    } catch (err) {
        console.error("Error fetching recent chats:", err);
    }
  };

  // Utility function to truncate text to a specified word limit
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "..."; // Truncate and add ellipsis
    }
    return text; // Return the original text if it's within the word limit
  };


  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div><h2>Select </h2></div>
            <div className="horizontal">
                
                {libraryChats.map(chat => (
                <div className="card" key={chat.chat_id}>
                    <h2 className='card-title'><ReactMarkdown>{chat.query}</ReactMarkdown></h2>
                    <div className='B'>
                        <p className='card-des'><ReactMarkdown>{truncateText(chat.response, 20)}</ReactMarkdown></p> {/* Limit to 20 words */}
                    </div>
                    <button className="buttonn">Select</button>
                </div>
              ))}</div>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}