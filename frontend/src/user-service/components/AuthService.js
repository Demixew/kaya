import React, { useState } from 'react';
import './AuthService.css';

const AuthService = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Простая валидация
    if (isLogin) {
      if (email && password) {
        onLogin({ email, name: email.split('@')[0] });
      }
    } else {
      if (email && password && name) {
        onLogin({ email, name });
      }
    }
  };

  return (
    <div className="auth-service">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Kaya</h1>
          <p>Офисный редактор для современных команд</p>
        </div>

        <div className="auth-form">
          <div className="auth-toggle">
            <button 
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Войти
            </button>
            <button 
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
              </div>
            )}
            
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
              />
            </div>

            <button type="submit" className="auth-submit">
              {isLogin ? 'Войти в систему' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Демо-режим: используйте любые данные для входа</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthService;