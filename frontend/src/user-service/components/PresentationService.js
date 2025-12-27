import React, { useState } from 'react';
import './PresentationService.css';

const PresentationService = ({ title = 'Презентации', description = 'Создавайте красивые презентации' }) => {
  const [presentations] = useState([
    {
      id: 1,
      title: 'Q4 Отчет',
      slides: 12,
      date: '23 декабря 2025',
      thumbnail: '#e3f2fd'
    },
    {
      id: 2,
      title: 'Новый проект',
      slides: 8,
      date: '22 декабря 2025',
      thumbnail: '#fff3e0'
    },
    {
      id: 3,
      title: 'Продуктовая стратегия',
      slides: 15,
      date: '21 декабря 2025',
      thumbnail: '#e8f5e9'
    }
  ]);

  const templates = [
    { id: 1, name: 'Классический', color: '#667eea' },
    { id: 2, name: 'Минимализм', color: '#764ba2' },
    { id: 3, name: 'Корпоративный', color: '#22c55e' },
    { id: 4, name: 'Креативный', color: '#ef4444' }
  ];

  return (
    <div className="presentation-service">
      <div className="presentations-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="presentations-content">
        <div className="templates-section">
          <h2>Шаблоны</h2>
          <div className="templates-grid">
            {templates.map((template) => (
              <div key={template.id} className="template-card">
                <div className="template-preview" style={{ backgroundColor: template.color }}>
                  <div className="slide-placeholder">
                    <h3>Заголовок слайда</h3>
                    <p>Текст слайда...</p>
                  </div>
                </div>
                <div className="template-info">
                  <h4>{template.name}</h4>
                  <button className="template-btn">Использовать</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-presentations">
          <h2>Мои презентации</h2>
          <div className="presentations-grid">
            {presentations.map((pres) => (
              <div key={pres.id} className="presentation-card">
                <div className="presentation-thumbnail" style={{ backgroundColor: pres.thumbnail }}>
                  <div className="slide-count">{pres.slides} слайдов</div>
                </div>
                <div className="presentation-info">
                  <h3>{pres.title}</h3>
                  <p className="presentation-date">{pres.date}</p>
                  <div className="presentation-actions">
                    <button className="pres-action">Редактировать</button>
                    <button className="pres-action">Просмотр</button>
                    <button className="pres-action">Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationService;