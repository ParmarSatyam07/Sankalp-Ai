import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./Discussion.css";
import DivCard from "../Components/DivCard";
import { Paperclip, Send, Mic, MicOff } from "lucide-react"; // Added Mic and MicOff icons
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [prompt_type, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // ... (previous functions)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();


  const chatContainerRef = useRef(null);

  // Function to fetch Chatrooms
  const fetchChatrooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/${username}/chats`);
      setChatrooms(res.data.chatrooms); // Set the chatrooms data
      console.log("Chatrooms fetched successfully:", res.data.chatrooms);
    } catch (err) {
      console.error("Error fetching recent chats:", err);
    }
  };

  // Fetch chats for the selected chatroom when it changes
  const fetchChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res2 = await axios.get(`http://127.0.0.1:5000/api/${username}/chats/${selectedChatroom}`);
      setResponse(res2.data.chat_data);
      console.log("Chats fetched successfully for selected chatroom:", selectedChatroom);
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("An error occurred while fetching chats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(username){
      console.log("location.state : ", location.state);
      
      if (location.state && location.state.chatroom_id){
        fetchChatrooms().then(() => setSelectedChatroom(location.state.chatroom_id));
      }else{
        fetchChatrooms();
      }
    }else {
      navigate('/login');
    }    
  }, [username, navigate, location.state]);

  useEffect(() => {
    if (selectedChatroom) {
      fetchChats().then(scrollToBottom);
    }   
  }, [selectedChatroom]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  // Utility function to truncate text to a specified word limit
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Truncate and add ellipsis
    }
    return text; // Return the original text if it's within the word limit
  };

 

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  const [fileType, setFileType] = useState("PDF");
  const fileInputRef = useRef(null);

  const handleChatroomSelect = (chatroom_id) => {
    setSelectedChatroom(chatroom_id); // Set selected chatroom ID
  };

  const handleFileTypeSelect = (type) => {
    setFileType(type);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePromptSelect = (prompt) => {
    setPrompt(prompt);
    console.log("Selected prompt:", prompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("query", query);
      formData.append("prompt_type", prompt_type);
      if (selectedFile) {
        formData.append("file", selectedFile);
        formData.append("fileType", fileType);
      }

      const res = await axios.post(
        `http://127.0.0.1:5000/api/${username}/chats/${selectedChatroom}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newChat = { query, response: res.data.response };
      setResponse((prevResponse) => [...prevResponse, newChat]);
      setQuery("");
      setSelectedFile(null);
      setFileType("PDF");
      fetchChats().then(scrollToBottom);
      
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChat = async (chat_id) => {
    try {
      await axios.post(
        `http://127.0.0.1:5000/api/${username}/library/save_chat`,
        { chat_id: chat_id }
      );
      alert("Chat saved successfully!");
    } catch (err) {
      console.error("Error saving chat:", err);
      alert("Failed to save chat. Please try again.");
    }
  };

  const handleNewChat = async () => {
  setLoading(true);
  setError(null);
  try{
    const res = await axios.post(`http://127.0.0.1:5000/api/${username}/chats`,
      { query_type : 'new_chat'}
    );
    fetchChatrooms().then(() => handleChatroomSelect(res.data.chatroom_id));
    
  }catch (err) {
    setError("An error occurred while fetching data.");
    console.error(err);
  } finally {
    setLoading(false);
  }
   
  };
  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setQuery(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.start();
      setIsListening(true);
    } else {
      console.error('Speech recognition not supported');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <>
      <div className="App">
        <div className="sideBar">
          <button className="Ssavedbutton" onClick={handleNewChat}>New Chat</button>
          <div className="Title">
            <h1></h1>
          </div>
          <div className="Buttons">
            {chatrooms.map((chatroom) => (
              <div
                key={chatroom.chatroom_id}
                className="DivCard"
                onClick={() => handleChatroomSelect(chatroom.chatroom_id)}
              >
                <p className="P2">{truncateText(chatroom.title, 3)}</p>
              </div>
            ))}
          </div>
          <button className="Ssavedbutton" onClick={() => navigate('/library')}>Saved Chats</button>
        </div>
        <div className="mainBar">
          <div className=" legal">
            <button className="LayP" onClick={() => handlePromptSelect("Lay")}>Lay Person</button>
            <button className="LegalP" onClick={() => handlePromptSelect("Legal")}>Legal Person</button>
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
            {!selectedChatroom && (
              <div>
              <h1 className="hello">Ask your <span className="helpspan">Legal</span> query</h1>
              <h3>Click on <span className="helpspan">New Chat</span> to start new conversation</h3>
              
            </div>
            )}
            {loading && <p className="error-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="chatFotter">
            {selectedChatroom && (
              <form onSubmit={handleSubmit}>
                <div className="inp">
                  <input
                    type="text"
                    placeholder="Enter your query..."
                    value={query}
                    onChange={handleQueryChange}
            />
            {selectedFile && (
              <span className="file-name">{selectedFile.name}</span>
            )}
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-20 w-20 px-5 py-2 rounded-full bg-blue-600 mr-2 hover:bg-blue-700">
              <Paperclip size={24} color="white"/>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-lg mb-5">
            <DropdownMenuLabel>Select Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={fileType}
              onValueChange={setFileType}
            >
              <DropdownMenuRadioItem
                value="PDF"
                onClick={() => handleFileTypeSelect("PDF")} 
                className="text-2xl"
              >
                PDF
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="TEXT"
                onClick={() => handleFileTypeSelect("TEXT")}
                className="text-2xl"
              >
                TEXT
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
          </DropdownMenu>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept={fileType === "PDF" ? ".pdf" : ".txt"}
            />
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className="h-20 w-20 px-5 py-2 rounded-full bg-blue-600 mr-2 hover:bg-blue-700"
            >
              {isListening ? <MicOff size={24} color="white"/> : <Mic size={24} color="white"/>}
            </button>
            <button
              type="submit"
              className="h-20 w-20 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700"
            >
              <Send size={24} color="white"/>
            </button>
                </div>
              </form>
            )}
            
            <p className="incorrect-result">
              This may produce incorrect information about people, cases, or facts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
