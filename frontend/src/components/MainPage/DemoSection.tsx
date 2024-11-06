// src/components/DemoSection.tsx
import React from 'react';

const DemoSection: React.FC = () => (
  <section className="py-8 text-center">
    <h2 className="text-3xl font-bold mb-6">Demo</h2>
    <p className="text-gray-700 mb-4">Mira cómo funciona nuestra plataforma en esta breve demostración.</p>
    <div className="flex justify-center">
      <div className="relative w-2/4 h-96 bg-gray-200 rounded-lg overflow-hidden">
        <iframe
          className="absolute w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Demo Video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </section>
);

export default DemoSection;
