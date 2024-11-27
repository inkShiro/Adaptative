// src/components/Header.tsx
"use client";

import React from 'react';
import { FiLogIn } from 'react-icons/fi'; // Agregar un ícono

const Header: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-5 bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg rounded-br-2xl rounded-bl-2xl">
      <h1 className="text-2xl font-bold tracking-wider">ADAPTIVE LEARNING</h1>
      <button
        onClick={onOpenModal}
        className="flex items-center space-x-2 bg-white text-blue-600 font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        <FiLogIn size={20} />
        <span>Iniciar Sesión / Registrarse</span>
      </button>
    </header>
  );
};

export default Header;
