// src/components/FAQSection.tsx
import React from 'react';

const faqs = [
  { question: "¿Cómo funciona la plataforma?", answer: "Nuestra plataforma se adapta a tu forma de aprender mediante ejercicios personalizados." },
  { question: "¿Puedo usarla de forma gratuita?", answer: "Sí, ofrecemos un plan gratuito con acceso limitado." }
];

const FAQSection: React.FC = () => (
  <section className="py-8 bg-gray-100">
    <h2 className="text-3xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold text-blue-600">{faq.question}</h3>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FAQSection;
