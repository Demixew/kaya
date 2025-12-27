import React, { useState } from 'react';
import './ProfileService.css';

const ProfileService = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '👤',
    bio: user?.bio || '',
    position: user?.position || 'Product Manager',
    phone: user?.phone || '+7 (900) 000-00-00',
    location: user?.location || 'Москва, Россия'
  });

  const [teams] = useState([
    {
      id: 1,
      name: 'Design Team',
      role: 'Designer',
      members: 8,
      avatar: '🎨',
      description: 'Команда дизайнеров и UX специалистов'
    },
    {
      id: 2,
      name: 'Development',
      role: 'Team Lead',
      members: 15,
      avatar: '💻',
      description: 'Backend и frontend разработчики'
    },
    {
      id: 3,
      name: 'Product & Strategy',
      role: 'Member',
      members: 12,
      avatar: '📊',
      description: 'Стратегия продукта и аналитика'
    },
    {
      id: 4,
      name: 'Marketing',
      role: 'Stakeholder',
      members: 6,
      avatar: '📢',
      description: 'Маркетинг и коммуникация'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (emoji) => {
    setFormData({ ...formData, avatar: emoji });
  };

  const handleSave = () => {
    onUpdateUser({
      ...user,
      ...formData
    });
    setIsEditing(false);
  };

  const avatarOptions = ['👤', '😊', '🧑', '👨', '👩', '🧑‍💼', '👨‍💼', '👩‍💼', '🧑‍🎓', '👨‍🎓', '👩‍🎓'];

  return (
    <div className="profile-service">
      <div className="profile-header">
        <h1>Мой профиль</h1>
        <p>Управляйте информацией о профиле и командами</p>
      </div>

      <div className="profile-content">
        {/* Профиль */}
        <div className="profile-card main-profile">
          <div className="profile-top">
            <div className="profile-avatar-large">{formData.avatar}</div>
            <div className="profile-info-main">
              <h2>{formData.name}</h2>
              <p className="profile-position">{formData.position}</p>
              <p className="profile-email">{formData.email}</p>
            </div>
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '✕ Отмена' : '✎ Редактировать'}
            </button>
          </div>

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Аватар</label>
                <div className="avatar-selector">
                  {avatarOptions.map((emoji) => (
                    <button
                      key={emoji}
                      className={`avatar-option ${formData.avatar === emoji ? 'selected' : ''}`}
                      onClick={() => handleAvatarChange(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Должность</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Местоположение</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>О себе</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Расскажите о себе..."
                  rows="4"
                />
              </div>

              <div className="form-buttons">
                <button className="save-btn" onClick={handleSave}>
                  💾 Сохранить
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">📱 Телефон:</span>
                <span className="detail-value">{formData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">📍 Местоположение:</span>
                <span className="detail-value">{formData.location}</span>
              </div>
              {formData.bio && (
                <div className="detail-row full">
                  <span className="detail-label">ℹ️ О себе:</span>
                  <span className="detail-value">{formData.bio}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Команды */}
        <div className="teams-section">
          <h3>Мои команды ({teams.length})</h3>
          <div className="teams-grid">
            {teams.map((team) => (
              <div key={team.id} className="team-card">
                <div className="team-header">
                  <div className="team-avatar">{team.avatar}</div>
                  <div className="team-info">
                    <h4>{team.name}</h4>
                    <p className="team-role">{team.role}</p>
                  </div>
                  <span className="team-members">{team.members}</span>
                </div>
                <p className="team-description">{team.description}</p>
                <div className="team-footer">
                  <button className="team-btn">Просмотреть</button>
                  <button className="team-btn secondary">Оставить</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Рекомендации */}
        <div className="recommendations-section">
          <h3>Другие команды</h3>
          <p className="section-subtitle">Присоединитесь к командам, где вы можете развиваться</p>
          <div className="recommendations-grid">
            {[
              {
                id: 1,
                name: 'Data Analytics',
                avatar: '📈',
                members: 10,
                open: true
              },
              {
                id: 2,
                name: 'Security Team',
                avatar: '🔒',
                members: 7,
                open: true
              },
              {
                id: 3,
                name: 'DevOps',
                avatar: '⚙️',
                members: 5,
                open: false
              }
            ].map((team) => (
              <div key={team.id} className="recommendation-card">
                <div className="rec-header">
                  <span className="rec-avatar">{team.avatar}</span>
                  <h4>{team.name}</h4>
                </div>
                <p className="rec-members">👥 {team.members} участников</p>
                <button className={`rec-btn ${team.open ? 'available' : 'closed'}`}>
                  {team.open ? '+ Присоединиться' : 'Закрыто'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileService;
