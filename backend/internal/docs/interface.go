package docs

import (
	"context"
	"errors"
	"time"
)

var (
	ErrEmptyTitle = errors.New("title cannot be empty")
	ErrNotOwner   = errors.New("user is not owner of this document")
	ErrNotFound   = errors.New("document not found")
)

type Document struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	UserID    string    `json:"user_id"`
	UpdatedAt time.Time `json:"updatedAt"`
	CreatedAt time.Time `json:"createdAt"`
}

type Repository interface {
	Create(ctx context.Context, doc *Document) error
	FindById(ctx context.Context, id string) (*Document, error)
	Update(ctx context.Context, id, content string) error
	Delete(ctx context.Context, id string) error
}

type Service interface {
	Create(ctx context.Context, title, userID string) (*Document, error)
	GetById(ctx context.Context, id, userID string) (*Document, error)
	Update(ctx context.Context, id, content, userID string) error
	Delete(ctx context.Context, id, userID string) error
}
