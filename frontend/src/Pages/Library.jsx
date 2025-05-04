import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import ReactMarkdown from "react-markdown";
import axios from "axios"; // Import axios for API calls
// Library.jsx
import "./Library.css";
import Cards from "/src/Components/Cards.jsx";

const Library = () => {
  const { username } = useContext(UserContext); // Access the username from context
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection
  const [libraryChats, setLibraryChats] = useState([]); // State to hold recent chats data
  const [librarySummary, setLibrarySummary] = useState([]); // State to hold recent chats data
  const [libraryDocs, setLibraryDocs] = useState([]); // State to hold recent chats data

  // Check if the username is available; if not, redirect to the login page
  useEffect(() => {
    if (!username) {
      navigate("/login"); // Redirect to login if username is not present
    } else {
      // Fetch recent chats if username is present
      fetchLibraryData();
    }
  }, [username, navigate]); // Dependency array includes username and navigate

  // Function to fetch recent chats
  const fetchLibraryData = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/${username}/library`
      );
      setLibraryChats(res.data.library_chat_data); // Set the recent chats data
      setLibrarySummary(res.data.library_search_data); // Set the recent chats data
      setLibraryDocs(res.data.library_doc_data); // Set the recent chats data
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
    <div className="Hi">
      <h1 className="H11">Library</h1>
      <div className="conteainer">
        <div className="Saved">
          <div className="block">
            <h1 className="heading">Saved Chats</h1>
            <div className="savedchats">
              {libraryChats.map((chat) => (
                <div className="card" key={chat.chat_id}>
                  <h2 className="card-title">
                    <ReactMarkdown>{chat.query}</ReactMarkdown>
                  </h2>
                  <div className="B">
                    <p className="card-des">
                      <ReactMarkdown>
                        {truncateText(chat.response, 20)}
                      </ReactMarkdown>
                    </p>{" "}
                    {/* Limit to 20 words */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="Saved">
          <div className="block">
            <h1 className="heading">Saved Summary</h1>
            <div className="savedchats">
              {librarySummary.map((summary) => (
                <div className="card" key={summary.search_id}>
                  <h2 className="card-title">
                    <ReactMarkdown>{summary.query}</ReactMarkdown>
                  </h2>
                  <div className="B">
                    <p className="card-des">
                      <ReactMarkdown>
                        {truncateText(summary.response, 20)}
                      </ReactMarkdown>
                    </p>{" "}
                    {/* Limit to 20 words */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="Saved">
          <div className="block">
            <h1 className="heading">Generated Docs</h1>
            <div className="savedchats">
              {libraryDocs.map((doc) => (
                <div className="card" key={doc.doc_id}>
                  <h2 className="card-title">
                  <ReactMarkdown>{`Document ID: ${doc.doc_id}`}</ReactMarkdown>

                  </h2>
                  <div className="B">
                    <p className="card-des">
                      <ReactMarkdown>
                        {truncateText(doc.generated_doc, 20)}
                      </ReactMarkdown>
                    </p>{" "}
                    {/* Limit to 20 words */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
