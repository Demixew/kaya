import React, { useState } from 'react';
import './LandingPage.css';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import RegistrationModal from './RegistrationModal';

function LandingPage() {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleOpenRegistration = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  return (
    <div className="landing-page">
      <Header onRegisterClick={handleOpenRegistration} />
      <Hero onRegisterClick={handleOpenRegistration} />
      <Features />
      {showRegistration && (
        <RegistrationModal onClose={handleCloseRegistration} />
      )}
    </div>
  );
}

export default LandingPage;
