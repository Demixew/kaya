package config

import "time"

type Config struct {
	JWTSecret     string
	JWTExpiration time.Duration
}

func Load() *Config {
	return &Config{
		JWTSecret:     "a-very-secure-and-long-secret-key-from-config", // ВАЖНО: В проде это значение должно быть загружено из безопасного места!
		JWTExpiration: 240 * time.Hour,
	}
}
