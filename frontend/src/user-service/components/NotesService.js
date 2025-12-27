import React, { useState } from 'react';
import './NotesService.css';

const NotesService = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Важные идеи для проекта',
      content: 'Нужно не забыть про интеграцию с API и добавить валидацию данных...',
      date: 'Сегодня',
      color: '#e3f2fd'
    },
    {
      id: 2,
      title: 'Список дел на завтра',
      content: '1. Проверить email\n2. Встреча с командой\n3. Подготовить отчет',
      date: 'Вчера',
      color: '#fff3e0'
    }
  ]);

  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const colors = ['#e3f2fd', '#fff3e0', '#e8f5e9', '#fce4ec', '#f3e5f5'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: newNote.title,
          content: newNote.content,
          date: 'Только что',
          color: randomColor
        }
      ]);
      setNewNote({ title: '', content: '' });
    }
  };

  return (
    <div className="notes-service">
      <div className="notes-header">
        <h1>Заметки</h1>
        <p>Быстро фиксируйте важные мысли и идеи</p>
      </div>

      <div className="notes-content">
        <div className="notes-sidebar">
          <div className="new-note-form">
            <input
              type="text"
              placeholder="Заголовок заметки"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="note-title-input"
            />
            <textarea
              placeholder="Текст заметки..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="note-content-input"
            />
            <button onClick={addNote} className="add-note-btn">
              Добавить заметку
            </button>
          </div>
        </div>

        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card" style={{ backgroundColor: note.color }}>
              <div className="note-header">
                <h3>{note.title}</h3>
                <span className="note-date">{note.date}</span>
              </div>
              <div className="note-content">
                {note.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="note-actions">
                <button className="note-btn">Редактировать</button>
                <button className="note-btn delete">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesService;