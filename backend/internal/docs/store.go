package docs

import (
	"sync"
	"time"
)

type Document struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Store struct {
	mu   sync.RWMutex
	docs map[string]Document
}

func NewStore() *Store {
	return &Store{
		docs: map[string]Document{
			"doc_123": {ID: "doc_123", Title: "Пример документа", Content: "Это содержимое документа.", UpdatedAt: time.Now()},
		},
	}
}

func (s *Store) CreateDoc(doc Document) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.docs[doc.ID] = doc
}

func (s *Store) GetDoc(id string) (Document, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	doc, ok := s.docs[id]
	return doc, ok
}
