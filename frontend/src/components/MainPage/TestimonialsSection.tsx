// src/components/TestimonialsSection.tsx
import React from 'react';

const testimonials = [
  { name: "Juan Pérez", text: "Esta plataforma me ayudó a mejorar mis habilidades rápidamente." },
  { name: "Ana Gómez", text: "La personalización del aprendizaje es excelente." },
  { name: "Luis Martínez", text: "Recomiendo esta plataforma a cualquiera que quiera aprender de forma efectiva." }
];

const TestimonialsSection: React.FC = () => (
  <section className="py-12 bg-gray-100 text-center">
    <h2 className="text-3xl font-bold mb-8">Testimonios de Usuarios</h2>
    <div className="flex justify-center gap-6 flex-wrap">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white p-6 shadow-md rounded-lg max-w-xs text-left">
          <p className="text-gray-700">{testimonial.text}</p>
          <h4 className="mt-4 text-blue-600 font-bold">{testimonial.name}</h4>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
