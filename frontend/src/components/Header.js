import React from 'react';
import './Header.css';

function Header({ onRegisterClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">📔</span>
          <span className="logo-text">Notion</span>
        </div>
        <nav className="nav">
          <a href="#features">Особенности</a>
          <a href="#about">О нас</a>
          <a href="#contact">Контакты</a>
        </nav>
        <button className="register-btn" onClick={onRegisterClick}>
          Регистрация
        </button>
      </div>
    </header>
  );
}

export default Header;
