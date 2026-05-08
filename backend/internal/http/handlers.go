package http

// import (
// 	"encoding/json"
// 	"errors"
// 	"log"
// 	"net/http"
// 	"strings"
// 	"time"

// 	"kaya/backend/internal/auth"
// 	"kaya/backend/internal/docs"
// 	"kaya/backend/internal/user"

// 	"github.com/go-chi/chi/v5"
// 	"github.com/google/uuid"

// 	"github.com/gorilla/websocket"
// )

// type Handlers struct {
// 	docStore  *docs.Store
// 	authSvc   *auth.Service
// 	userStore *user.Store
// }

// func NewHandlers(docStore *docs.Store, authSvc *auth.Service, userStore *user.Store) *Handlers {
// 	return &Handlers{docStore: docStore, authSvc: authSvc, userStore: userStore}
// }

// func (h *Handlers) CreateDocHandler(w http.ResponseWriter, r *http.Request) {
// 	doc := docs.Document{
// 		ID:        uuid.NewString(),
// 		Title:     "Новый документ",
// 		Content:   "",
// 		UpdatedAt: time.Now(),
// 	}

// 	h.docStore.CreateDoc(doc)

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusCreated)
// 	json.NewEncoder(w).Encode(doc)
// }

// func (h *Handlers) GetDocHandler(w http.ResponseWriter, r *http.Request) {
// 	id := chi.URLParam(r, "id")

// 	doc, ok := h.docStore.GetDoc(id)

// 	if ok {
// 		w.Header().Set("Content-Type", "application/json")
// 		json.NewEncoder(w).Encode(doc)
// 		return
// 	}
// 	http.Error(w, "ДОК НЕ НАЙДЕН СУКИ", http.StatusNotFound)
// }

// // login / signup logic lol
// type LoginRequest struct {
// 	Username string `json:"username"`
// 	Password string `json:"password"`
// }

// func (h *Handlers) LoginHandler(w http.ResponseWriter, r *http.Request) {
// 	var req LoginRequest
// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		http.Error(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}

// 	token, err := h.authSvc.Login(req.Username, req.Password)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusUnauthorized)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(map[string]string{
// 		"token": token,
// 	})
// }

// func (h *Handlers) RegisterHandler(w http.ResponseWriter, r *http.Request) {
// 	var req LoginRequest
// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		http.Error(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}

// 	token, err := h.authSvc.Register(req.Username, req.Password)
// 	if err != nil {
// 		if errors.Is(err, user.ErrUserExists) {
// 			http.Error(w, "Username is already taken", http.StatusConflict)
// 			return
// 		}
// 		http.Error(w, "Failed to register user", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusCreated)
// 	json.NewEncoder(w).Encode(map[string]string{"token": token})
// }

// func (h *Handlers) AuthMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		authHeader := r.Header.Get("Authorization")
// 		if authHeader == "" {
// 			http.Error(w, "Authorization header required", http.StatusUnauthorized)
// 			return
// 		}

// 		headerParts := strings.Split(authHeader, " ")
// 		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
// 			http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
// 			return
// 		}

// 		tokenString := headerParts[1]
// 		_, err := h.authSvc.ValidateToken(tokenString)
// 		if err != nil {
// 			http.Error(w, "Invalid token", http.StatusUnauthorized)
// 			return
// 		}

// 		next.ServeHTTP(w, r)
// 	})
// }

// // Эхо для теста вебсокета в котором я не ебу
// var upgrader = websocket.Upgrader{
// 	CheckOrigin: func(r *http.Request) bool { return true },
// }

// func (h *Handlers) WebSocketHandler(w http.ResponseWriter, r *http.Request) {
// 	conn, err := upgrader.Upgrade(w, r, nil)
// 	if err != nil {
// 		log.Printf("WebSocket upgrade error: %v", err)
// 		return
// 	}
// 	defer conn.Close()

// 	log.Println("🔌 WebSocket connected")
// 	for {
// 		_, msg, err := conn.ReadMessage()
// 		if err != nil {
// 			break
// 		}
// 		// просто ебашит соо
// 		conn.WriteMessage(websocket.TextMessage, msg)
// 	}
// 	log.Println("📴 WebSocket disconnected")
// }
