// src/components/ProgressSummary.tsx
import React from 'react';

const ProgressSummary: React.FC<{ role: string | null }> = ({ role }) => {
  const progress = role === 'student' ? 75 : role === 'teacher' ? 60 : 90; // Ejemplo de progreso
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Resumen de Progreso</h2>
      <p>{role === 'student' ? 'Tu progreso en cursos:' : 'Progreso de tus estudiantes:'}</p>
      <div className="mt-2">
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-sm">{progress}% completado</p>
      </div>
    </div>
  );
};

export default ProgressSummary;
