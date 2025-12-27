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

function LandingPage({ userToken, onLogin }) {
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

  const handleLoginSuccess = (userData) => {
    // Сохраняем данные пользователя в localStorage для персистентности
    localStorage.setItem('user', JSON.stringify(userData));
    // Вызываем функцию из AppRouter для установки состояния
    if (onLogin) {
      onLogin(userData);
    }
    // Закрываем модальные окна
    setShowLogin(false);
    setShowRegistration(false);
  };

  const handleRegistrationSuccess = (userData) => {
    // Сохраняем данные пользователя в localStorage для персистентности
    localStorage.setItem('user', JSON.stringify(userData));
    // Вызываем функцию из AppRouter для установки состояния
    if (onLogin) {
      onLogin(userData);
    }
    // Закрываем модальные окна
    setShowLogin(false);
    setShowRegistration(false);
  };

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowRegistration(false);
  };

  // Проверяем, есть ли сохраненный пользователь в localStorage
  const savedUser = localStorage.getItem('user');
  const currentUser = savedUser ? JSON.parse(savedUser) : null;

  // Если пользователь уже авторизован, перенаправляем на сервис
  if (currentUser) {
    // Перенаправляем на сервис
    window.location.href = '/app';
    return null;
  }

  return (
    <div className="landing-page" id="home">
      <Header 
        onRegisterClick={handleOpenRegistration} 
        userToken={currentUser}
        onLogin={handleOpenLogin}
      />
      <Hero />
      <About />
      <Features />
      <Pricing />
      {showRegistration && (
        <RegistrationModal 
          onClose={handleCloseRegistration}
          onSwitchToLogin={handleSwitchToLogin}
          onShowTerms={handleShowTerms}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
      {showLogin && (
        <LoginModal 
          onClose={handleCloseLogin}
          onSwitchToRegistration={handleSwitchToRegistration}
          onShowTerms={handleShowTerms}
          onLoginSuccess={handleLoginSuccess}
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
