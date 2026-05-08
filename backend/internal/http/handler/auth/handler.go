package auth

import (
	"encoding/json"
	"net/http"

	"kaya/backend/internal/auth"
)

type Handler struct {
	svc auth.Service
}

func NewHandler(svc auth.Service) *Handler {
	return &Handler{svc: svc}
}

type AuthRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	token, err := h.svc.Login(r.Context(), req.Username, req.Password)
	if err != nil {
		http.Error(w, `{"error":"`+err.Error()+`"}`, http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	var req AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid request"}`, http.StatusBadRequest)
		return
	}

	token, err := h.svc.Register(r.Context(), req.Username, req.Password)
	if err != nil {
		code := http.StatusInternalServerError
		if err.Error() == "user with this username already exists" {
			code = http.StatusConflict
		}
		http.Error(w, `{"error":"`+err.Error()+`"}`, code)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}
