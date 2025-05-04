// App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Pages/UserContext'; // Corrected import path
import Home from './Pages/Dashboard';
import Main from './Pages/Home';
import Library from './Pages/library';
import Doc from './Pages/Doc';
import DocFormat from './Pages/DocFormat';
import History from './Pages/History'; 
import LoginSig from './Pages/LoginSig';
import SignUp from './Pages/SignUp';
import Discussion from './Pages/Chatbot';
import Dashboard from './Pages/Dashboard';
import Decision from './Pages/Decision';
import Account from './Pages/Account';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/history" element={<History />} />
          <Route path="/Chatbot" element={<Discussion />} />
          <Route path="/Decision" element={<Decision />} />
          <Route path="/DocFormat" element={<DocFormat />} />
          <Route path="/Doc" element={<Doc/>} />
          <Route path="/Home" element={<Main/>} />
          <Route path="/Account" element={<Account/>} />


          
          <Route path="/login" element={<LoginSig />} />
          <Route path="/signup" element={<SignUp />} />
          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
