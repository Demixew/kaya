package main

import (
	"log"
	"net/http"
	"time"

	"kaya/backend/config"
	"kaya/backend/internal/auth"
	"kaya/backend/internal/docs"
	httpHandlers "kaya/backend/internal/http"
	"kaya/backend/internal/user"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	cfg := config.Load()

	userStore, err := user.NewStore()
	if err != nil {
		log.Fatalf("Failed to init user store lmao: %v", err)
	}

	docStore := docs.NewStore()
	authSvc := auth.NewService(userStore, cfg.JWTSecret, cfg.JWTExpiration)

	handlers := httpHandlers.NewHandlers(docStore, authSvc, userStore)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Post("/api/auth/login", handlers.LoginHandler)
	r.Post("/api/docs", handlers.CreateDocHandler)
	r.Get("/api/docs/{id}", handlers.GetDocHandler)
	r.Get("/ws/{docId}", handlers.WebSocketHandler)

	log.Println("Сервис запущен на http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
