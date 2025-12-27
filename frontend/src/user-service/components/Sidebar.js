import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeService, onServiceChange, user, onLogout }) => {
  const services = [
    { id: 'blog', name: 'Главная', icon: '🏠' },
    { id: 'notes', name: 'Заметки', icon: '📝' },
    { id: 'documents', name: 'Доски', icon: '🎨' },
    { id: 'presentations', name: 'Проекты', icon: '📌' },
    { id: 'spreadsheet', name: 'Фокус', icon: '⏱️' },
    { id: 'calendar', name: 'Календарь', icon: '📅' },
    { id: 'tasks', name: 'Задачи', icon: '✅' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Kaya</h2>
        <p>Повышение продуктивности</p>
      </div>
      
      <nav className="sidebar-nav">
        {services.map((service) => (
          <button
            key={service.id}
            className={`nav-item ${activeService === service.id ? 'active' : ''}`}
            onClick={() => onServiceChange(service.id)}
          >
            <span className="nav-icon">{service.icon}</span>
            <span className="nav-text">{service.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="user-profile profile-btn"
          onClick={() => onServiceChange('profile')}
        >
          <span className="profile-icon">{user?.avatar || '👤'}</span>
          <div className="profile-info">
            <span className="profile-name">{user?.name || 'Пользователь'}</span>
            <span className="profile-email">{user?.email}</span>
          </div>
        </button>
        <button className="logout-btn" onClick={onLogout}>Выйти</button>
      </div>
    </div>
  );
};

export default Sidebar;