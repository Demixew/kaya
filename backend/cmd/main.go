package main

import (
	"log"
	"net/http"
	"time"

	"flugou/backend/internal/auth"
	"flugou/backend/internal/docs"
	httpHandlers "flugou/backend/internal/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	docStore := docs.NewStore()
	authSvc := auth.NewService()

	handlers := httpHandlers.NewHandlers(docStore, authSvc)

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
