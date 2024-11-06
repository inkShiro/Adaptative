// src/components/PricingSection.tsx
import React from 'react';

const plans = [
  { name: "Básico", price: "Gratis", features: ["Acceso limitado a módulos", "Soporte comunitario"] },
  { name: "Premium", price: "$9.99/mes", features: ["Acceso ilimitado a módulos", "Soporte prioritario", "Personalización avanzada"] }
];

const PricingSection: React.FC = () => (
  <section className="py-8 text-center">
    <h2 className="text-3xl font-bold mb-6">Planes de Precios</h2>
    <div className="flex justify-around">
      {plans.map((plan, index) => (
        <div key={index} className="bg-white p-6 shadow-md rounded-lg max-w-xs">
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
          <ul className="mt-4 text-left">
            {plan.features.map((feature, i) => (
              <li key={i} className="text-gray-700">• {feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default PricingSection;
