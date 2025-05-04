import { useEffect, useContext, useState } from "react";
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from "axios"; // Import axios for API calls
import "./Dashboard.css";
import "./Account.css";

const Dashboard = () => {
    const [userData, setUserData] = useState(null); // Initialize userData as null
    const { username, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get(`http://127.0.0.1:5000/api/logout`);
        logout();
        navigate('/login');
    };

    useEffect(() => {
        if (!username) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, [username, navigate]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/${username}/dashboard`);
            console.log(response.data);
            setUserData(response.data.user_data); // Set userData state with API response
        } catch (error) {
            console.error(error);
        }
    };

    function gotolibrary() {
        navigate('/library');
    }
    
    function gotoAccount() {
        navigate('/Account');
    }

    return (
        <>
            {username && (
                <div>
                    <div className="containerr">
                        <div className="sidebar">
                            <div className="List">
                                <div className="List-il">
                                    <div className="usser">
                                        <div className="userphoto"></div>
                                        {userData ? ( // Conditionally render user data
                                            <>
                                                <p className="P3">Name: {userData.first_name} {userData.last_name}</p>
                                                <p className="P3">Profession: {userData.profession}</p>
                                            </>
                                        ) : (
                                            <p>Loading user data...</p>
                                        )}
                                    </div>
                                    <button className="sidebar-button" onClick={gotoAccount}>Account</button>
                                    <button className="sidebar-button" onClick={gotolibrary}>Library</button>
                                    <button className="sidebar-button" onClick={gotolibrary}>Saved Chats</button>
                                </div>
                                <div className="il">
                                    <button className="sidebar-button" onClick={handleLogout}>Log out</button>
                                </div>
                            </div>
                        </div>
                        {userData ? ( // Conditionally render user data
                            <>
                            <div className="mainbar">
                                <h1 className="TitleDashboard">Account</h1>
                                <div className="main">
                                    <div className="useerphoto"></div>
                                    <div className="Div">
                                        <p className="P4">Name: {userData.first_name} {userData.last_name}</p>
                                    </div>
                                    <div className="Div">
                                        <p className="P4">Email: {userData.email}</p>
                                    </div>
                                    <div className="Div">
                                        <p className="P4">DOB: {userData.dob}</p>
                                    </div>
                                    <div className="Div">
                                        <p className="P4">Profession: {userData.profession}</p>
                                    </div>
                                    <div className="Div">
                                        <p className="P4">Gender: {userData.gender}</p>
                                    </div>
                                    <div className="Div">
                                        <p className="P4">Bio: {userData.bio}</p>
                                    </div>
                                </div>
                            </div>
                            </>
                            ) : (
                            <p>Loading user data...</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
