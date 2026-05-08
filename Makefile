.PHONY: install-frontend install-backend run run-backend run-frontend build build-frontend build-backend clean

install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && go mod download

run: run-backend run-frontend

run-backend:
	cd backend && go run ./cmd/main.go

run-frontend:
	cd frontend && npm run dev

build-frontend:
	cd frontend && npm run build

build-backend:
	mkdir -p backend/bin
	cd backend && go build -o ./bin/server ./cmd/main.go

build: build-backend build-frontend

clean:
	rm -rf backend/bin