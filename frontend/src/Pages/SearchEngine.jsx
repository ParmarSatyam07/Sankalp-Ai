import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import './SearchEngine.css';
import EnhancedLoading from '../Components/EnhancedLoading';
import ReactMarkdown from "react-markdown";



const App = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [chatResponse, setChatResponse] = useState(null); // State to store the response from chat API

  const { username } = useContext(UserContext); // Access the username from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.get(`http://127.0.0.1:5000/search_and_summarize`, {
        params: { query: query },
      });

      setResponse(res.data);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };
  // Function to handle saving a summary
  const handleSaveSummary = async () => {
    if (username) {
      try {
        await axios.post(
          `http://127.0.0.1:5000/api/${username}/library/save_search`, // Replace with the actual save_chat API endpoint
          { query: query,
            response: response, // Fetch and send the summary from the response
          } 
        );
        alert("Summary saved successfully!"); // Show success message
      } catch (err) {
        console.error("Error saving Summmary:", err);
        alert("Failed to save summary. Please try again.");
      }
    }else{
      navigate('/login'); // Redirect to login page if username is not available
    }
  };

  // Function to handle the "Chat with Summary" button click
  const handleChatWithSummary = async () => {
    if (username) {
      try {
        // Sending a POST request without any parameters
        const res = await axios.post(`http://127.0.0.1:5000/api/${username}/chats`,
          {
            query_type : "chat_with_summary"
          }
        );
  
        // setChatResponse(res.data); // Store the chat response
        navigate('/Discussion', {state:{chatroom_id:res.data.chatroom_id}}); // Redirect to the chat page with the chat ID and username
      } catch (err) {
        setError('An error occurred while chatting with the summary.');
        console.error(err); // Log the error for debugging
      }    
      
    }else{
      navigate('/login'); // Redirect to login page if username is not available
    }
    
  };
  function gotoAccount(){
    navigate('/Account');
  }
  function gotoDecision(){
    navigate('/Decision');

}

  return (
    <>
    <div className='realme-container'>
      <div className='navbarContainer'>
        <form onSubmit={handleSubmit}>
          <div className='Searchbar'>
            <input
              type="text"
              placeholder="  Enter your query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="query-input"
            />
            <button type="submit" className="submit-button">Search</button>
          </div>
        </form>

        
        
      </div>

      <div className="app-container">
      {loading && <EnhancedLoading isLoading={loading} />}
      {error && <p className="eerror-message">{error}</p>}

        {response && response.summary && (
          <div className="response-container-1">
            <div className='summarycontainer'>
              <text>Summary</text>
              {/* <button className='ChatWith' onClick={handleChatWithSummary}>Chat with Summary</button> */}
            </div>
            <ReactMarkdown>{response.summary}</ReactMarkdown>
            {/* Button to save the chat */}
           <div className="btn-handle">
           <button
              type="submit"
              className="btn-save"
              onClick={handleSaveSummary}
            >
               Save Summary
            </button>
            <button className='ChatWith' onClick={handleChatWithSummary}>Chat with Summary</button>
        
           </div>
          </div>
        )}
        

        {response && response.summary && (
          <div className="response-container-2">
            <text className='Sources'>Sources</text>
            <ul className="links-list">
              {response.links.map((linkItem, index) => (
                <div className='link-hover'>
                <li key={index}>
                  <a href={linkItem.link} target="_blank" rel="noopener noreferrer">
                    {linkItem.title}
                  </a>
                </li>
                </div>
                

              ))}
            </ul>
          </div>
        )}
        
        </div>

        {/* {chatResponse && (
          <div className="chat-response-container">
            <h3>Chat Response:</h3>
            <p>{chatResponse.chatroom_id}</p>
          </div>
        )} */}
      </div>
      </>
    
  );
};

export default App;
