"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Dashboard/Navbar";
import SettingsDrawer from "@/components/Dashboard/SettingsDrawer";
import ConceptList from "@/components/Modulos/ConceptList";

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

interface TopicContent {
  id: number;
  concepto: string;
  descripcion: string;
  temaId: number;
  complejidad: number;
  tema: {
    id: number;
    tema: string;
    descripcion: string;
    areaId: number;
    complejidad: number | null;
    area: {
      id: number;
      area: string;
      descripcion: string;
    };
  };
}

const TopicContentPage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topicContents, setTopicContents] = useState<TopicContent[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Obtener los parámetros de la URL
  const { areaId, topicId } = useParams();
  const router = useRouter(); // Hook para manejar la navegación

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);

    const fetchTopicContent = async () => {
      if (!areaId || !topicId) return;

      try {
        // Fetch para obtener la lista de conceptos relacionados con el tema específico
        const topicContentResponse = await fetch(
          `${baseURL}/api/content/concepts/theme/${topicId}`
        );
        if (!topicContentResponse.ok) {
          throw new Error("Error al obtener la información del tema");
        }
        const topicContentData: TopicContent[] = await topicContentResponse.json();
        setTopicContents(topicContentData);

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError("No se pudo cargar la información del tema");
        setLoading(false);
      }
    };

    fetchTopicContent();
  }, [areaId, topicId]);

  const handleConceptClick = (conceptId: number) => {
    if (!areaId || !topicId) return;
    // Redirige al usuario a la página del concepto
    router.push(`/dashboard/modulos/${areaId}/${topicId}/${conceptId}`);
  };

  const dashboardStyles =
    role === "student"
      ? "bg-blue-100"
      : role === "teacher"
      ? "bg-green-100"
      : "bg-gray-100";

  return (
    <div className={`p-8 ${dashboardStyles}`}>
      <Navbar role={role} onSettingsClick={toggleSettingsDrawer} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={toggleSettingsDrawer} />

      <h1 className="text-4xl font-bold mb-4 mt-8">Contenido del Tema</h1>

      {loading ? (
        <p className="text-gray-500">Cargando contenido...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ConceptList
          concepts={topicContents.map((concept) => ({
            ...concept,
            onButtonClick: () => handleConceptClick(concept.id), // Agregamos la función al botón
          }))}
        />
      )}
    </div>
  );
};

export default TopicContentPage;
