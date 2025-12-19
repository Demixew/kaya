package auth

import (
	"errors"
	"fmt"
	"kaya/backend/internal/user"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("ivan-ruslan-key")

type Service struct {
	//В будущем тут будет вилка для хранилища пользователей
	//По типу, hitlerStore *users.Store
	userStore     *user.Store
	jwt           []byte
	tokenDuration time.Duration
}

func NewService(userStore *user.Store, jwt string, tokenDuration time.Duration) *Service {
	return &Service{userStore: userStore, jwt: []byte(jwt), tokenDuration: tokenDuration}
}

func (s *Service) Register(username, password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}

	u, err := s.userStore.Create(username, string(hashedPassword))
	if err != nil {
		return "", fmt.Errorf("failed to create user: %w", err)
	}

	return s.generateJWT(u)
}
func (s *Service) Login(username, password string) (string, error) {
	u, err := s.userStore.GetByUsername(username)
	if err != nil {
		return "", errors.New("invalid data for login, man")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)); err != nil {
		return "", errors.New("invalid data, thats funny yeah?")
	}
	return s.generateJWT(u)
}

func (s *Service) generateJWT(u *user.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": u.ID,
		"exp": time.Now().Add(s.tokenDuration).Unix(),
		"iat": time.Now().Unix(),
	})

	tokenString, err := token.SignedString(s.jwt)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
