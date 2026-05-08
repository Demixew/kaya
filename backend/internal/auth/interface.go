package auth

import "context"

type Service interface {
	Register(ctx context.Context, username, password string) (string, error)
	Login(ctx context.Context, username, password string) (string, error)
	ValidateToken(ctx context.Context, token string) (string, error)
}
