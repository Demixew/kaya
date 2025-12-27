import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import UserServiceApp from './UserServiceApp';
import './AppRouter.css';

const AppRouter = () => {
  const [user, setUser] = useState(() => {
    // Проверяем localStorage при инициализации состояния
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    // Создаем демо-пользователя если нет сохраненного
    const demoUser = {
      email: 'demo@example.com',
      name: 'Demo User',
      isDemo: true
    };
    localStorage.setItem('user', JSON.stringify(demoUser));
    return demoUser;
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app-router">
        <Routes>
          {/* Главная страница (лендинг) */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/app" replace /> : <LandingPage onLogin={handleLogin} />} 
          />
          
          {/* Страница сервиса для залогиненных пользователей */}
          <Route 
            path="/app" 
            element={user ? <UserServiceApp user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} 
          />
          
          {/* Редирект на главную для несуществующих маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;