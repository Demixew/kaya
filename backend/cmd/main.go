package main

import (
	"log"
	"net/http"
	"time"

	"kaya/backend/config"
	"kaya/backend/internal/auth"
	"kaya/backend/internal/docs"
	authHandler "kaya/backend/internal/http/handler/auth"
	docsHandler "kaya/backend/internal/http/handler/docs"
	"kaya/backend/internal/http/middleware"
	"kaya/backend/internal/user"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/gorilla/websocket"
)

func main() {
	cfg := config.Load()

	userRepo, err := user.NewStore()
	if err != nil {
		log.Fatalf("Failed to init user store lmao: %v", err)
	}
	docRepo := docs.NewStore()
	authSvc := auth.NewService(userRepo, cfg.JWTSecret, cfg.JWTExpiration)
	docSvc := docs.NewService(docRepo)

	authH := authHandler.NewHandler(authSvc)
	docH := docsHandler.NewHandler(docSvc)

	r := chi.NewRouter()
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Timeout(60 * time.Second))
	r.Use(chimiddleware.Recoverer)

	// Публичный роут для входа
	r.Post("/api/auth/login", authH.Login)
	r.Post("/api/auth/register", authH.Register)

	r.Group(func(r chi.Router) {
		r.Use(middleware.Auth(authSvc))

		r.Post("/api/docs", docH.Create)
		r.Get("/api/docs/{id}", docH.Get)
		r.Put("/api/docs/{id}", docH.Update)
		r.Delete("/api/docs/{id}", docH.Delete)

		r.Get("/ws/{docId}", wsHandler)
	})

	log.Println("Сервис запущен на http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("ws upgrade error: %v", err)
		return
	}
	defer conn.Close()

	log.Println("WS connected:", r.URL.Query().Get("docId"))
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		conn.WriteMessage(websocket.TextMessage, msg)
	}
	log.Println("WS disconnected")
}
