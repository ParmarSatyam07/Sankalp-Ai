import "./Home.css"
import Cardss from "../Components/Cards"
import { useEffect, useContext, useState } from "react";
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import ReactMarkdown from 'react-markdown';
import axios from "axios"; // Import axios for API calls
import Search1 from "../Components/Search2"
function Chatbot() {
  const { username } = useContext(UserContext); // Access the username from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection
  const [librarySummary, setLibrarySummary] = useState([]); // State to hold recent chats data
  

  // Check if the username is available; if not, redirect to the login page
  useEffect(() => {
    if (!username) {
        navigate('/login'); // Redirect to login if username is not present
    } else {
        // Fetch recent chats if username is present
        fetchLibraryData();
        
    }
  }, [username, navigate]); // Dependency array includes username and navigate

  // Function to fetch recent chats
  const fetchLibraryData = async () => {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/api/${username}/library`);
        setLibrarySummary(res.data.library_search_data); // Set the recent chats data
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
    <div className="container">
      <div className="backgroundImage">
      <div className="text">
      <h1 className="H1">The fastest way to find commercial court cases</h1>
      <p className="P1">Streamline your commercial court research with AI</p>
      </div>
      <Search1/>
      </div>
      <div className="bookmark" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
        <h1 className="H2">Bookmarked Summary</h1>
        <div className="cardss">
        
            {librarySummary.map(search => (
                <div className="card" key={search.search_id}>
                    <h2 className='card-title'><ReactMarkdown>{search.query}</ReactMarkdown></h2>
                    <div className='B'>
                        <p className='card-des'><ReactMarkdown>{truncateText(search.response, 20)}</ReactMarkdown></p> {/* Limit to 20 words */}
                    </div>
                </div>
              ))}
           
        </div>
      </div>
    </div>
  )
}

export default Chatbot