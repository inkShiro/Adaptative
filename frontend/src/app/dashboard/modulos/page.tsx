// src/app/dashboard/modules/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Dashboard/Navbar';
import SettingsDrawer from '../../../components/Dashboard/SettingsDrawer';
import AnimatedComponent from '../../../components/Efectos/AnimatedComponent';

const ModulesPage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<any[]>([]); // Para almacenar los módulos
  const [error, setError] = useState<string | null>(null);

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);

    // Simulación de datos de módulos de ejemplo
    const simulatedModules = [
      { id: 1, name: 'Matemáticas', description: 'Aprende los fundamentos de las matemáticas.' },
      { id: 2, name: 'Ciencias', description: 'Explora el mundo de las ciencias naturales.' },
      { id: 3, name: 'Historia', description: 'Conoce la historia de diversas civilizaciones.' },
      { id: 4, name: 'Arte', description: 'Descubre técnicas y estilos artísticos.' },
    ];

    setModules(simulatedModules);
    setLoading(false);
  }, []);

  const dashboardStyles =
    role === 'student' ? 'bg-blue-100' :
    role === 'teacher' ? 'bg-green-100' : 
    'bg-gray-100';

  return (
    <div className={`p-8 ${dashboardStyles}`}>
      <Navbar role={role} onSettingsClick={toggleSettingsDrawer} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={toggleSettingsDrawer} />

      <h1 className="text-4xl font-bold mb-4 mt-8">Módulos</h1>
      
      {loading ? (
        <p className="text-gray-500">Cargando módulos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {modules.map(module => (
            <AnimatedComponent key={module.id}>
              <div className="bg-white shadow-md rounded-lg p-6 transition-transform hover:scale-105">
                <h2 className="text-2xl font-semibold mb-2">{module.name}</h2>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex justify-between">
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Ver Más
                  </button>
                  <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Comenzar
                  </button>
                </div>
              </div>
            </AnimatedComponent>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
