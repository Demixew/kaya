package docs

import (
	"context"
	"errors"
	"sync"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

var errDocNotFound = errors.New("document not found")

type Store struct {
	mu   sync.RWMutex
	docs map[string]*Document
}

func NewStore() *Store {
	return &Store{
		docs: make(map[string]*Document),
	}
}

func (s *Store) Create(ctx context.Context, doc *Document) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	doc.CreatedAt = time.Now()
	doc.UpdatedAt = time.Now()
	s.docs[doc.ID] = doc
	return nil
}

func (s *Store) FindById(ctx context.Context, id string) (*Document, error) {
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	default:
	}

	s.mu.RLock()
	defer s.mu.RUnlock()

	doc, ok := s.docs[id]
	if !ok {
		return nil, errDocNotFound
	}
	docCopy := *doc
	return &docCopy, nil
}

func (s *Store) Update(ctx context.Context, id, content string) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	doc, ok := s.docs[id]
	if !ok {
		return errDocNotFound
	}

	doc.Content = content
	doc.UpdatedAt = time.Now()
	return nil
}

func (s *Store) Delete(ctx context.Context, id string) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.docs[id]; !ok {
		return errDocNotFound
	}

	delete(s.docs, id)
	return nil
}
