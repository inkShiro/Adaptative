// src/components/Notifications.tsx
import React from 'react';

const notifications = [
  'Tienes una nueva tarea pendiente.',
  'Revisa las actualizaciones de la plataforma.',
  'Próximo evento: Webinar sobre métodos de enseñanza.',
];

const Notifications: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Notificaciones</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="border-b py-2">
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
