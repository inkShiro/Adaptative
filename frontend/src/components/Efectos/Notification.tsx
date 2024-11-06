// src/components/Notification.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void; // Prop para cerrar la notificación
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Cambia la visibilidad a falso después de 3 segundos
    }, 3000); // Tiempo antes de comenzar a desvanecer

    const fadeOutTimer = setTimeout(() => {
      onClose(); // Llama a onClose después de que la animación se complete
    }, 3500); // Llama a onClose después de un tiempo adicional para el desvanecimiento

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
    };
  }, [onClose]);

  return (
    <motion.div
      className={`fixed top-4 right-4 p-4 mb-4 text-white rounded shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: isVisible ? 1 : 0 }} // Cambia la opacidad y la posición
      exit={{ x: 300, opacity: 0 }} // Animación de salida
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.div>
  );
};

export default Notification;
