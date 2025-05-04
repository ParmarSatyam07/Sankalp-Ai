// Doc.jsx
import "./Doc.css";
import Modal1 from "../Components/Modal3";
import Modal2 from "../Components/Modal2";
import Modal3 from "../Components/Modal3";
import { useState, useEffect, useContext } from "react";
import { UserContext } from './UserContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate for redirection
import ReactMarkdown from 'react-markdown';
import axios from "axios";
import "./Dashboard.css";

const Doc = () => {
  const [selectedChat, setSelectedChat] = useState(""); // State to hold recent chats data
  const [selectedSummary, setSelectedSummary] = useState(""); // State to hold recent chats data
  const [selectedDoc, setSelectedDoc] = useState(""); // State to hold recent chats data
  const [modal1Visible, setModal1Visible] = useState(false); // State to control Modal1 visibility
  const [modal2Visible, setModal2Visible] = useState(false); // State to control Modal2 visibility
  const [modal3Visible, setModal3Visible] = useState(false); // State to control Modal3 visibility
  const [libraryChats, setLibraryChats] = useState([]); // State to hold library chats
  const [librarySummary, setLibrarySummary] = useState([]);
  const [libraryDocs, setLibraryDocs] = useState([]);

  const { username, logout } = useContext(UserContext); // Access the username from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection
    const handleLogout = () => {
        axios.get(`http://127.0.0.1:5000/api/logout`); // Use parameters in the API endpoint
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to login page after logout
      };

    // Check if the username is available; if not, redirect to the login page
  useEffect(() => {
    if (username) {      
      fetchLibraryData();
    } else {
      navigate('/login'); // Redirect to login if username is not present
    }
  }, [username, navigate]); // Dependency array includes username, navigate, and location
  const gotolibrary = () =>{
    navigate('/library');

  }
  const gotoAccount = () =>{
      navigate('/Account');
  }
  const fetchLibraryData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/${username}/library`);
      setLibraryChats(res.data.library_chat_data); // Set the library chats data
      setLibrarySummary(res.data.library_search_data); // Set the library chats data
      setLibraryDocs(res.data.library_doc_data); // Set the library chats data
    } catch (err) {
      console.error("Error fetching recent chats:", err);
    }
  };

  const toggleModal1 = () => {
    setModal1Visible(!modal1Visible);
    if (!modal1Visible) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  };
  const toggleModal2 = () => {
    setModal2Visible(!modal2Visible);
    if (!modal2Visible) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  };
  const toggleModal3 = () => {
    setModal3Visible(!modal3Visible);
    if (!modal3Visible) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Truncate and add ellipsis
    }
    return text; // Return the original text if it's within the word limit
  };

  const selectChat = (query, response) => {
    
    setModal1Visible(false); // Close the modal
    setSelectedChat("Query:"+query+"\n"+"Response:"+response); // Set the selected chat
    console.log("Selected chat:", "Query:"+query+"\n"+"Response:"+response); // Log the selected chat query); // Log the selected chat query
  };
  const selectSummary = (query, response) => {
    setModal2Visible(false); // Close the modal
    setSelectedSummary("Query:"+query+"\n"+"Response:"+response); // Set the selected summary
    console.log("Selected summary:", "Query:"+query+"\n"+"Response:"+response); // Log the selected summary query); // Log the selected summary query
  };
  const selectDoc = (doc) => {
    setModal3Visible(false); // Close the modal
    setSelectedDoc("Previous Generated Doc:"+doc); // Set the selected chat
    console.log("Selected doc:", "Previous Doc:"); // Log the selected doc query); // Log the selected doc query
  };

  const Generate = async (e) => {
    e.preventDefault();
    
    // setError(null);

    try {
      const res = await axios.post(
        `http://127.0.0.1:5000/generate_document`,
        { chat_data: selectedChat,
          summary_data: selectedSummary,
          doc_data: selectedDoc
        }
      );

      const generated_doc = res.data.document_content; // Construct new chat data
      navigate('/DocFormat', { state: { generated_doc:generated_doc } }); // Redirect to DocFormat with generated document contentgenerated_doc } }); // Redirect to DocFormat with generated document content
    } catch (err) {
      console.log("An error occurred while generating doc.");
      
    }
  };

  return (
    <div className="containerr">
      <div className="sidebar">
        <div className="List">
          <div className="List-il">
            <button className="Ssidebar-button" onClick={gotoAccount}>
              {" "}
              Account
            </button>
            <button className="Ssidebar-button" onClick={gotolibrary}>
              Library
            </button>

            <button className="Ssidebar-button" onClick={gotolibrary}>
              Saved Chats
            </button>
          </div>
          <div className="il">
            <button className="Ssidebar-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="mainbar">
        <h1 className="TitleDashboard">Legal Document Generator</h1>
        <p>Create professional legal documents for commercial court cases</p>
        <div className="save">
          <div className="SavedChat">
            <h1 className="title">Saved Chats</h1>
            <div className="Popup">
              <button onClick={toggleModal1} className="btn-modal">Open</button>
              {modal1Visible && (
                <div className="modal">
                  <div onClick={toggleModal1} className="overlay"></div>
                  <div className="modal-content">
                    <div><h2>Select </h2></div>
                    <div className="horizontal">
                      {libraryChats.map(chat => (
                        <div className="card" key={chat.chat_id}>
                          <h2 className='card-title'><ReactMarkdown>{chat.query}</ReactMarkdown></h2>
                          <div className='B'>
                            <p className='card-des'><ReactMarkdown>{truncateText(chat.response, 20)}</ReactMarkdown></p> {/* Limit to 20 words */}
                          </div>
                          <button 
                            className="buttonn" 
                            onClick={() => selectChat(chat.query, chat.response)}>
                            Select
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="close-modal" onClick={toggleModal1}>
                      CLOSE
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </div>

          <div className="SavedChat">
            <h1 className="title">Saved Summary</h1>
            <div className="Popup">
            <button onClick={toggleModal2} className="btn-modal">Open</button>
            {modal2Visible && (
              <div className="modal">
                <div onClick={toggleModal2} className="overlay"></div>
                <div className="modal-content">
                  <div><h2>Select </h2></div>
                  <div className="horizontal">
                      
                  {librarySummary.map(search => (
                      <div className="card" key={search.search_id}>
                          <h2 className='card-title'><ReactMarkdown>{search.query}</ReactMarkdown></h2>
                          <div className='B'>
                              <p className='card-des'><ReactMarkdown>{truncateText(search.response, 20)}</ReactMarkdown></p> {/* Limit to 20 words */}
                          </div>
                          <button 
                            className="buttonn" 
                            onClick={() => selectSummary(search.query, search.response)}>
                            Select
                          </button>
                      </div>
                    ))}</div>
                  <button className="close-modal" onClick={toggleModal2}>
                    CLOSE
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
          <div className="SavedChat">
            <h1 className="title">Previously Generated Doc</h1>
            <div className="Popup">
            <button onClick={toggleModal3} className="btn-modal">Open</button>

            {modal3Visible && (
              <div className="modal">
                <div onClick={toggleModal3} className="overlay"></div>
                <div className="modal-content">
                  <div><h2>Select </h2></div>
                  <div className="horizontal">
                      
                      {libraryDocs.map(doc => (
                      <div className="card" key={doc.doc_id}>
                          <h2 className='card-title'><ReactMarkdown>{String(doc.doc_id)}</ReactMarkdown></h2>
                          <div className='B'>
                              <p className='card-des'><ReactMarkdown>{truncateText(doc.generated_doc, 20)}</ReactMarkdown></p> {/* Limit to 20 words */}
                          </div>
                          <button 
                            className="buttonn" 
                            onClick={() => selectDoc(doc.generated_doc)}>
                            Select
                          </button>
                      </div>
                    ))}</div>
                  <button className="close-modal" onClick={toggleModal3}>
                    CLOSE
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>

          <div className="hui">
            <button className="Generate" onClick={Generate}>Generate Doc</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doc;
