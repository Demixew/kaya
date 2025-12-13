import React from 'react';
import './Hero.css';

function Hero({ onRegisterClick }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Организуй свою жизнь легко и просто
        </h1>
        <p className="hero-subtitle">
          Notion - это мощный инструмент для создания заметок, планирования и организации всей вашей информации в одном месте.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={onRegisterClick}>
            Начать бесплатно
          </button>
          <button className="btn-secondary">
            Узнать больше
          </button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-decoration">
          <div className="shape shape-1">📝</div>
          <div className="shape shape-2">✅</div>
          <div className="shape shape-3">💡</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
