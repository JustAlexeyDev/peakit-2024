import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ip from "../config";

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !phoneNumber || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const response = await fetch(`${ip}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, phone_number: phoneNumber, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const token = data.token;
      document.cookie = `authToken=${token}; path=/`;
      console.log('User registered successfully:', data);
      navigate('/menu');
    } catch (error) {
      console.error('Error registering user:', error);
      setError(`Ошибка при регистрации: ${error.message}`);
    }
  };

  return (
    <div className="register-screen">
      <h2>Регистрация</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Номер телефона"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <p>Уже есть аккаунт? <button onClick={() => navigate('/login')}>Войти</button></p>
    </div>
  );
}

export default RegisterScreen;