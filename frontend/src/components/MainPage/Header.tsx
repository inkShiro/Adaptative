// src/components/Header.tsx
"use client";

import React from 'react';

const Header: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gray-800 text-white rounded-br-2xl rounded-bl-2xl">
      <h1 className="text-xl">ADAPTIVE LEARNING</h1>
      <button
        onClick={onOpenModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Iniciar Sesión / Registrarse
      </button>
    </header>
  );
};

export default Header;
