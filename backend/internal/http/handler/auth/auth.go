//Легаси, потом решу что делать с этим

package auth

// import (
// 	"encoding/json"
// 	"errors"
// 	"kaya/backend/internal/user"
// 	"net/http"
// 	"strings"
// )

// // login / signup logic lol TODO: remake
// type LoginRequest struct {
// 	Username string `json:"username"`
// 	Password string `json:"password"`
// }

// func (h *Handler) LoginHandler(w http.ResponseWriter, r *http.Request) {
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
