import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ onClose, onSwitchToRegistration, onShowTerms, onLoginSuccess }) {
  // Если onSwitchToRegistration не передана, создаем заглушку
  const handleSwitchToRegistration = onSwitchToRegistration || (() => {});
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Пожалуйста, введите имя пользователя';
    }

    if (!formData.password) {
      newErrors.password = 'Пожалуйста, введите пароль';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Вход:', formData);
      alert('Спасибо за вход! Добро пожаловать!');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2>Добро пожаловать!</h2>
        <p className="modal-subtitle">Войдите в свой аккаунт</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ваше имя"
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Войти
          </button>

          <p className="terms">
            Нет аккаунта? <a href="#register" onClick={(e) => { e.preventDefault(); handleSwitchToRegistration(); }}>Зарегистрироваться</a>
          </p>

          <p className="terms">
            Нажимая кнопку, вы принимаете наши <a href="#terms" onClick={(e) => { e.preventDefault(); onShowTerms(); }}>Условия использования</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
