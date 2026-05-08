package docs

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// var (
// 	ErrEmptyTitle = errors.New("doc title cannot be empty")
// 	ErrNotOwner   = errors.New("user is not owner of this doc")
// )

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) Create(ctx context.Context, title, userID string) (*Document, error) {
	if title == "" {
		return nil, ErrEmptyTitle
	}

	doc := &Document{
		ID:        "doc_" + uuid.NewString(),
		UserID:    userID,
		Title:     title,
		Content:   "",
		UpdatedAt: time.Now(),
		CreatedAt: time.Now(),
	}

	if err := s.repo.Create(ctx, doc); err != nil {
		return nil, err
	}

	return doc, nil
}

func (s *service) GetById(ctx context.Context, id, userID string) (*Document, error) {
	doc, err := s.repo.FindById(ctx, id)
	if err != nil {
		return nil, err
	}

	if doc.UserID != userID {
		return nil, ErrNotOwner
	}

	return doc, nil
}

func (s *service) Update(ctx context.Context, id, content, userID string) error {
	doc, err := s.repo.FindById(ctx, id)
	if err != nil {
		return errDocNotFound
	}

	if doc.UserID != userID {
		return ErrNotOwner
	}

	return s.repo.Update(ctx, id, content)
}

func (s *service) Delete(ctx context.Context, id, userID string) error {
	doc, err := s.repo.FindById(ctx, id)
	if err != nil {
		return errDocNotFound
	}

	if doc.UserID != userID {
		return ErrNotOwner
	}

	return s.repo.Delete(ctx, id)
}
