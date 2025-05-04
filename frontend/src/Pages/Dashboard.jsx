import { useEffect, useContext, useState } from "react";
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import ReactMarkdown from 'react-markdown';
import axios from "axios"; // Import axios for API calls
import "./Dashboard.css";
import Search from "../Components/Search";

const Dashboard = () => {
    const { username, logout } = useContext(UserContext); 
    const navigate = useNavigate(); // Initialize useNavigate hook for redirection
    const [recentChats, setRecentChats] = useState([]); // State to hold recent chats data
    const handleLogout = () => {
        axios.get(`http://127.0.0.1:5000/api/logout`); // Use parameters in the API endpoint
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to login page after logout
      };

    // Check if the username is available; if not, redirect to the login page
    useEffect(() => {
        if (!username) {
            navigate('/login'); // Redirect to login if username is not present
        } else {
            // Fetch recent chats if username is present
            fetchRecentChats();
        }
    }, [username, navigate]); // Dependency array includes username and navigate

    // Function to fetch recent chats
    const fetchRecentChats = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/api/${username}/recent_chats`);
            setRecentChats(res.data.recent_chats); // Set the recent chats data
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
    function gotolibrary(){
        navigate('/library');

    }
    function gotoAccount(){
        navigate('/Account');
    }

    return (
        <>
            {username && ( // Render only if the username is available
                <div>
                    <div className="containewwr">
                        <div className="ssidebar" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                            <div className="LList">
                                <div className="LList-il">
                                    <div className="usser">
                                        <div className="userphoto"></div>
                                        <p className="P3">Name: {username}</p>
                                        <p className="P3">Profession: Frontend Dev</p>
                                    </div>
                                    <button className="Ssidebar-button" onClick={gotoAccount} > Account
                                    </button>
                                    <button className="Ssidebar-button" onClick={gotolibrary} >Library
                                    </button>
                                    
                                    <button className="Ssidebar-button" onClick={gotolibrary}>Saved Chats
                                    </button>
                                </div>
                                <div className="il">
                                <button className="Ssidebar-button" onClick={handleLogout}>Log out
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="Mmainbar" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                            <h1 className="TitleDashboard">Dashboard</h1>
                            <div className="barnav">
                                <Search/>
                            </div>
                            <div className="maincontain">
                                
                                    <div className="block">
                                        <h1 className="heading">Recent Chats</h1>
                                        <div className="Chats">
                                            {recentChats.map(chat => (
                                                <div className="card" key={chat.chat_id}>
                                                    <h2 className='card-title'><ReactMarkdown>{chat.query}</ReactMarkdown></h2>
                                                    <div className='B'>
                                                        <p className='card-des'><ReactMarkdown>{truncateText(chat.response, 20)}</ReactMarkdown></p> {/* Limit to 20 words */}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="block">
                                        <h1 className="heading">Library</h1>
                                        <div>
                                            <button className="ccard" onClick={gotolibrary}>
                                                <h2 className='ccard-title'>Saved Summary</h2>
                                            </button>
                                            <button className="ccard" onClick={gotolibrary}>
                                                <h2 className='ccard-title'>Saved Chats</h2>
                                            </button>
                                            <button className="ccard" onClick={gotolibrary}>
                                                <h2 className='ccard-title'>Generated Docs</h2>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
        </>
    );
};

export default Dashboard;
