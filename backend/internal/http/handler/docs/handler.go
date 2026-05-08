package docs

import (
	"encoding/json"
	"kaya/backend/internal/docs"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

type Handler struct {
	svc docs.Service
}

func NewHandler(svc docs.Service) *Handler {
	return &Handler{svc: svc}
}

type CreateRequest struct {
	Title string `json:"title"`
}

type UpdateRequest struct {
	Content string `json:"content"`
}

type DocumentResponse struct {
	Title     string `json:"title"`
	ID        string `json:"id"`
	UpdatedAt string `json:"updatedAt"`
	Content   string `json:"content"`
}

func toResponse(doc *docs.Document) DocumentResponse {
	return DocumentResponse{
		Title:     doc.Title,
		ID:        doc.ID,
		Content:   doc.Content,
		UpdatedAt: doc.UpdatedAt.Format(time.RFC3339),
	}
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var req CreateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid json")
		return
	}

	userID, _ := r.Context().Value("userID").(string)
	doc, err := h.svc.Create(r.Context(), req.Title, userID)
	if err != nil {
		code := http.StatusInternalServerError
		if err == docs.ErrEmptyTitle {
			code = http.StatusBadRequest
		}
		respondError(w, code, err.Error())
		return
	}

	respondJSON(w, http.StatusCreated, toResponse(doc))
}

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	userID, _ := r.Context().Value("userID").(string)

	doc, err := h.svc.GetById(r.Context(), id, userID)
	if err != nil {
		code := http.StatusNotFound
		if err == docs.ErrNotOwner {
			code = http.StatusForbidden
		}
		respondError(w, code, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, toResponse(doc))
}

func (h *Handler) Update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	userID, _ := r.Context().Value("userID").(string)

	var req UpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "invalid json")
		return
	}

	if err := h.svc.Update(r.Context(), id, req.Content, userID); err != nil {
		code := http.StatusInternalServerError
		if err == docs.ErrNotOwner {
			code = http.StatusForbidden
		} else if err == docs.ErrNotFound {
			code = http.StatusNotFound
		}
		respondError(w, code, err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	userID, _ := r.Context().Value("userID").(string)

	err := h.svc.Delete(r.Context(), id, userID)
	if err != nil {
		code := http.StatusInternalServerError
		if err == docs.ErrNotFound {
			code = http.StatusNotFound
		} else if err == docs.ErrNotOwner {
			code = http.StatusForbidden
		}
		respondError(w, code, err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func respondJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func respondError(w http.ResponseWriter, status int, msg string) {
	respondJSON(w, status, map[string]string{"error": msg})
}
