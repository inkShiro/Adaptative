"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../components/Dashboard/Navbar';
import SettingsDrawer from '../../../../components/Dashboard/SettingsDrawer';
import TopicList from '@/components/Modulos/TopicList';

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

interface Module {
  id: number;
  area: string;
  descripcion: string;
}

const ModulePage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<Module | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Obtener los parámetros de la URL
  const { areaId, topicId } = useParams();

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);

    const fetchModuleAndTopics = async () => {
      if (!areaId) return;

      try {
        // Fetch para obtener la información del módulo
        const moduleResponse = await fetch(`${baseURL}/api/areas/${areaId}`);
        if (!moduleResponse.ok) {
          throw new Error('Error al obtener la información del módulo');
        }
        const moduleData: Module = await moduleResponse.json();
        setModule(moduleData);

        // Fetch para obtener los temas relacionados con el área del módulo
        const topicsResponse = await fetch(`${baseURL}/api/content/theme/${moduleData.id}`);
        if (!topicsResponse.ok) {
          throw new Error('Error al obtener los temas');
        }
        const topicsData = await topicsResponse.json();
        setTopics(topicsData);

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudo cargar la información del módulo o los temas');
        setLoading(false);
      }
    };

    fetchModuleAndTopics();
  }, [areaId]);

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
      ) : module ? (  // Verificación de nulidad
        <div>
          <p className="text-gray-600">{module?.descripcion}</p>
          {/* Muestra la lista de temas */}
          <TopicList topics={topics} areaId={module.id} />
        </div>
      ) : (
        <p className="text-gray-500">No se pudo encontrar la información del módulo.</p>
      )}
    </div>
  );
};

export default ModulePage;
