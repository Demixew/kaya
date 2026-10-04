# Kaya

> **Примечание:** Это незавершённый учебный проект, разработка которого была приостановлена в мае 2026. Проект демонстрирует базовую архитектуру коллаборативного редактора документов, но не является production-ready решением.

## Описание

Kaya — это веб-приложение для совместного редактирования документов с поддержкой real-time синхронизации. Проект создавался как учебный эксперимент для изучения fullstack-разработки.

### Основные возможности (реализованные)

- [x] Регистрация и аутентификация пользователей (JWT)
- [x] CRUD операции с документами
- [x] WYSIWYG редактор с поддержкой task-листов (Tiptap)
- [x] Базовая WebSocket-коммуникация (эхо-сервер)
- [x] Хранение данных в SQLite

### Что не завершено

- [ ] Полноценная real-time синхронизация между клиентами
- [ ] Conflict resolution при одновременном редактировании
- [ ] Unit и integration тесты
- [ ] Production-ready деплой
- [ ] Документация API

## Стек

### Backend
- **Go 1.25** — основной язык
- **chi/v5** — HTTP роутер
- **golang-jwt** — JWT аутентификация
- **gorilla/websocket** — WebSocket соединения
- **go-sqlite3** — база данных SQLite

### Frontend
- **Vue 3** — UI фреймворк
- **TypeScript** — типизация
- **Vite** — сборщик
- **Tiptap** — WYSIWYG редактор с task-листами

## Локальный запуск

### Требования
- Go 1.25+
- Node.js 18+
- Make

### Установка и запуск

```bash
# Установить зависимости
make install-backend
make install-frontend

# Запустить backend и frontend
make run

------------
Доступные команды make
make run              # Запустить backend + frontend
make run-backend      # Только backend
make run-frontend     # Только frontend
make build            # Собрать production-версию
make clean            # Очистить артефакты сборки
```
------------
## С уважением, авторы

- **[Demixew](https://github.com/Demixew)** — Backend архитектура, API, база данных
- **[pr0100pr0111](https://github.com/pr0100pr0111)** — Frontend разработка, UI/UX дизайн
