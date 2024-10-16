import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ip from "../config";

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const response = await fetch(`${ip}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const token = data.access;
      document.cookie = `authToken=${token}; path=/`;
      console.log('User logged in successfully:', data);
      navigate('/HomeScreen');
    } catch (error) {
      console.error('Error logging in:', error);
      setError(`Ошибка при входе: ${error.message}`);
    }
  };

  return (
    <div className="login-screen">
      <h2>Вход</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
      <p>Нет аккаунта? <button onClick={() => navigate('/RegisterScreen')}>Зарегистрироваться</button></p>
    </div>
  );
}

export default LoginScreen;