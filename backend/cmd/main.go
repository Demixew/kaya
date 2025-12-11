package main

import (
	"log"
	"net/http"
	"time"

	"myoffice/backend/internal/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Post("/api/docs", http.CreateDocHandler)
	r.Get("/api/docs/{id}", http.GetDocHandler)
	r.Get("/ws/{docId}", http.WebSocketHandler)

	log.Println("🚀 Docs service running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}