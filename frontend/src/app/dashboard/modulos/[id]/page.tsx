"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Usamos useParams en lugar de useRouter
import Navbar from '../../../../components/Dashboard/Navbar';
import SettingsDrawer from '../../../../components/Dashboard/SettingsDrawer';

const ModulePage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<any>(null); // Para almacenar la información del módulo
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams(); // Ahora usamos useParams para acceder al parámetro 'id' de la URL

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);

    // Hacer fetch a la API para obtener la información general del módulo
    const fetchModule = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:4000/api/areas/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la información del módulo');
        }
        const data = await response.json();
        setModule(data);
        setLoading(false);
      } catch (error) {
        setError('No se pudo cargar la información del módulo');
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  const dashboardStyles =
    role === 'student' ? 'bg-blue-100' :
    role === 'teacher' ? 'bg-green-100' : 
    'bg-gray-100';

  return (
    <div className={`p-8 ${dashboardStyles}`}>
      <Navbar role={role} onSettingsClick={toggleSettingsDrawer} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={toggleSettingsDrawer} />

      <h1 className="text-4xl font-bold mb-4 mt-8">Módulo: {module?.area}</h1>
      
      {loading ? (
        <p className="text-gray-500">Cargando módulo...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">{module?.area}</h2>
          <p className="text-gray-600">{module?.descripcion}</p>
          {/* Resumen del módulo, como objetivos, contenido general, etc. */}
        </div>
      )}
    </div>
  );
};

export default ModulePage;
