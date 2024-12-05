"use client";
import React from "react";
import { FaBook, FaLightbulb, FaQuoteRight } from "react-icons/fa";

interface Concept {
  id: number;
  concepto: string;
  descripcion: string;
  onButtonClick: () => void; // Asegúrate de definir esta propiedad
}

interface ConceptListProps {
  concepts: Concept[];
}

const ConceptList: React.FC<ConceptListProps> = ({ concepts }) => {
  const renderDescriptionSections = (text: string) => {
    const sections = ["Concepto", "Descripción", "Ejemplo", "Fuente"];
    return text.split(new RegExp(`(${sections.join("|")})`, "g")).map((part, index) => {
      if (sections.includes(part)) {
        let icon;
        switch (part) {
          case "Concepto":
            icon = <FaBook className="inline-block text-blue-700 mr-2" />;
            break;
          case "Descripción":
            icon = <FaLightbulb className="inline-block text-green-600 mr-2" />;
            break;
          case "Ejemplo":
            icon = <FaQuoteRight className="inline-block text-orange-500 mr-2" />;
            break;
          case "Fuente":
            icon = <FaBook className="inline-block text-purple-700 mr-2" />;
            break;
        }
        return (
          <h3 key={index} className="text-xl font-semibold text-blue-700 mt-4 flex items-center">
            {icon}
            {part}:
          </h3>
        );
      }
      return <p key={index} className="text-gray-700 mt-2 leading-relaxed">{part}</p>;
    });
  };

  return (
    <div className="space-y-8">
      {concepts.length > 0 ? (
        concepts.map((concept) => (
          <div
            key={concept.id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
          >
            <h2 className="text-3xl font-bold text-indigo-600 mb-4 border-b-2 border-indigo-200 pb-2">
              {concept.concepto}
            </h2>
            <div className="border-t border-gray-200 pt-4">
              {renderDescriptionSections(concept.descripcion)}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded hover:bg-indigo-600 transition-colors"
                onClick={concept.onButtonClick} // Asigna la función aquí
              >
                Simular un ejercicio
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center font-medium">
          No hay conceptos disponibles para este tema.
        </p>
      )}
    </div>
  );
};

export default ConceptList;
