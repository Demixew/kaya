package config

import "time"

type Config struct {
	JWTSecret     string
	JWTExpiration time.Duration
}

func Load() *Config {
	return &Config{
		JWTSecret:     "dev-secret-change-in-production-please",
		JWTExpiration: 24 * time.Hour,
	}
}
