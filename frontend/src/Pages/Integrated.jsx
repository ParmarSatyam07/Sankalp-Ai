import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Home.css";
import "./History.css";

export default function Integrated() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [librarySummary, setLibrarySummary] = useState([]);

  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/login");
    } else {
      fetchLibraryData();
    }
  }, [username, navigate]);

  const fetchLibraryData = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/${username}/library`
      );
      setLibrarySummary(res.data.library_search_data);
    } catch (err) {
      console.error("Error fetching library data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/search_and_summarize`,
        {
          params: { query: query },
        }
      );
      setResponse(res.data);
      setShowSummary(true);
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSummary = async () => {
    if (username) {
      try {
        await axios.post(
          `http://127.0.0.1:5000/api/${username}/library/save_search`,
          { query: query, response: response }
        );
        alert("Summary saved successfully!");
        fetchLibraryData(); // Refresh the library data
      } catch (err) {
        console.error("Error saving Summary:", err);
        alert("Failed to save summary. Please try again.");
      }
    } else {
      navigate("/login");
    }
  };

  // Function to handle the "Chat with Summary" button click
  const handleChatWithSummary = async () => {
    if (username) {
      try {
        // Sending a POST request without any parameters
        const res = await axios.post(`http://127.0.0.1:5000/api/${username}/chats`);
  
        // setChatResponse(res.data); // Store the chat response
        navigate('/Chatbot', {state:{chatroom_id:res.data.chatroom_id}}); // Redirect to the chat page with the chat ID and username
      } catch (err) {
        setError('An error occurred while chatting with the summary.');
        console.error(err); // Log the error for debugging
      }    
      
    }else{
      navigate('/login'); // Redirect to login page if username is not available
    }
    
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <div className="container">
      {!showSummary ? (
        <>
          <div className="backgroundImage">
            <div className="text">
              <h1 className="H1">
                The fastest way to find commercial court cases
              </h1>
              <p className="P1">
                Streamline your commercial court research with AI
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="Searchbar">
                <input
                  type="text"
                  placeholder="  Enter your query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="query-input"
                />
                <button type="submit" className="submit-button">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="bookmark">
            <h1 className="H2">Bookmarked Summary</h1>
            <div className="cardss">
              {librarySummary.map((search) => (
                <div className="card" key={search.search_id}>
                  <h2 className="card-title">
                    <ReactMarkdown>{search.query}</ReactMarkdown>
                  </h2>
                  <div className="B">
                    <p className="card-des">
                      <ReactMarkdown>
                        {truncateText(search.response, 20)}
                      </ReactMarkdown>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="app-container">
          <div className="navbarContainer">
            <form onSubmit={handleSubmit}>
              <div className="Searchbar">
                <input
                  type="text"
                  placeholder="  Enter your query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="query-input"
                />
                <button type="submit" className="submit-button">
                  Search
                </button>
              </div>
            </form>
            <button className="Decision-button">Decision Facilitator</button>
            <div className="user">
              <h3 className="profilepic">Profile pic</h3>
            </div>
          </div>
          <div className="SummaryDiv">
            {loading && <p className="error-message">Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {response && response.summary && (
              <>
                <div className="response-container-1">
                  <div className="summarycontainer">
                    <text>Summary</text>
                    <button
                      className="ChatWith"
                      onClick={handleChatWithSummary}
                    >
                      Chat with Summary
                    </button>
                  </div>
                  <p><ReactMarkdown>{response.summary}</ReactMarkdown></p>
                  <button
                    type="submit"
                    className="savechat"
                    onClick={handleSaveSummary}
                  >
                    Save Summary
                  </button>
                </div>
                <div className="SourcesLocalized">
                  <div className="Response">
                    <div className="response-container-2">
                      <text className="Sources">Sources</text>
                      <ul className="links-list">
                        {response.links.map((linkItem, index) => (
                          <li key={index}>
                            <a
                              href={linkItem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {linkItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="response-container-3">
                      <text className="Sources">Localized</text>
                      <ul className="links-list">
                        {response.links.map((linkItem, index) => (
                          <li key={index}>
                            <a
                              href={linkItem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {linkItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
