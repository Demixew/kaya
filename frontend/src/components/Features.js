import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      icon: '📚',
      title: 'Организация',
      description: 'Создавайте структурированные заметки и базы данных для всего'
    },
    {
      icon: '🎨',
      title: 'Дизайн',
      description: 'Красивый и интуитивный интерфейс для комфортной работы'
    },
    {
      icon: '🔗',
      title: 'Связи',
      description: 'Свяжите идеи вместе и создавайте сложные системы'
    },
    {
      icon: '⚡',
      title: 'Быстрота',
      description: 'Молниеносная работа с любым объемом информации'
    }
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2>Почему выбирают Notion?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
