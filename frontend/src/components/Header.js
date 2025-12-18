import React from 'react';
import './Header.css';

function Header({ onRegisterClick, userToken }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
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
          {userToken ? (
            <>
              <span className="user-info">✓ Вход выполнен</span>
              <button className="login-btn logout-btn" onClick={handleLogout}>
                Выход
              </button>
            </>
          ) : (
            <button className="register-btn" onClick={onRegisterClick}>
              Регистрация
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
