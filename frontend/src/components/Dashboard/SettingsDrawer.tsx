// src/components/SettingsDrawer.tsx
import React from 'react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/6 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Configuración</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="p-4">
        {/* Aquí puedes añadir las opciones de configuración */}
        <p>Opción 1</p>
        <p>Opción 2</p>
        <p>Opción 3</p>
      </div>
    </div>
  );
};

export default SettingsDrawer;
