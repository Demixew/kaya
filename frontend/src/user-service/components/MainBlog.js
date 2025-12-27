import React from 'react';
import './MainBlog.css';

const MainBlog = () => {
  const recentFiles = [
    {
      id: 1,
      title: 'Идеи для нового проекта',
      type: 'notes',
      date: '2 часа назад',
      icon: '📝',
      preview: 'Брейнсторм и концепции...'
    },
    {
      id: 2,
      title: 'Roadmap на 2025',
      type: 'board',
      date: '4 часа назад',
      icon: '🎨',
      preview: 'Визуальная доска с этапами проекта...'
    },
    {
      id: 3,
      title: 'Дневной фокус',
      type: 'focus',
      date: '1 день назад',
      icon: '⏱️',
      preview: 'Сессия работы: 4 часа...'
    },
    {
      id: 4,
      title: 'Проект: Redesign UI',
      type: 'project',
      date: '2 дня назад',
      icon: '📌',
      preview: 'Главное задание и подзадачи...'
    }
  ];

  const suggestions = [
    {
      id: 1,
      title: 'Начать сессию фокуса',
      description: 'Откройте 25-минутную сессию концентрации с таймером',
      action: 'Начать',
      icon: '⏱️'
    },
    {
      id: 2,
      title: 'Создать новую доску',
      description: 'Разместите идеи визуально как в Miro',
      action: 'Создать',
      icon: '🎨'
    },
    {
      id: 3,
      title: 'Запланировать задачи',
      description: 'Добавьте задачи и отслеживайте прогресс',
      action: 'Добавить',
      icon: '✅'
    }
  ];

  return (
    <div className="main-blog">
      <div className="blog-header">
        <h1>Добро пожаловать в Kaya</h1>
        <p>Система для повышения вашей продуктивности</p>
      </div>

      <div className="blog-content">
        <div className="recent-files">
          <h2>Недавние файлы</h2>
          <div className="files-grid">
            {recentFiles.map((file) => (
              <div key={file.id} className="file-card">
                <div className="file-icon">{file.icon}</div>
                <div className="file-info">
                  <h3>{file.title}</h3>
                  <p className="file-preview">{file.preview}</p>
                  <div className="file-meta">
                    <span className="file-type">{file.type}</span>
                    <span className="file-date">{file.date}</span>
                  </div>
                </div>
                <button className="file-action">Открыть</button>
              </div>
            ))}
          </div>
        </div>

        <div className="suggestions">
          <h2>Предложения</h2>
          <div className="suggestions-grid">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="suggestion-card">
                <div className="suggestion-icon">{suggestion.icon}</div>
                <div className="suggestion-info">
                  <h3>{suggestion.title}</h3>
                  <p>{suggestion.description}</p>
                </div>
                <button className="suggestion-action">{suggestion.action}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-stats">
          <h2>Ваша продуктивность</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">28</div>
              <div className="stat-label">Часов фокуса</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">156</div>
              <div className="stat-label">Задач завершено</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Активных проектов</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">89</div>
              <div className="stat-label">Заметок</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBlog;