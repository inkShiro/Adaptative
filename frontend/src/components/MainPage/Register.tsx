// src/components/Register.tsx
import React, { useState, useEffect } from 'react';
import Notification from '../Efectos/Notification';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher' | null>(null); // Estado para el rol
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validatePassword = () => password.length >= 8 && password.length <= 12;

  const handleRegister = async () => {
    if (fullName && email && validatePassword() && confirmPassword === password && acceptedTerms && role) {
      try {
        const response = await fetch(`http://localhost:4000/api/users`, {  // Usar la variable de entorno aquí
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            email,
            password,
            role,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setNotification({ message: 'Registro completado con éxito', type: 'success' });
          // Limpiar los campos después de un registro exitoso
          setFullName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setAcceptedTerms(false);
          setRole(null);
        } else {
          const errorData = await response.json();
          setNotification({ message: errorData.message || 'Error en el registro', type: 'error' });
          // Limpiar los campos en caso de error
          setFullName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setAcceptedTerms(false);
          setRole(null);
        }
      } catch (error) {
        setNotification({ message: 'Error de red. Inténtalo de nuevo.', type: 'error' });
        // Limpiar los campos en caso de error
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAcceptedTerms(false);
        setRole(null);
      }
    } else {
      if (!acceptedTerms) {
        setNotification({ message: 'Debes aceptar los términos y condiciones.', type: 'error' });
      } else {
        setNotification({ message: 'Por favor, completa todos los campos correctamente.', type: 'error' });
      }
      // Limpiar los campos en caso de error
      setPassword(''); // Limpiar la contraseña en caso de error
      setConfirmPassword(''); // Limpiar la confirmación de contraseña
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-auto relative">
      {/* Botones de selección de rol */}
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => setRole('student')}
          className={`px-4 py-2 rounded ${role === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Soy Estudiante
        </button>
        <button
          onClick={() => setRole('teacher')}
          className={`px-4 py-2 rounded ${role === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Soy Profesor
        </button>
      </div>

      <input
        type="text"
        placeholder="Nombre Completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mr-2"
        />
        <label>
          Acepto los{' '}
          <a href="/terms" target="_blank" className="text-blue-500 underline">
            términos y condiciones
          </a>
        </label>
      </div>
      <button onClick={handleRegister} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
        Registrarse
      </button>

      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={handleNotificationClose} />
      )}
    </div>
  );
};

export default Register;
