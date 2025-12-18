.PHONY: run-backend run-frontend install-frontend build-frontend run

run:
	@echo "Запуск бэкенда и фронтенда..."
	@make -j 2 run-backend run-frontend

run-backend:
	@echo "Запуск бэкенд-сервера..."
	@cd backend && go run ./cmd/main.go

run-frontend:
	@echo "Запуск фронтенд-сервера для разработки..."
	@cd frontend && npm start

install-frontend:
	@echo "Установка зависимостей фронтенда..."
	@cd frontend && npm install

build-frontend:
	@echo "Сборка фронтенда для продакшена..."
	@cd frontend && npm run build