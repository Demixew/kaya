import React from 'react';
import './Pricing.css';

function Pricing() {
  const plans = [
    {
      name: 'Бесплатный',
      price: '0',
      description: 'Для личного использования',
      features: [
        '✓ До 5 заметок',
        '✓ Базовое форматирование',
        '✓ Мобильный доступ',
        '✗ Совместная работа',
        '✗ API доступ'
      ],
      popular: false
    },
    {
      name: 'Средний',
      price: '99',
      description: 'Для небольших команд',
      features: [
        '✓ Неограниченные заметки',
        '✓ Продвинутое форматирование',
        '✓ Совместная работа (до 10 человек)',
        '✓ Облачное хранилище 100GB',
        '✗ API доступ'
      ],
      popular: true
    },
    {
      name: 'Профессиональный',
      price: '299',
      description: 'Для больших организаций',
      features: [
        '✓ Все из плана "Средний"',
        '✓ Неограниченное число участников',
        '✓ Облачное хранилище 1TB',
        '✓ API доступ',
        '✓ Приоритетная поддержка 24/7'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <h2>Выбери свой план</h2>
        <p className="pricing-subtitle">Начни с бесплатного плана и переходи на премиум когда будешь готов</p>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Самый популярный</div>}
              
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              
              <div className="price">
                <span className="currency">₽</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/месяц</span>
              </div>

              <button className={`plan-btn ${plan.popular ? 'primary' : 'secondary'}`}>
                Начать
              </button>

              <div className="features-list">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
