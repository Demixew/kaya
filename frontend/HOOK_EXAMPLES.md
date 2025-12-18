/**
 * ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ useAuth HOOK'а
 * 
 * Этот hook упрощает работу с аутентификацией
 */

// Пример 1: Использование в компоненте
import useAuth from '../hooks/useAuth';

function MyComponent() {
  const { token, loading, error, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login('username', 'password');
      console.log('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Вы вошли!</p>
          <button onClick={logout}>Выход</button>
        </>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

// ========================================

// Пример 2: Использование при регистрации
import useAuth from '../hooks/useAuth';

function RegisterForm() {
  const { loading, error, register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register('newuser', 'email@test.com', 'password123');
      console.log('Registration successful!');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Username" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

// ========================================

// Пример 3: Защита маршрутов (для будущего использования)
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Использование:
// <ProtectedRoute>
//   <AdminPanel />
// </ProtectedRoute>

// ========================================

// Пример 4: Отправка token'а в запросе
function useApi() {
  const { token } = useAuth();

  const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  };

  return { fetchWithAuth };
}

// Использование:
// const { fetchWithAuth } = useApi();
// const docs = await fetchWithAuth('/api/docs');

// ========================================

// Пример 5: Проверка наличия token'а при загрузке страницы
import { useEffect } from 'react';

function App() {
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is logged in');
      // Здесь можно загрузить данные пользователя
    }
  }, [isAuthenticated]);

  return <div>...</div>;
}
