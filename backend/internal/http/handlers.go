package http

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
)

// ну модель дока
type Document struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// Пока что это ебучий мок
var inMemoryDocs = map[string]Document{
	"doc_123": {ID: "doc_123", Title: "Пример документа", UpdatedAt: time.Now()},
}

func CreateDocHandler(w http.ResponseWriter, r *http.Request) {
	doc := Document{
		ID:        "doc_" + time.Now().Format("20060102150405"),
		Title:     "Новый документ",
		UpdatedAt: time.Now(),
	}
	inMemoryDocs[doc.ID] = doc

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"id": doc.ID})
}

func GetDocHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if doc, ok := inMemoryDocs[id]; ok {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(doc)
		return
	}
	http.Error(w, "Not found НЕТУ НЕ РАБОТАЕТ", http.StatusNotFound)
}

// Эхо для теста вебсокета в котором я не ебу
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func WebSocketHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade error: %v", err)
		return
	}
	defer conn.Close()

	log.Println("🔌 WebSocket connected")
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		// просто ебашит соо
		conn.WriteMessage(websocket.TextMessage, msg)
	}
	log.Println("📴 WebSocket disconnected")
}