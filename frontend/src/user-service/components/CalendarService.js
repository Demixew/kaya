import React, { useState } from 'react';
import './CalendarService.css';

const CalendarService = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 27)); // 27 декабря 2025
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Встреча с командой',
      date: '2025-12-27',
      time: '10:00',
      duration: '1 hour',
      type: 'meeting',
      description: 'Еженедельная синхронизация'
    },
    {
      id: 2,
      title: 'Дедлайн: Дизайн макетов',
      date: '2025-12-28',
      time: '17:00',
      duration: '0 hours',
      type: 'deadline',
      description: 'Завершить UI макеты'
    },
    {
      id: 3,
      title: 'Сессия фокуса',
      date: '2025-12-29',
      time: '14:00',
      duration: '2 hours',
      type: 'focus',
      description: 'Работа над документацией'
    },
    {
      id: 4,
      title: 'Презентация проекта',
      date: '2025-12-30',
      time: '15:00',
      duration: '1 hour',
      type: 'meeting',
      description: 'Демонстрация новых фич'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '09:00',
    duration: '1 hour',
    type: 'meeting',
    description: ''
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const addEvent = () => {
    if (newEvent.title && selectedDate) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      const event = {
        id: Math.max(...events.map(e => e.id), 0) + 1,
        title: newEvent.title,
        date: dateStr,
        time: newEvent.time,
        duration: newEvent.duration,
        type: newEvent.type,
        description: newEvent.description
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', time: '09:00', duration: '1 hour', type: 'meeting', description: '' });
      setShowEventForm(false);
    }
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const monthName = currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  for (let i = 0; i < firstDay - 1; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'meeting': return '#667eea';
      case 'deadline': return '#dc2626';
      case 'focus': return '#22c55e';
      default: return '#666';
    }
  };

  const getEventTypeLabel = (type) => {
    switch(type) {
      case 'meeting': return 'Встреча';
      case 'deadline': return 'Дедлайн';
      case 'focus': return 'Фокус';
      default: return type;
    }
  };

  return (
    <div className="calendar-service">
      <div className="calendar-header">
        <h1>Календарь</h1>
        <p>Планируйте события и отслеживайте расписание</p>
      </div>

      <div className="calendar-content">
        <div className="calendar-main">
          <div className="month-header">
            <button onClick={previousMonth}>‹</button>
            <h2>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h2>
            <button onClick={nextMonth}>›</button>
          </div>

          <div className="calendar-grid">
            <div className="day-names">
              {dayNames.map((day) => (
                <div key={day} className="day-name">{day}</div>
              ))}
            </div>

            <div className="calendar-days">
              {calendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDate(day) : [];
                const isSelected = day === selectedDate;

                return (
                  <div
                    key={index}
                    className={`calendar-day ${day ? 'active' : 'empty'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <>
                        <div className="day-number">{day}</div>
                        <div className="day-events">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className="event-dot"
                              style={{ backgroundColor: getEventTypeColor(event.type) }}
                              title={event.title}
                            />
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="more-events">+{dayEvents.length - 2}</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calendar-sidebar">
          {selectedDate ? (
            <>
              <div className="selected-date-info">
                <h3>{selectedDate} {monthName.split(' ')[0]}</h3>
                <button 
                  className="add-event-btn"
                  onClick={() => setShowEventForm(!showEventForm)}
                >
                  + Добавить событие
                </button>
              </div>

              {showEventForm && (
                <div className="event-form">
                  <input
                    type="text"
                    placeholder="Название события"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="event-input"
                  />
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="event-input"
                  />
                  <select
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    className="event-input"
                  >
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                    <option>All day</option>
                  </select>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    className="event-input"
                  >
                    <option value="meeting">Встреча</option>
                    <option value="deadline">Дедлайн</option>
                    <option value="focus">Фокус сессия</option>
                  </select>
                  <textarea
                    placeholder="Описание"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="event-input"
                  />
                  <div className="form-buttons">
                    <button onClick={addEvent} className="save-btn">Сохранить</button>
                    <button onClick={() => setShowEventForm(false)} className="cancel-btn">Отмена</button>
                  </div>
                </div>
              )}

              <div className="events-list">
                <h4>События ({getEventsForDate(selectedDate).length})</h4>
                {getEventsForDate(selectedDate).length === 0 ? (
                  <p className="no-events">Нет событий на этот день</p>
                ) : (
                  getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="event-item">
                      <div 
                        className="event-type-indicator"
                        style={{ backgroundColor: getEventTypeColor(event.type) }}
                      />
                      <div className="event-details">
                        <p className="event-title">{event.title}</p>
                        <p className="event-time">{event.time} · {event.duration}</p>
                        <p className="event-type">{getEventTypeLabel(event.type)}</p>
                        {event.description && (
                          <p className="event-description">{event.description}</p>
                        )}
                      </div>
                      <button
                        className="event-delete"
                        onClick={() => deleteEvent(event.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Выберите дату для просмотра событий</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarService;
