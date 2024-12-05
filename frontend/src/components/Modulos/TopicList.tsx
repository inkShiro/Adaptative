// src/components/Dashboard/TopicList.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface Topic {
  id: number;
  tema: string;
}

interface TopicListProps {
  topics: Topic[];
  areaId: number; // Añadido para pasar el id del área
}

const TopicList: React.FC<TopicListProps> = ({ topics, areaId }) => {
  const router = useRouter(); // Hook para manejar la navegación

  if (topics.length === 0) {
    return <p className="text-gray-500">No hay temas disponibles para este módulo.</p>;
  }

  const handleAccessClick = (topicId: number) => {
    // Redirige a la ruta correspondiente con el id del área y el id del tema
    router.push(`/dashboard/modulos/${areaId}/${topicId}`);
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Temas:</h3>
      <ul className="space-y-3">
        {topics.map((topic) => (
          <li key={topic.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
            <span className="text-gray-700 font-medium">{topic.tema}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleAccessClick(topic.id)}
            >
              Acceder
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
