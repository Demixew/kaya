import React, { useState } from 'react';
import './LoginRegister.css';

function LoginRegister({ onLoginSuccess, onBackClick }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateLoginForm = () => {
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

  const validateRegisterForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Пожалуйста, введите имя пользователя';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email некорректен';
    }

    if (!formData.password) {
      newErrors.password = 'Пожалуйста, введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        onLoginSuccess(data.token);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Ошибка при входе' });
      }
    } catch (error) {
      setErrors({ submit: 'Не удалось подключиться к серверу' });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        onLoginSuccess(data.token);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Ошибка при регистрации' });
      }
    } catch (error) {
      setErrors({ submit: 'Не удалось подключиться к серверу' });
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="login-register-container">
      <button className="back-button" onClick={onBackClick}>← Назад</button>
      
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Войдите в свой аккаунт' 
              : 'Создайте новый аккаунт'}
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              {isLogin ? 'Имя пользователя' : 'Имя пользователя'}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={isLogin ? 'akishkin' : 'Ваше имя'}
              disabled={isLoading}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                disabled={isLoading}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button" 
            disabled={isLoading}
          >
            {isLoading 
              ? (isLogin ? 'Вход...' : 'Регистрация...') 
              : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
            <button 
              type="button" 
              className="toggle-button"
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isLogin ? 'Регистрация' : 'Вход'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
