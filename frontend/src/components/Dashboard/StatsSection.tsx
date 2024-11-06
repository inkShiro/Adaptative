// src/components/StatsSection.tsx
import React from 'react';

const StatsSection: React.FC = () => (
  <section className="py-8 bg-blue-50 text-center">
    <h2 className="text-3xl font-bold mb-6">Estadísticas</h2>
    <div className="flex justify-around">
      <div>
        <h3 className="text-5xl font-bold text-blue-600">500+</h3>
        <p className="text-gray-600">Usuarios Activos</p>
      </div>
      <div>
        <h3 className="text-5xl font-bold text-blue-600">50+</h3>
        <p className="text-gray-600">Módulos Disponibles</p>
      </div>
      <div>
        <h3 className="text-5xl font-bold text-blue-600">200+</h3>
        <p className="text-gray-600">Proyectos Completados</p>
      </div>
    </div>
  </section>
);

export default StatsSection;
