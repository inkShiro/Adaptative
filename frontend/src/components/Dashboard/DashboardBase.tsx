// src/components/DashboardBase.tsx
"use client";
import React, { useEffect, useState } from 'react';

const DashboardComponent: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtiene el rol del usuario desde localStorage
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);
  }, []);

  const renderContentByRole = () => {
    switch (role) {
      case 'student':
        return <p>Bienvenido, Estudiante. Aquí está tu contenido.</p>;
      case 'teacher':
        return <p>Bienvenido, Profesor. Aquí están tus herramientas de enseñanza.</p>;
      case 'admin':
        return <p>Bienvenido, Administrador. Aquí tienes el control total de la plataforma.</p>;
      default:
        return <p>Rol desconocido. Por favor, contacta con soporte.</p>;
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow mt-8 mb-4 ">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a tu Dashboard</h1>
      {renderContentByRole()}
    </div>
  );
};

export default DashboardComponent;
