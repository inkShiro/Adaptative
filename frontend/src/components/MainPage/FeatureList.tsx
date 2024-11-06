// src/components/FeatureList.tsx
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';

const features = [
  { title: 'Registro y Autenticación Segura', description: 'Facilita la creación de cuentas y la gestión de sesiones de manera segura.' },
  { title: 'Evaluación de Desempeño Inmediata', description: 'Proporciona retroalimentación instantánea sobre el rendimiento del usuario.' },
  { title: 'Sistema de Notificaciones', description: 'Mantiene a los usuarios informados sobre su progreso y recordatorios importantes.' },
  { title: 'Interfaz de Usuario Amigable', description: 'Asegura una navegación intuitiva y accesible para todos.' },
  { title: 'Escalabilidad Automática', description: 'Ajusta los recursos según la demanda para mantener el rendimiento óptimo.' },
];

const FeatureList: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="p-10 bg-gray-100">
      <div className="shadow-lg p-8 bg-blue-200 rounded-lg max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-6">Características Destacadas</h3>
        <Slider {...settings}>
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl text-center">
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeatureList;
