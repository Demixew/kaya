import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import LoginRegister from './components/LoginRegister';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || null);

  const handleBackClick = () => {
    setCurrentPage('landing');
  };

  const handleLoginSuccess = (token) => {
    setUserToken(token);
    setCurrentPage('landing');
  };

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage userToken={userToken} />
      ) : (
        <LoginRegister 
          onLoginSuccess={handleLoginSuccess} 
          onBackClick={handleBackClick}
        />
      )}
    </>
  );
}

export default App;
