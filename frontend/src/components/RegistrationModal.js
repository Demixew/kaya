import React, { useState } from 'react';
import './RegistrationModal.css';

function RegistrationModal({ onClose, onSwitchToLogin, onShowTerms }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Проверяем поле в реальном времени
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Пожалуйста, введите ваше имя';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Пожалуйста, введите email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Email должен быть в формате example@domen.com';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Пожалуйста, введите пароль';
        } else {
          const passwordValidation = validatePassword(value);
          if (!passwordValidation.valid) {
            newErrors.password = passwordValidation.message;
          } else {
            delete newErrors.password;
          }
        }
        // Также проверяем совпадение паролей если введен confirmPassword
        if (formData.confirmPassword && formData.confirmPassword !== value) {
          newErrors.confirmPassword = 'Пароли не совпадают';
        } else if (formData.confirmPassword && formData.confirmPassword === value) {
          delete newErrors.confirmPassword;
        }
        break;

      case 'confirmPassword':
        if (formData.password !== value) {
          newErrors.confirmPassword = 'Пароли не совпадают';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    // Имя
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email должен быть в формате example@domen.com';
    }

    // Пароль
    if (!formData.password) {
      newErrors.password = 'Пожалуйста, введите пароль';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message;
      }
    }

    // Подтверждение пароля
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Пожалуйста, подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length > 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    };

    const allValid = Object.values(requirements).every(req => req);

    if (allValid) {
      return { valid: true };
    }

    const messages = [];
    if (!requirements.length) messages.push('минимум 8 символов');
    if (!requirements.lowercase) messages.push('строчные буквы (a-z)');
    if (!requirements.uppercase) messages.push('заглавные буквы (A-Z)');
    if (!requirements.number) messages.push('цифры (0-9)');
    if (!requirements.special) messages.push('спец. символы (!@#$%^&* и т.д.)');

    return {
      valid: false,
      message: `Пароль должен содержать: ${messages.join(', ')}`
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Регистрация:', formData);
      alert('Спасибо за регистрацию! Мы отправили вам письмо подтверждения.');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2>Присоединяйся к нам</h2>
        <p className="modal-subtitle">Создай аккаунт и начни организовывать свою жизнь</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Ваше имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван Петров"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Зарегистрироваться
          </button>

          <p className="terms">
            Уже есть аккаунт? <a href="#login" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Войти</a>
          </p>

          <p className="terms">
            Нажимая кнопку, вы принимаете наши <a href="#terms" onClick={(e) => { e.preventDefault(); onShowTerms(); }}>Условия использования</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationModal;
