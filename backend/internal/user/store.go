package user

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	ID           string `json:"id"`
	Username     string `json:"username"`
	PasswordHash string `json:"password_hash"`
}

var ErrUserExists = errors.New("user with this username already exists")

var ErrUserNotFound = errors.New("user not found")

type Store struct {
	db *sql.DB
}

func NewStore() (*Store, error) {
	db, err := sql.Open("sqlite3", "./kaya.db")
	if err != nil {
		return nil, fmt.Errorf("could not open db: %w", err)
	}

	store := &Store{db: db}
	if err := store.init(); err != nil {
		return nil, fmt.Errorf("could not initialize db: %w", err)
	}
	return store, nil
}

func (s *Store) init() error {
	query := `
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    );
    `

	_, err := s.db.Exec(query)
	if err != nil {
		return fmt.Errorf("could not create users table: %w", err)
	}

	return nil
}

func (s *Store) Create(ctx context.Context, username, passwordHash string) (*User, error) {
	user := &User{
		ID:           "user_" + uuid.New().String(), // Используем UUID для ID
		Username:     username,
		PasswordHash: passwordHash,
	}
	query := "INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)"
	_, err := s.db.ExecContext(ctx, query, user.ID, user.Username, user.PasswordHash)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
			return nil, ErrUserExists
		}
		return nil, fmt.Errorf("could not insert user %w", err)
	}
	return user, nil
}

func (s *Store) GetByUsername(ctx context.Context, username string) (*User, error) {
	user := &User{}
	query := "SELECT id, username, password_hash FROM users WHERE username = ?"
	err := s.db.QueryRowContext(ctx, query, username).Scan(&user.ID, &user.Username, &user.PasswordHash)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("could not get user: %w", err)
	}
	return user, nil
}
