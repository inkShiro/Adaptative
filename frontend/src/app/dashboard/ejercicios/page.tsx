"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Dashboard/Navbar";
import { useRouter } from "next/navigation";
import { log } from "console";

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

const EjerciciosPage: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [topics, setTopics] = useState<{ id: number; area: string; descripcion: string }[]>([]);
    const [selectedThemeContent, setSelectedThemeContent] = useState<{ id: number; tema: string; descripcion: string }[]>([]);
    const [themeLoading, setThemeLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [progreso, setProgreso] = useState<{ [key: number]: number }>({}); // Usamos `number` como clave para `id`
    const router = useRouter();
  
    useEffect(() => {
      const storedRole = localStorage.getItem("userRole");
      setRole(storedRole);
    }, []);
  
    useEffect(() => {
      fetchModules(); // Llamar al fetch de módulos al montar el componente
    }, []);
  
    const fetchModules = async () => {
      try {
        console.log("Fetching modules...");
        const response = await fetch(`${baseURL}/api/areas`);
        if (!response.ok) throw new Error("Error al obtener los módulos");
        const data = await response.json();
        console.log("Modules fetched successfully:", data);
        setTopics(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setError("No se pudieron cargar los módulos");
      } finally {
        setLoading(false);
      }
    };
  
    // Realizar el fetch para obtener el contenido del tema seleccionado
    const fetchThemeContent = async (topicId: number) => {
      try {
        console.log(`Fetching content for topic ID: ${topicId}`);
        setThemeLoading(true);
        const response = await fetch(`${baseURL}/api/content/theme/${topicId}`);
        if (!response.ok) throw new Error("Error al obtener el contenido del tema");
        const data = await response.json();
        console.log("Theme content fetched successfully:", data);
        fetchProgressData(data, topicId); // Cargar progreso cuando se obtiene el contenido
        setSelectedThemeContent(data); // Actualizamos el contenido seleccionado
      } catch (error) {
        console.error("Error fetching theme content:", error);
        setError("No se pudo cargar el contenido del tema");
      } finally {
        if (Array.isArray(selectedThemeContent) && selectedThemeContent.length === 0) {
            setThemeLoading(false);
        }
      }
    };
  
    // Realizar el fetch para obtener el progreso del tema
    const fetchProgressData = async (content: { id: number; descripcion: string }[], areaId: number) => {
        const userId = localStorage.getItem("userID"); // Suponiendo que el userId está almacenado en localStorage
        console.log(content);
        console.log(userId);
      
        if (userId && content.length > 0) {
          console.log("Fetching progress data...");
      
          // Hacer fetch de los progresos de todos los temas dentro del área
          const response = await fetch(
            `${baseURL}/api/rendimiento-de-aprendizaje/area/${userId}/${areaId}`
          );
      
          if (!response.ok) {
            console.error("Error fetching progress data for all topics in area.");
            setError("Error al obtener el progreso del área");
          } else {
            const data = await response.json();
            console.log("Progress data for all topics:", data);
      
            const progressMap: { [key: number]: number } = {}; // Usamos `number` como clave para `id`
      
            // Asignamos el progreso de cada tema al mapa utilizando el `temaId` del contenido
            data.forEach((tema: { temaId: number; progreso: number }) => {
              progressMap[tema.temaId] = tema.progreso; // Asociamos `temaId` con el progreso
            });
      
            // Ahora que tenemos los progresos, actualizamos los contenidos con sus respectivos progresos
            const updatedContent = content.map((item) => ({
              ...item,
              progreso: progressMap[item.id] || 0, // Asignamos el progreso del mapa, si no existe asignamos 0
            }));
      
            console.log(updatedContent);
            setProgreso(progressMap); // Actualizamos el estado del progreso
            setThemeLoading(false);
          }
        }
      };
      
  
    useEffect(() => {
      if (selectedTopic && topics.length > 0) {
        const selectedTopicId = topics.find((topic) => topic.area === selectedTopic)?.id;
        if (selectedTopicId) {
          fetchThemeContent(selectedTopicId); // Llamar al fetch de contenido cuando el tema cambie
        }
      }
    }, [selectedTopic, topics]);
  
    const handleSelectTopic = (topic: string) => {
      setSelectedTopic(topic);
      setSelectedThemeContent([]); // Limpiar contenido cuando se cambia el tema
    };
  
    const handleStartExercise = (topicId: string) => {
        if (topicId) {
          console.log(`Navigating to exercises for topic: ${topicId}`);
          router.push(`/dashboard/ejercicios/${topicId}`);
        } else {
          alert("Por favor, selecciona un tema primero");
        }
      };      
  
    if (!role) return null; // Evitar que se ejecute código del router si no hay rol
  
    const dashboardStyles =
      role === "student"
        ? "bg-blue-100"
        : role === "teacher"
        ? "bg-green-100"
        : "bg-gray-100";
  
        return (
            <div className={`p-8 ${dashboardStyles} min-h-screen`}>
              <Navbar role={role} onSettingsClick={() => console.log("Settings clicked")} />
        
              <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6 mt-8">Selecciona un Tema para los Ejercicios</h1>
        
                {loading ? (
                  <p className="text-center text-gray-500">Cargando temas...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-4">Temas Disponibles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => handleSelectTopic(topic.area)}
                          className={`w-full py-2 rounded transition duration-200 
                            ${selectedTopic === topic.area ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} 
                            hover:bg-blue-500 hover:text-white`}
                        >
                          {topic.area}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
        
                {selectedTopic && themeLoading ? (
                  <p className="text-center text-gray-500">Cargando contenido del tema...</p>
                ) : selectedTopic && selectedThemeContent.length === 0 ? (
                  <p className="text-center text-gray-500">No se ha encontrado contenido para este tema.</p>
                ) : selectedTopic && selectedThemeContent.length > 0 ? (
                  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-4">Contenido del Tema</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedThemeContent.map((content) => (
                        <div
                          key={content.id}
                          className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col h-full"
                        >
                          <h4 className="text-lg font-semibold">{content.tema}</h4>
                          <p className="text-sm text-gray-700 flex-grow">{content.descripcion}</p>
                          {progreso[content.id] !== undefined && (
                            <div className="mt-4">
                              <div className="text-sm text-gray-500">Progreso</div>
                              <div className="w-full bg-gray-300 rounded-full h-2.5">
                                <div
                                  className="bg-green-500 h-2.5 rounded-full"
                                  style={{ width: `${progreso[content.id]}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-700">{progreso[content.id]}%</span>
                            </div>
                          )}
                          <button
                            onClick={() => handleStartExercise(content.id.toString())} 
                            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 mt-4"
                          >
                            Empezar Ejercicios
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  selectedTopic && !selectedThemeContent && <p className="text-center text-gray-500">No se encontró contenido para este tema.</p>
                )}
              </div>
            </div>
          );
        };
  

export default EjerciciosPage;
