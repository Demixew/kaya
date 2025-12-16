import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <h2>О сервисе Kaya</h2>
          <p>
            Kaya - это современная платформа для управления информацией и организации работы. 
            Мы создали инструмент, который помогает командам и отдельным пользователям 
            структурировать свои идеи, документы и проекты в одном безопасном месте.
          </p>
          
          <div className="about-features">
            <div className="about-feature">
              <div className="feature-number">1</div>
              <h3>Простота использования</h3>
              <p>Интуитивный интерфейс, который легко освоить за несколько минут</p>
            </div>

            <div className="about-feature">
              <div className="feature-number">2</div>
              <h3>Безопасность</h3>
              <p>Ваши данные защищены максимальным шифрованием и резервными копиями</p>
            </div>

            <div className="about-feature">
              <div className="feature-number">3</div>
              <h3>Командная работа</h3>
              <p>Работайте вместе с командой в реальном времени без ограничений</p>
            </div>

            <div className="about-feature">
              <div className="feature-number">4</div>
              <h3>Всегда с собой</h3>
              <p>Синхронизация на всех устройствах - работайте откуда угодно</p>
            </div>
          </div>

          <div className="about-mission">
            <h3>Наша миссия</h3>
            <p>
              Мы верим, что правильные инструменты могут сделать людей более продуктивными и креативными. 
              Kaya разработан для того, чтобы помочь вам сосредоточиться на важном, 
              а не на управлении информацией.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
