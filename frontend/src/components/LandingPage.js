import React, { useState } from 'react';
import './LandingPage.css';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import About from './About';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';
import TermsOfService from './TermsOfService';

function LandingPage({ userToken }) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleOpenRegistration = () => {
    setShowRegistration(true);
    setShowLogin(false);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  const handleSwitchToLogin = () => {
    setShowRegistration(false);
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleSwitchToRegistration = () => {
    setShowLogin(false);
    setShowRegistration(true);
  };

  const handleShowTerms = () => {
    setShowTerms(true);
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
  };

  return (
    <div className="landing-page" id="home">
      <Header 
        onRegisterClick={handleOpenRegistration} 
        userToken={userToken}
      />
      <Hero 
        onRegisterClick={handleOpenRegistration}
      />
      <About />
      <Features />
      <Pricing />
      {showRegistration && (
        <RegistrationModal 
          onClose={handleCloseRegistration}
          onSwitchToLogin={handleSwitchToLogin}
          onShowTerms={handleShowTerms}
        />
      )}
      {showLogin && (
        <LoginModal 
          onClose={handleCloseLogin}
          onSwitchToRegistration={handleSwitchToRegistration}
          onShowTerms={handleShowTerms}
        />
      )}
      {showTerms && (
        <TermsOfService 
          onClose={handleCloseTerms}
        />
      )}
    </div>
  );
}

export default LandingPage;
