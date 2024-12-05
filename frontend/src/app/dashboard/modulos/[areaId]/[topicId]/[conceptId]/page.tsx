"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Dashboard/Navbar";
import SettingsDrawer from "@/components/Dashboard/SettingsDrawer";
import ExerciseComponent from "@/components/Modulos/ExerciseComponent";

interface ConceptData {
  id: number;
  concepto: string;
  descripcion: string;
  tema: {
    id: number;
    tema: string;
    descripcion: string;
    area: {
      id: number;
      area: string;
      descripcion: string;
    };
  };
}

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

const ConceptPage: React.FC = () => {
  const { conceptId } = useParams();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [concept, setConcept] = useState<ConceptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    const fetchConcept = async () => {
      if (!conceptId) return;

      try {
        const response = await fetch(`${baseURL}/api/content/concept/${conceptId}`);
        if (!response.ok) {
          throw new Error("Error al cargar los datos del concepto");
        }
        const data: ConceptData = await response.json();
        setConcept(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información del concepto");
      } finally {
        setLoading(false);
      }
    };

    fetchConcept();
  }, [conceptId]);

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  const renderDescriptionSections = (text: string) => {
    const sections = ["Concepto", "Descripción", "Tema", "Área"];
    return text.split(new RegExp(`(${sections.join("|")})`, "g")).map((part, index) => {
      if (sections.includes(part)) {
        return (
          <h3 key={index} className="text-xl font-semibold text-blue-700 mt-4">
            {part}:
          </h3>
        );
      }
      return <p key={index} className="text-gray-700 mt-2 leading-relaxed">{part}</p>;
    });
  };

  if (loading) {
    return <p className="text-gray-500">Cargando concepto...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!concept) {
    return <p className="text-gray-500">No se encontró información para este concepto.</p>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <Navbar role={role} onSettingsClick={toggleSettingsDrawer} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={toggleSettingsDrawer} />

      <h1 className="text-4xl font-bold mb-4 mt-8">{concept.concepto}</h1>

      {/* Sección de ejercicio */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mt-4">Ejercicio</h2>
        <ExerciseComponent conceptId={concept.id} mode= {0} />
      </div>

      <div className="border-t border-gray-200 pt-4">
        {renderDescriptionSections(concept.descripcion)}
      </div>

      <h2 className="text-2xl font-semibold mt-6">Tema</h2>
      <p className="mb-2"><strong>Nombre:</strong> {concept.tema.tema}</p>
      <p className="mb-2"><strong>Descripción:</strong> {concept.tema.descripcion}</p>

      <h2 className="text-2xl font-semibold mt-6">Área</h2>
      <p className="mb-2"><strong>Nombre:</strong> {concept.tema.area.area}</p>
      <p className="mb-2"><strong>Descripción:</strong> {concept.tema.area.descripcion}</p>
    </div>
  );
};

export default ConceptPage;
