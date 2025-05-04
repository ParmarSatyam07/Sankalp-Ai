// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Initialize username from localStorage if available
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');

  // Function to update username
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem('username', newUsername); // Save to localStorage
  };

  // Function to log out and clear username
  const logout = () => {
    setUsername(''); // Clear the username in state
    localStorage.removeItem('username'); // Remove from localStorage
    // Additional logout logic (e.g., redirect) can be added here
  };

  return (
    <UserContext.Provider value={{ username, updateUsername, logout }}>
      {children}
    </UserContext.Provider>
  );
};
