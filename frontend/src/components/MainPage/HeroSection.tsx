// src/components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-32 lg:pt-40 mt-20">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 m-4">
        <Image
          src="/recourses/img/HeroSectionBG.jpg"
          alt="Background"
          fill // Utiliza fill para expandir la imagen al contenedor
          style={{ objectFit: 'cover' }} // Aplica objectFit con style
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-75 rounded-2xl"  />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white p-8 sm:p-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
          Aprende de forma interactiva
        </h2>
        <p className="mt-2 text-lg sm:text-xl drop-shadow-md max-w-lg mx-auto">
          Explora módulos personalizados que se adaptan a tus necesidades.
        </p>
        <button className="mt-6 bg-white text-green-500 px-8 py-3 rounded-lg hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105 shadow-lg">
          Comenzar Ahora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
