package user

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	ID           string
	Username     string
	PasswordHash string
}

type Store struct {
	db *sql.DB
}

func NewStore() (*Store, error) {
	db, err := sql.Open("sqlite3", "./kaya.db")
	if err != nil {
		return nil, fmt.Errorf("Could not oped db: %w", err)
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

	_, err = s.GetByUsername("kaya")
	if err != nil {
		log.Println("Admin user 'kaya' not found, creating..")
		hashedPassword := "$2a$10$T.H/yJ9.x4.A.3.A.3.A.uL5q5t5r5e5w5e5r5t5y5u5i5o5p5q"
		if _, err := s.Create("kaya", hashedPassword); err != nil {
			log.Printf("Could not create admin user: %v", err)
		}
	}

	return nil
}

func (s *Store) Create(username, password string) (*User, error) {
	user := &User{
		ID:           "user_" + uuid.New().String(), // Используем UUID для ID
		Username:     username,
		PasswordHash: password,
	}
	query := "INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)"
	_, err := s.db.Exec(query, user.ID, user.Username, user.PasswordHash)
	if err != nil {
		return nil, fmt.Errorf("could not insert user %w", err)
	}
	return user, nil
}

func (s *Store) GetByUsername(username string) (*User, error) {
	user := &User{}
	query := "SELECT id, username, password_hash FROM users WHERE username = ?"
	err := s.db.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.PasswordHash)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			// Это не ошибка, а нормальная ситуация, когда юзер не найден.
			return nil, errors.New("user not found")
		}
		return nil, fmt.Errorf("could not get user: %w", err)
	}
	return user, nil
}
