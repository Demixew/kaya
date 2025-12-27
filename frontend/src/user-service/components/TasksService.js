import React, { useState } from 'react';
import './TasksService.css';

const TasksService = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Завершить дизайн UI',
      description: 'Доделать макеты для мобильной версии',
      priority: 'high',
      status: 'in-progress',
      dueDate: '28 декабря 2025',
      assignee: 'Вы',
      subtasks: [
        { id: 1, title: 'Кнопки', completed: true },
        { id: 2, title: 'Формы', completed: false },
        { id: 3, title: 'Навигация', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Встреча с командой',
      description: 'Еженедельная синхронизация',
      priority: 'medium',
      status: 'pending',
      dueDate: '27 декабря 2025',
      assignee: 'Вся команда',
      subtasks: []
    },
    {
      id: 3,
      title: 'Написать документацию',
      description: 'Документация API для нового функционала',
      priority: 'medium',
      status: 'pending',
      dueDate: '30 декабря 2025',
      assignee: 'Вы',
      subtasks: [
        { id: 1, title: 'Endpoints', completed: false },
        { id: 2, title: 'Примеры', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Тестирование релиза',
      description: 'QA тестирование версии 2.0',
      priority: 'high',
      status: 'completed',
      dueDate: '25 декабря 2025',
      assignee: 'QA команда',
      subtasks: []
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        title: newTaskTitle,
        description: '',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date().toLocaleDateString('ru-RU'),
        assignee: 'Вы',
        subtasks: []
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
        : t
    ));
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(t =>
      t.id === taskId
        ? {
            ...t,
            subtasks: t.subtasks.map(st =>
              st.id === subtaskId
                ? { ...st, completed: !st.completed }
                : st
            )
          }
        : t
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return t.status !== 'completed';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f97316';
      case 'low': return '#22c55e';
      default: return '#666';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed': return '✓ Завершено';
      case 'in-progress': return '⏳ В процессе';
      case 'pending': return '○ Ожидание';
      default: return status;
    }
  };

  return (
    <div className="tasks-service">
      <div className="tasks-header">
        <h1>Задачи</h1>
        <p>Управляйте своими задачами и отслеживайте прогресс</p>
      </div>

      <div className="tasks-content">
        <div className="tasks-sidebar">
          <div className="add-task-form">
            <input
              type="text"
              placeholder="Добавить новую задачу..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="task-input"
            />
            <button onClick={addTask} className="add-task-btn">Добавить</button>
          </div>

          <div className="task-filters">
            <h3>Фильтры</h3>
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все ({tasks.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Активные ({tasks.filter(t => t.status !== 'completed').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Завершено ({tasks.filter(t => t.status === 'completed').length})
            </button>
          </div>
        </div>

        <div className="tasks-list">
          {filteredTasks.length === 0 ? (
            <div className="no-tasks">
              <p>📭 Нет задач</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <button 
                    className={`task-checkbox ${task.status === 'completed' ? 'checked' : ''}`}
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.status === 'completed' ? '✓' : ''}
                  </button>
                  <div className="task-title-section">
                    <h3 className={task.status === 'completed' ? 'completed' : ''}>
                      {task.title}
                    </h3>
                    <p className="task-description">{task.description}</p>
                  </div>
                  <button 
                    className="task-delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    ✕
                  </button>
                </div>

                <div className="task-meta">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority === 'high' ? '🔴 Высокий' : task.priority === 'medium' ? '🟠 Средний' : '🟢 Низкий'}
                  </span>
                  <span className="status-badge">{getStatusLabel(task.status)}</span>
                  <span className="due-date">📅 {task.dueDate}</span>
                  <span className="assignee">👤 {task.assignee}</span>
                </div>

                {task.subtasks.length > 0 && (
                  <div className="subtasks">
                    <h4>Подзадачи ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})</h4>
                    <div className="subtasks-list">
                      {task.subtasks.map((subtask) => (
                        <label key={subtask.id} className="subtask-item">
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => toggleSubtask(task.id, subtask.id)}
                          />
                          <span className={subtask.completed ? 'completed' : ''}>
                            {subtask.title}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksService;
