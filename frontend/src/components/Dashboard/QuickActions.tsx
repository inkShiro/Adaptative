// src/components/QuickActions.tsx
import React from 'react';
import { FaBook, FaTasks, FaUsers, FaChartLine, FaComments, FaUserPlus } from 'react-icons/fa';

const QuickActions: React.FC<{ role: string | null }> = ({ role }) => {
  const actions = role === 'student' 
    ? [
        { label: 'Continuar Curso', icon: <FaBook /> },
        { label: 'Ver Tareas Pendientes', icon: <FaTasks /> },
        { label: 'Acceder a Recursos', icon: <FaChartLine /> }
      ]
    : role === 'teacher'
    ? [
        { label: 'Crear Tarea', icon: <FaTasks /> },
        { label: 'Revisar Progreso', icon: <FaChartLine /> },
        { label: 'Comunicar con Estudiantes', icon: <FaComments /> }
      ]
    : [
        { label: 'Gestionar Usuarios', icon: <FaUsers /> },
        { label: 'Ver Reportes', icon: <FaChartLine /> },
        { label: 'Configurar Plataforma', icon: <FaUserPlus /> }
      ];

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Acciones Rápidas</h2>
      <ul className="space-y-2">
        {actions.map((action, index) => (
          <li key={index} className="flex items-center">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition flex items-center">
              <span className="mr-2">{action.icon}</span>
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickActions;
