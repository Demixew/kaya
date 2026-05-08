package auth

import (
	"context"
	"errors"
	"fmt"
	"kaya/backend/internal/user"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type service struct {
	userRepo      user.Repository
	jwtSecret     []byte
	tokenDuration time.Duration
}

func NewService(userRepo user.Repository, jwtSecret string, tokenDuration time.Duration) Service {
	return &service{
		userRepo:      userRepo,
		jwtSecret:     []byte(jwtSecret),
		tokenDuration: tokenDuration,
	}
}

func (s *service) Register(ctx context.Context, username, password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("hash password: %w", err)
	}

	u, err := s.userRepo.Create(ctx, username, string(hash))
	if err != nil {
		return "", err
	}
	return s.generateJWT(u)
}

func (s *service) Login(ctx context.Context, username, password string) (string, error) {
	u, err := s.userRepo.GetByUsername(ctx, username)
	if err != nil {
		if errors.Is(err, user.ErrUserNotFound) {
			return "", errors.New("invalid username or password")
		}
		return "", fmt.Errorf("get user: %w", err)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)); err != nil {
		return "", errors.New("invalid username or password")
	}
	return s.generateJWT(u)
}

func (s *service) ValidateToken(ctx context.Context, tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return s.jwtSecret, nil
	})
	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims["sub"].(string), nil
	}
	return "", errors.New("invalid token")
}

func (s *service) generateJWT(u *user.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": u.ID,
		"exp": time.Now().Add(s.tokenDuration).Unix(),
		"iat": time.Now().Unix(),
	})
	return token.SignedString(s.jwtSecret)
}

// type Service struct {
// 	//В будущем тут будет вилка для хранилища пользователей
// 	//По типу, hitlerStore *users.Store
// 	userStore     *user.Store
// 	jwt           []byte
// 	tokenDuration time.Duration
// }

// func NewService(userStore *user.Store, jwt string, tokenDuration time.Duration) *Service {
// 	return &Service{userStore: userStore, jwt: []byte(jwt), tokenDuration: tokenDuration}
// }

// func (s *Service) Register(username, password string) (string, error) {
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
// 	if err != nil {
// 		return "", fmt.Errorf("failed to hash password: %w", err)
// 	}

// 	u, err := s.userStore.Create(username, string(hashedPassword))
// 	if err != nil {
// 		return "", fmt.Errorf("failed to create user: %w", err)
// 	}

// 	return s.generateJWT(u)
// }
// func (s *Service) Login(username, password string) (string, error) {
// 	u, err := s.userStore.GetByUsername(username)
// 	if err != nil {
// 		if errors.Is(err, user.ErrUserNotFound) {
// 			return "", errors.New("invalid username or password")
// 		}
// 		return "", fmt.Errorf("failed to get user: %w", err)
// 	}

// 	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)); err != nil {
// 		return "", errors.New("invalid username or password")
// 	}
// 	return s.generateJWT(u)
// }

// func (s *Service) ValidateToken(tokenString string) (string, error) {
// 	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
// 		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
// 		}
// 		return s.jwt, nil
// 	})

// 	if err != nil {
// 		return "", err
// 	}

// 	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
// 		userID := claims["sub"].(string)
// 		return userID, nil
// 	}

// 	return "", errors.New("invalid token")
// }

// func (s *Service) generateJWT(u *user.User) (string, error) {
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"sub": u.ID,
// 		"exp": time.Now().Add(s.tokenDuration).Unix(),
// 		"iat": time.Now().Unix(),
// 	})

// 	tokenString, err := token.SignedString(s.jwt)
// 	if err != nil {
// 		return "", err
// 	}
// 	return tokenString, nil
// }
