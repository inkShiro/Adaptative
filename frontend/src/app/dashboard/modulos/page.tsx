"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Dashboard/Navbar';
import SettingsDrawer from '../../../components/Dashboard/SettingsDrawer';
import AnimatedComponent from '../../../components/Efectos/AnimatedComponent';
import { useRouter } from 'next/navigation'; // Usamos el useRouter de next/navigation

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

const ModulesPage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<any[]>([]); // Para almacenar los módulos
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Para asegurarse de que el componente está montado

  const router = useRouter(); // Usamos el hook useRouter de next/navigation
  
  useEffect(() => {
    setIsMounted(true); // Establece isMounted a true una vez que el componente está montado en el cliente
  }, []);

  useEffect(() => {
    if (isMounted) {
      const userRole = localStorage.getItem('userRole');
      setRole(userRole);

      // Hacer fetch a la API para obtener los módulos (áreas)
      const fetchModules = async () => {
        try {
          const response = await fetch(`${baseURL}/api/areas`);
          if (!response.ok) {
            throw new Error('Error al obtener los módulos');
          }
          const data = await response.json();
          setModules(data);
          setLoading(false);
        } catch (error) {
          setError('No se pudieron cargar los módulos');
          setLoading(false);
        }
      };

      fetchModules();
    }
  }, [isMounted]);

  const dashboardStyles =
    role === 'student' ? 'bg-blue-100' :
    role === 'teacher' ? 'bg-green-100' : 
    'bg-gray-100';

  const handleStart = (id: number) => {
    router.push(`/dashboard/modulos/${id}`);
  };

  if (!isMounted) return null; // Si no está montado, no renderiza nada

  return (
    <div className={`p-8 ${dashboardStyles}`}>
      <Navbar role={role} onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

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
                <h2 className="text-2xl font-semibold mb-2">{module.area}</h2>
                <p className="text-gray-600 mb-4">{module.descripcion}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleStart(module.id)} // Redirige al hacer clic en 'Comenzar'
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
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
