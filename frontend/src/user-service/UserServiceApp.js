import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainBlog from './components/MainBlog';
import NotesService from './components/NotesService';
import DocumentService from './components/DocumentService';
import PresentationService from './components/PresentationService';
import TasksService from './components/TasksService';
import CalendarService from './components/CalendarService';
import ProfileService from './components/ProfileService';
import './UserServiceApp.css';

const UserServiceApp = ({ user, onLogout }) => {
  const [activeService, setActiveService] = useState('blog');
  const [currentUser, setCurrentUser] = useState(user);

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const renderService = () => {
    switch (activeService) {
      case 'notes':
        return <NotesService />;
      case 'documents':
        return <DocumentService title="Доски" description="Визуальные доски для организации идей" />;
      case 'presentations':
        return <PresentationService title="Проекты" description="Управление проектами и подзадачами" />;
      case 'spreadsheet':
        return <DocumentService title="Фокус" description="Сессии концентрации с таймером" />;
      case 'calendar':
        return <CalendarService />;
      case 'tasks':
        return <TasksService />;
      case 'profile':
        return <ProfileService user={currentUser} onUpdateUser={handleUpdateUser} />;
      default:
        return <MainBlog />;
    }
  };

  return (
    <div className="user-service-app">
      <Sidebar 
        activeService={activeService} 
        onServiceChange={setActiveService}
        user={currentUser}
        onLogout={onLogout}
      />
      <div className="main-content">
        {renderService()}
      </div>
    </div>
  );
};

export default UserServiceApp;