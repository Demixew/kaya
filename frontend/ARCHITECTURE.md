/**
 * СТРУКТУРА КОМПОНЕНТОВ И ПОТОКОВ ДАННЫХ
 * 
 * App (главный контейнер)
 * ├─ currentPage: 'landing' | 'login'
 * ├─ userToken: string | null
 * ├─ handleLoginClick() → setCurrentPage('login')
 * ├─ handleBackClick() → setCurrentPage('landing')
 * ├─ handleLoginSuccess(token) → setUserToken(token), setCurrentPage('landing')
 * │
 * ├─ [Landing Page]
 * │  ├─ LandingPage
 * │  │  ├─ Header
 * │  │  │  ├─ props: onLoginClick, onRegisterClick, userToken
 * │  │  │  ├─ Если token: показать "✓ Вход выполнен" + кнопка "Выход"
 * │  │  │  └─ Если нет token: показать "Вход" + "Регистрация"
 * │  │  │
 * │  │  ├─ Hero
 * │  │  │  ├─ props: onRegisterClick, onLoginClick
 * │  │  │  ├─ Кнопка "Начать бесплатно" → onRegisterClick()
 * │  │  │  └─ Кнопка "Уже есть аккаунт?" → onLoginClick()
 * │  │  │
 * │  │  ├─ About, Features, Pricing
 * │  │  │
 * │  │  ├─ RegistrationModal (на верху всего)
 * │  │  │  ├─ Отправляет данные на API /api/auth/register
 * │  │  │  └─ Нужно обновить для использования API
 * │  │  │
 * │  │  └─ Footer
 * │  │
 * │  └─ Когда showRegistration = true → показывается RegistrationModal
 * │
 * └─ [Auth Page]
 *    └─ LoginRegister
 *       ├─ props: onLoginSuccess(token), onBackClick()
 *       ├─ isLogin: true | false (режим)
 *       ├─ formData: { username, email, password, confirmPassword }
 *       ├─ errors: { [field]: message }
 *       ├─ isLoading: true | false
 *       │
 *       ├─ validateLoginForm() → boolean
 *       ├─ validateRegisterForm() → boolean
 *       ├─ handleLogin() → POST /api/auth/login
 *       ├─ handleRegister() → POST /api/auth/register
 *       └─ toggleMode() → переключение между логином и регистрацией
 *
 */

// ПРИМЕРЫ ВЫЗОВОВ И ПОТОКОВ

// ============ ЛОГИН ============
// 1. Пользователь нажимает "Вход" в header
// → handleLoginClick() вызывается в App
// → setCurrentPage('login')
// → LoginRegister компонент рендерится

// 2. Пользователь заполняет форму логина и нажимает "Войти"
// → handleLogin() срабатывает
// → POST запрос на /api/auth/login
// → Получаем token от сервера
// → localStorage.setItem('token', token)
// → onLoginSuccess(token) вызывается
// → setUserToken(token) в App
// → setCurrentPage('landing')
// → Пользователь вернулся на главную

// ============ РЕГИСТРАЦИЯ (ЧЕРЕЗ КНОПКУ В HERO) ============
// 1. Пользователь нажимает "Начать бесплатно" в hero
// → handleOpenRegistration() вызывается в LandingPage
// → setShowRegistration(true)
// → RegistrationModal рендерится

// 2. Пользователь заполняет форму и отправляет
// → Нужно обновить RegistrationModal для работы с API
// → Отправить на /api/auth/register
// → Получить token и сохранить

// ============ РЕГИСТРАЦИЯ (ЧЕРЕЗ СТРАНИЦУ) ============
// 1. Пользователь нажимает "Уже есть аккаунт?" в hero
// → handleLoginClick() вызывается
// → setCurrentPage('login')
// → LoginRegister рендерится в режиме логина

// 2. Пользователь нажимает "Регистрация" ссылку
// → toggleMode() вызывается
// → isLogin = false
// → Форма переключается на регистрацию

// 3. Заполнение и отправка
// → handleRegister() срабатывает
// → POST запрос на /api/auth/register
// → Получаем token
// → onLoginSuccess(token)
// → Возврат на главную

// ============ ВЫХОД ============
// 1. Пользователь нажимает "Выход" в header
// → handleLogout() вызывается
// → localStorage.removeItem('token')
// → window.location.reload() (перезагрузка страницы)
// → userToken = null
// → Header показывает кнопки "Вход" и "Регистрация"

// ============ ВОЗВРАТ НАЗАД ============
// 1. Пользователь на странице логина нажимает "Назад"
// → onBackClick() вызывается
// → handleBackClick() в App
// → setCurrentPage('landing')
// → Возврат на главную страницу
// → Все изменения в форме логина теряются

// ============ API ЗАПРОСЫ ============

// LOGIN
POST /api/auth/login
{
  "username": "akishkin",
  "password": "sarbaev"
}
// Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}

// REGISTER
POST /api/auth/register
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}
// Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}

// ИСПОЛЬЗОВАНИЕ TOKEN В ЗАПРОСАХ
GET /api/docs
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

// ============ STATE MANAGEMENT ============

// App state:
const [currentPage, setCurrentPage] = useState('landing'); // или 'login'
const [userToken, setUserToken] = useState(localStorage.getItem('token'));

// LoginRegister state:
const [isLogin, setIsLogin] = useState(true);
const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);

// LandingPage state:
const [showRegistration, setShowRegistration] = useState(false);

// ============ ВАЛИДАЦИЯ ============

// Login валидация:
✓ username: не пусто
✓ password: не пусто

// Register валидация:
✓ username: не пусто
✓ email: не пусто + формат email
✓ password: не пусто + минимум 6 символов
✓ confirmPassword: совпадает с password

// При валидации:
✓ Ошибки показываются красным текстом под полем
✓ Общие ошибки показываются в блоке вверху
✓ Кнопка отправки недоступна пока идет запрос

