package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("ivan-ruslan-key")

type Service struct {
	//В будущем тут будет вилка для хранилища пользователей
	//По типу, hitlerStore *users.Store
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) Login(username, password string) (string, error) {
	// TODO: Добавить не ебучего брут-хард-юзера, а норм чек по бдшке, я честно заебался уже чтобы делать бд

	if username != "akishkin" || password != "sarbaev" {
		return "", errors.New("неверный логин и т.д")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": "user_id_1",
		"exp": time.Now().Add(time.Hour * 24).Unix(),
		"iat": time.Now().Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
