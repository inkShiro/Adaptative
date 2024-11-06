import React, { useState, useRef } from 'react';
import Login from '../MainPage/Login'; 
import Register from '../MainPage/Register';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // Asegúrate de que tenga un z-index alto
    >
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-center text-3xl font-semibold mb-4">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        {isLogin ? (
          <Login />
        ) : (
          <Register />
        )}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
