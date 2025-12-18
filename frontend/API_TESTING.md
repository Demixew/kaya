// Примеры тестирования API

// ============ ЛОГИН ============
// Используй эти credentials согласно README
POST http://localhost:8080/api/auth/login
{
  "username": "akishkin",
  "password": "sarbaev"
}

// Успешный ответ:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOi4uLn0...."
}

// ============ РЕГИСТРАЦИЯ ============
// Новый пользователь
POST http://localhost:8080/api/auth/register
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123"
}

// ============ ИСПОЛЬЗОВАНИЕ TOKEN ============
// После получения token'а, отправляй его в заголовке для защищенных эндпоинтов:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOi4uLn0....

// Пример:
GET http://localhost:8080/api/docs
Headers: Authorization: Bearer YOUR_TOKEN_HERE

// ============ ЛОКАЛЬНОЕ ХРАНИЛИЩЕ ============
// Token автоматически сохраняется в localStorage:
localStorage.getItem('token')  // Получить token
localStorage.removeItem('token') // Удалить token

// ============ СОСТОЯНИЯ КОМПОНЕНТА ============
// 1. Landing Page (главная)
//    - Кнопка "Вход" → переход на страницу логина
//    - Кнопка "Начать бесплатно" → модальное окно регистрации
//    - Кнопка "Уже есть аккаунт?" → страница логина

// 2. Login/Register Page (страница логина/регистрации)
//    - Переключение между логином и регистрацией
//    - Кнопка "Назад" → возврат на главную
//    - При успехе → возврат на главную с token'ом

// 3. Header (изменяется)
//    - Без token'а: кнопки "Вход" и "Регистрация"
//    - С token'ом: текст "✓ Вход выполнен" и кнопка "Выход"

// ============ ОБРАБОТКА ОШИБОК ============
// При ошибке сервер вернет:
{
  "message": "Invalid credentials" или другая ошибка
}

// Компонент покажет ошибку красным блоком
