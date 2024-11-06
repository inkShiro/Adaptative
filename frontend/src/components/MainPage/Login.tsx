// src/components/Login.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Notification from '../Efectos/Notification';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setNotification({ message: 'Por favor, completa todos los campos.', type: 'error' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { role } = data;
        const { id } = data;

        // Guarda el rol y el id en localStorage
        localStorage.setItem('userID', id);
        localStorage.setItem('userRole', role);
        console.log(role);
        console.log(id);
        

        setNotification({ message: 'Inicio de sesión exitoso.', type: 'success' });
        setEmail('');
        setPassword('');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        const errorData = await response.json();
        setNotification({ message: errorData.message || 'Credenciales incorrectas.', type: 'error' });
        setPassword('');
      }
    } catch (error) {
      setNotification({ message: 'Error de red. Inténtalo de nuevo.', type: 'error' });
      setPassword('');
    }
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="flex flex-col p-8 shadow-lg space-y-4">
      {notification && <Notification message={notification.message} type={notification.type} onClose={handleNotificationClose} />}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded p-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
