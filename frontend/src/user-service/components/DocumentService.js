import React, { useState } from 'react';
import './DocumentService.css';

const DocumentService = ({ title = 'Документы', description = 'Работайте с документами' }) => {
  const [documents] = useState([
    {
      id: 1,
      title: 'Договор аренды',
      type: 'Договор',
      date: '23 декабря 2025',
      size: '2.3 MB',
      icon: '📄'
    },
    {
      id: 2,
      title: 'Техническое задание',
      type: 'ТЗ',
      date: '22 декабря 2025',
      size: '1.8 MB',
      icon: '📋'
    },
    {
      id: 3,
      title: 'Презентация проекта',
      type: 'Презентация',
      date: '21 декабря 2025',
      size: '5.2 MB',
      icon: '📊'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="document-service">
      <div className="documents-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="documents-content">
        <div className="documents-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Поиск документов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="actions">
            <button className="action-btn primary">Создать документ</button>
            <button className="action-btn">Загрузить</button>
          </div>
        </div>

        <div className="documents-grid">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="document-icon">{doc.icon}</div>
              <div className="document-info">
                <h3>{doc.title}</h3>
                <div className="document-meta">
                  <span className="doc-type">{doc.type}</span>
                  <span className="doc-date">{doc.date}</span>
                  <span className="doc-size">{doc.size}</span>
                </div>
              </div>
              <div className="document-actions">
                <button className="doc-action">Открыть</button>
                <button className="doc-action">Редактировать</button>
                <button className="doc-action">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentService;