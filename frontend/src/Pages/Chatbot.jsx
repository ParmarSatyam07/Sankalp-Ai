import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./Chatbot.css";
import DivCard from "../Components/DivCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);



  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const chatContainerRef = useRef(null);

  // Function to fetch all chats when the page loads
  const fetchChats = async (username, chatroom_id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/${username}/chats/${chatroom_id}`); // Use parameters in the API endpoint
      setResponse(res.data.chat_data || []); // Set the response with fetched chat data
    } catch (err) {
      setError("An error occurred while fetching chats.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch Chatrooms
  const fetchChatrooms = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/${username}/chats`);
      setChatrooms(res.data.chatrooms); // Set the chatrooms data
      console.log("Chatrooms fetched successfully:", res.data.chatrooms);
    } catch (err) {
      console.error("Error fetching recent chats:", err);
    }
  };
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    if (!hasInteracted) {
      setHasInteracted(true);
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
 

  // Use useEffect to check username and fetch chats or redirect to login
  useEffect(() => {
    if (username) {
      if(location.state && location.state.chatroom_id){
        setSelectedChatroom(location.state.chatroom_id); // Set selected chatroom id
        fetchChats(username, location.state.chatroom_id); // Pass parameters to fetchChats
      } else{
        setSelectedChatroom(0);
      }
      fetchChatrooms(); // Load Recent Chats/ all the chatrooms
    } else {
      navigate('/login'); // Redirect to login if username is not present
    }
  }, [username, navigate]); // Dependency array includes username and navigate

  // UseEffect to fetch chats when selectedChatroom changes
  useEffect(() => {
    if (selectedChatroom != null) {
      fetchChats(username, selectedChatroom);
    } else{
      setSelectedChatroom(0);
    }
  }, [selectedChatroom]); // Fetch chats whenever selectedChatroom changes

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleChatroomSelect = (chatroom_id) => {
    setSelectedChatroom(chatroom_id); // Set selected chatroom ID
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `http://127.0.0.1:5000/api/${username}/chats/${selectedChatroom}`,
        { query: query }
      );

      const newChat = { query, response: res.data.response }; // Construct new chat data
      setResponse((prevResponse) => [...prevResponse, newChat]); // Append new chat to the existing responses
      setQuery(""); // Clear the input box after sending the query
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom whenever the response changes
  useEffect(() => {
    scrollToBottom();
  }, [response]); // Dependency on response to trigger scrolling

  // Function to handle saving a chat
  const handleSaveChat = async (chat_id) => {
    try {
      await axios.post(
        `http://127.0.0.1:5000/api/${username}/library/save_chat`, // Replace with the actual save_chat API endpoint
        { chat_id: chat_id } // Send chat_id in the request body
      );
      alert("Chat saved successfully!"); // Show success message
    } catch (err) {
      console.error("Error saving chat:", err);
      alert("Failed to save chat. Please try again.");
    }
  };

  return (
    <>
      <div className="App">
        <div className="sideBar">
        <button className="Ssavedbutton">New Chat</button>
          
          <div className="Title">
            <h1></h1>
          </div>
          <div className="Buttons">
            {chatrooms.map(chatroom => (
              <div key={chatroom.chatroom_id} className="DivCard" onClick={() => handleChatroomSelect(chatroom.chatroom_id)}>
                <p className="P2">{truncateText(chatroom.title, 3)}</p>
              </div>
            ))}
          </div>
          <button className="Ssavedbutton">Saved Chats</button>
        </div>
        <div className="mainBar">
          <div className=" legal">
            <button className="LayP">Lay Person</button>
            <button className="LegalP">Legal Person</button>


          </div>
          <div className="chats" ref={chatContainerRef}>
            {response.map((chatItem, index) => (
              <div key={index}>
                <div className="chat">
                  <p className="txt"><b>User: </b></p>
                  <ReactMarkdown>{chatItem.query}</ReactMarkdown>
                </div>
                <div className="chat bot">
                <p className="txt"><b>Bot: </b></p>
                  <ReactMarkdown>{chatItem.response}</ReactMarkdown>
                  <button
                    type="submit"
                    className="savechat"
                    onClick={() => handleSaveChat(chatItem.chat_id)}
                  >
                    Save Chat
                  </button>
                </div>
              </div>
            ))}
            {!hasInteracted && 
<div>
  <h1 className="hello">Ask your <span className="helpspan">Legal</span>  query</h1>
</div>
}

            {loading && <p className="error-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="chatFotter">
            <form onSubmit={handleSubmit}>
              <div className="inp">
                <input
                  type="text"
                  placeholder="Enter your query..."
                  value={query}
                  onChange={handleQueryChange}
                />
                <button type="submit" className="submit-buttons"></button>
              </div>
            </form>

            <p className="incorrect-result">
              This may produce incorrect information about people, cases, or
              facts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
