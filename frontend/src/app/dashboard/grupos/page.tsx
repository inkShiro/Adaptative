// src/app/dashboard/grupos/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Dashboard/Navbar';
import SettingsDrawer from '../../../components/Dashboard/SettingsDrawer';
import AnimatedComponent from '../../../components/Efectos/AnimatedComponent';

const GroupsPage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<any[]>([]); // Para almacenar los grupos
  const [error, setError] = useState<string | null>(null);

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);

    // Simulación de datos de grupos de ejemplo
    const simulatedGroups = [
      { id: 1, name: 'Grupo de Matemáticas', description: 'Estudia y resuelve problemas matemáticos en grupo.' },
      { id: 2, name: 'Grupo de Ciencias', description: 'Realiza experimentos y estudios sobre ciencias.' },
      { id: 3, name: 'Grupo de Historia', description: 'Discute y analiza eventos históricos importantes.' },
      { id: 4, name: 'Grupo de Arte', description: 'Comparte técnicas y proyectos de arte.' },
    ];

    setGroups(simulatedGroups);
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

      <h1 className="text-4xl font-bold mb-4 mt-8">Grupos</h1>
      
      {loading ? (
        <p className="text-gray-500">Cargando grupos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {groups.map(group => (
            <AnimatedComponent key={group.id}>
              <div className="bg-white shadow-md rounded-lg p-6 transition-transform hover:scale-105">
                <h2 className="text-2xl font-semibold mb-2">{group.name}</h2>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex justify-between">
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Ver Más
                  </button>
                  <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Unirse
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

export default GroupsPage;
