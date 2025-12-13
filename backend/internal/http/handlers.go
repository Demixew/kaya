package http

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"flugou/backend/internal/auth"
	"flugou/backend/internal/docs"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"github.com/gorilla/websocket"
)

// Handlers - это структура для хранения зависимостей обработчиков, например, нашего хранилища.
type Handlers struct {
	docStore *docs.Store
	authSvc  *auth.Service
}

// NewHandlers создает новый экземпляр Handlers с необходимыми зависимостями.
func NewHandlers(docStore *docs.Store, authSvc *auth.Service) *Handlers {
	return &Handlers{docStore: docStore, authSvc: authSvc}
}

func (h *Handlers) CreateDocHandler(w http.ResponseWriter, r *http.Request) {
	doc := docs.Document{
		ID:        uuid.NewString(), // Используем UUID для надежных уникальных ID
		Title:     "Новый документ",
		Content:   "",
		UpdatedAt: time.Now(),
	}

	h.docStore.CreateDoc(doc)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(doc)
}

func (h *Handlers) GetDocHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	doc, ok := h.docStore.GetDoc(id)

	if ok {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(doc)
		return
	}
	http.Error(w, "ДОК НЕ НАЙДЕН СУКИ", http.StatusNotFound)
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *Handlers) LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	token, err := h.authSvc.Login(req.Username, req.Password)
	if err != nil {
		http.Error(w, "Фейл с датой", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}

// Эхо для теста вебсокета в котором я не ебу
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func (h *Handlers) WebSocketHandler(w http.ResponseWriter, r *http.Request) {
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
