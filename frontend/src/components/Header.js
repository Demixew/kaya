import React from 'react';
import './Header.css';

function Header({ onRegisterClick }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => scrollToSection('home')}>
          <span className="logo-text">Kaya</span>
        </div>
        <div className="header-right">
          <nav className="nav">
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Особенности</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Тарифы</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>О сервисе</a>
          </nav>
          <button className="login-btn" onClick={() => alert('Вход в систему')}>
            Вход
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
