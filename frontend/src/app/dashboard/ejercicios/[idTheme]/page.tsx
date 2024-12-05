"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Dashboard/Navbar";
import { useRouter, useParams } from "next/navigation";
import ExerciseComponent from "@/components/Modulos/ExerciseComponent";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

const EjerciciosPage: React.FC = () => {
  const { idTheme } = useParams(); // Obtener el parámetro idTheme de la URL
  const [role, setRole] = useState<string | null>(null);
  const [selectedTestMode, setSelectedTestMode] = useState<"all" | "selected">("all"); // "all" o "selected"
  const [selectedQuestionMode, setSelectedQuestionMode] = useState<"random" | "specific" | "timer" | "normal" | "others">("random"); // "random", "specific", "timer", "normal", "others"
  const [isTestReady, setIsTestReady] = useState(false); // Para controlar cuándo mostrar el componente de ejercicios
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Para controlar la visibilidad del menú desplegable
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]); // Para almacenar los temas seleccionados
  const [questionCount, setQuestionCount] = useState<number>(10); // Nuevo estado para la cantidad de preguntas
  const [userID, setUserID] = useState<string | null>(null);
  const [rendimientoData, setRendimientoData] = useState<any>(null); 
  const [exercisesData, setExercisesData] = useState<
  { 
    question: string; 
    options: number[]; 
    correctAnswer: number; 
    explanation: string; 
    difficulty: number; 
    typeLabel: string; 
    bars?: { redBar: number; blueBar: number }; 
    points?: { group1: { x: number; y: number }[]; group2: { x: number; y: number }[] };
  }[] 
>([]);
    const router = useRouter();

  type DataType = Record<string, number>;

  type LearningStyle =
  | "visual"
  | "auditivo"
  | "kinestesico"
  | "lectura-escritura"
  | "secuencial"
  | "global"
  | "activo"
  | "reflexivo"
  | "social"
  | "individual";

  // Definir el tipo para el objeto 'resultado'
  interface Resultado {
    seleccionados: LearningStyle[];  // Array de estilos de aprendizaje
  }

  type exercises = {  // Cambiar a un arreglo de ejercicios
    question: string;
    options: number[];
    correctAnswer: number;
    explanation: string;
    difficulty: number;
    typeLabel: string;
    bars?: {
      redBar: number;
      blueBar: number;
    };
    points?: {
      group1: { x: number, y: number }[];
      group2: { x: number, y: number }[];
    };
  }[];
  
  type AprendizajeData = {
    aprendizajeVisual: number;
    aprendizajeAuditivo: number;
    aprendizajeKinestesico: number;
    aprendizajeLecturaEscritura: number;
    aprendizajeSecuencial: number;
    aprendizajeGlobal: number;
    aprendizajeActivo: number;
    aprendizajeReflexivo: number;
    aprendizajeSocial: number;
    aprendizajeIndividual: number;
  };

  // Lista simulada de temas disponibles (esto debería venir de la base de datos o API)
  const availableTopics = [
    { id: 1, name: "suma" },
    { id: 2, name: "resta" },
    { id: 3, name: "multiplicación" },
    { id: 4, name: "división" },
    { id: 5, name: "fracciones" }
  ];

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);
    
    console.log("Datos en localStorage:");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key || '');
      console.log(`${key}: ${value}`);
    }

    if (storedUserID) {
      axios
        .get(`${baseURL}/api/rendimiento-de-aprendizaje/${storedUserID}`)
        .then((response) => {
          setRendimientoData(response.data); // Almacenar los datos de la respuesta
          console.log("Datos de rendimiento de aprendizaje:", response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos de rendimiento:", error);
        });
    }

  }, []);

  useEffect(() => {
    if (rendimientoData !== null) {
      // Ahora que rendimientoData ha sido actualizado, podemos mostrarlo
      console.log("Datos de rendimiento de aprendizaje:", rendimientoData);
      
      const datosAdaptados = adaptarDatosAprendizaje(rendimientoData);
      console.log(rendimientoData);
      const cantidadPreguntas = 8;
      const resultado = seleccionarAprendizaje(datosAdaptados, cantidadPreguntas);

      console.log("Tipos de Aprendizaje Seleccionados:", resultado.seleccionados);
      console.log("Porcentajes:", resultado);
      console.log(transformarEstilos(resultado.seleccionados));
      const AxionsDataQuestions: Resultado = {
        seleccionados: transformarEstilos(resultado.seleccionados) // Aquí se envuelve el arreglo dentro del objeto
      };
      
      const preguntasgeneradas = generarPreguntas(AxionsDataQuestions);
      console.log(preguntasgeneradas);
    }
    
  }, [rendimientoData]);

  if (!role) return null; // Evitar que se ejecute código del router si no hay rol

  const dashboardStyles =
    role === "student"
      ? "bg-blue-100"
      : role === "teacher"
      ? "bg-green-100"
      : "bg-gray-100";

  // Convertir idTheme a número si es un string
  const conceptId = Array.isArray(idTheme) ? parseInt(idTheme[0], 10) : parseInt(idTheme, 10);

  function seleccionarAprendizaje(data: DataType, cantidadPreguntas: number): {
    seleccionados: string[]; // Lista con los aprendizajes seleccionados
    porcentajes: Record<string, number>; // Porcentajes de probabilidad de cada tipo
  } {
    // Ajustar puntuaciones negativas a positivas sumando un offset
    const valores = Object.values(data); // Ahora tiene un tipo explícito: number[]
    const minValor = Math.min(...valores);
    const offset = Math.abs(minValor) + 1; // Offset para asegurar que el mínimo sea al menos 1
    const ajustes = Object.fromEntries(
      Object.entries(data).map(([clave, valor]) => [clave, valor + offset])
    );
  
    // Sumar las puntuaciones ajustadas
    const sumaTotal = Object.values(ajustes).reduce((a, b) => a + b, 0);
  
    // Calcular probabilidades acumuladas y porcentajes
    const acumulados: { clave: string; probabilidadAcumulada: number }[] = [];
    const porcentajes: Record<string, number> = {};
    let acumulador = 0;
  
    for (const [clave, valor] of Object.entries(ajustes)) {
      const porcentaje = (valor / sumaTotal) * 100;
      porcentajes[clave] = porcentaje;
      acumulador += valor / sumaTotal; // Convertir a proporción
      acumulados.push({ clave, probabilidadAcumulada: acumulador });
    }
  
    // Generar los aprendizajes seleccionados según la cantidad de preguntas
    const seleccionados: string[] = [];
    for (let i = 0; i < cantidadPreguntas; i++) {
      // Generar un número aleatorio entre 0 y 1
      const aleatorio = Math.random();
  
      // Seleccionar el aprendizaje según el número aleatorio
      let seleccionado: string | null = null;
      for (const { clave, probabilidadAcumulada } of acumulados) {
        if (aleatorio <= probabilidadAcumulada) {
          seleccionado = clave;
          break;
        }
      }
  
      if (seleccionado) {
        seleccionados.push(seleccionado);
      }
    }
  
    return { seleccionados, porcentajes };
  }

  function transformarEstilos(estilos: string[]): LearningStyle[] {
    const mapaEstilos: Record<string, LearningStyle> = {
      "aprendizajeVisual": "visual",
      "aprendizajeAuditivo": "auditivo",
      "aprendizajeKinestesico": "kinestesico",
      "aprendizajeLecturaEscritura": "lectura-escritura",
      "aprendizajeSecuencial": "secuencial",
      "aprendizajeGlobal": "global",
      "aprendizajeActivo": "activo",
      "aprendizajeReflexivo": "reflexivo",
      "aprendizajeSocial": "social",
      "aprendizajeIndividual": "individual"
    };
  
    return estilos.map(estilo => mapaEstilos[estilo]);
  }

  // Función para generar preguntas
  async function generarPreguntas(resultado: Resultado) {
    // Arreglo para almacenar las preguntas generadas
    const preguntasGeneradas: any[] = [];
  
    // Iterar sobre los estilos de aprendizaje seleccionados
    for (const learningStyle of resultado.seleccionados) {
      const data = {
        concept: "suma",  // Concepto que se puede cambiar según el contexto
        type: 1,          // Tipo de pregunta que puedes cambiar
        learningStyle: learningStyle, // Ya está en el formato correcto
        "previous_performance": 0.5,
        "total_questions": 30
      };
  
      try {
        // Realizar la solicitud POST
        const response = await axios.post(`${baseURL}/api/question/generateQuestion`, data);
        
        // Almacenar la pregunta generada en el arreglo
        preguntasGeneradas.push(response.data);
        console.log(`Pregunta generada para estilo de aprendizaje: ${learningStyle}`, response.data);
      } catch (error) {
        console.error(`Error al generar pregunta para estilo de aprendizaje: ${learningStyle}`, error);
      }
    }
  
    // Devolver el arreglo con las preguntas generadas
    return preguntasGeneradas;
  }

  function adaptarDatosAprendizaje(response: any): AprendizajeData {
    // Extraemos solo los datos relacionados con el aprendizaje
    const { aprendizajeVisual, aprendizajeAuditivo, aprendizajeKinestesico, aprendizajeLecturaEscritura, 
            aprendizajeSecuencial, aprendizajeGlobal, aprendizajeActivo, aprendizajeReflexivo, 
            aprendizajeSocial, aprendizajeIndividual } = response;
  
    // Devolvemos el objeto con solo las propiedades deseadas
    return {
      aprendizajeVisual,
      aprendizajeAuditivo,
      aprendizajeKinestesico,
      aprendizajeLecturaEscritura,
      aprendizajeSecuencial,
      aprendizajeGlobal,
      aprendizajeActivo,
      aprendizajeReflexivo,
      aprendizajeSocial,
      aprendizajeIndividual,
    };
  }

  // Función para manejar la selección de la prueba (todos o seleccionados)
  const handleTestModeSelection = (mode: "all" | "selected") => {
    setSelectedTestMode(mode);
    if (mode === "selected") {
      setIsDropdownOpen(true); // Abrir el menú desplegable cuando se seleccionan temas
    } else {
      setIsDropdownOpen(false); // Cerrar el menú cuando se elige "Todos los temas"
    }
  };

  // Función para manejar la selección del modo de preguntas
  const handleQuestionModeSelection = (mode: "timer" | "normal") => {
    setSelectedQuestionMode(mode);
  };

  // Función para manejar la selección de un tema
  const handleTopicSelection = (topicId: number) => {
    setSelectedTopics((prevTopics) => {
      if (prevTopics.includes(topicId)) {
        // Si el tema ya está seleccionado, eliminarlo
        return prevTopics.filter((id) => id !== topicId);
      } else {
        // Si el tema no está seleccionado, agregarlo
        return [...prevTopics, topicId];
      }
    });
  };

  // Función para manejar el cambio en la cantidad de preguntas
  const handleQuestionCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= 50) { // Limitar el rango de la cantidad de preguntas
      setQuestionCount(value);
    }
  };
  const startTest = async () => {
    // Limpiamos el localStorage al inicio
    localStorage.removeItem("currentExerciseData");
    localStorage.removeItem("startTime"); // Limpiamos cualquier dato anterior de startTime
    localStorage.removeItem("selectedLearningData"); // Limpiamos el dato de aprendizaje seleccionado previamente
  
    // Guardamos la hora actual en el localStorage
    const currentTime = new Date().toISOString();
    localStorage.setItem("startTime", currentTime);
    
    // Ahora que rendimientoData ha sido actualizado, podemos mostrarlo
    console.log("Datos de rendimiento de aprendizaje (test):", rendimientoData);
  
    const datosAdaptados = adaptarDatosAprendizaje(rendimientoData);
    console.log("(test):" + rendimientoData);
  
    const cantidadPreguntas = questionCount;
    const resultado = seleccionarAprendizaje(datosAdaptados, cantidadPreguntas);
  
    console.log("Tipos de Aprendizaje Seleccionados (test):", resultado.seleccionados);
    console.log("Porcentajes (test):", resultado);
    console.log("(test):" + transformarEstilos(resultado.seleccionados));
  
    // Guardamos los datos seleccionados en el localStorage
    localStorage.setItem("selectedLearningData", JSON.stringify(resultado.seleccionados));
  
    const AxionsDataQuestions: Resultado = {
      seleccionados: transformarEstilos(resultado.seleccionados), // Aquí se envuelve el arreglo dentro del objeto
    };
  
    try {
      // Usamos `await` para esperar a que las preguntas se generen
      const preguntasgeneradas = await generarPreguntas(AxionsDataQuestions);
      console.log("Preguntas generadas (test):", preguntasgeneradas);
  
      // Actualizamos el estado con los datos de las preguntas
      setExercisesData(preguntasgeneradas);
    } catch (error) {
      console.error("Error al generar preguntas:", error);
    }
  
    // Actualizamos el estado de la prueba
    setIsTestReady(true);
    setIsDropdownOpen(false); // Ocultar el menú de opciones cuando se inicia la prueba
};


  

  return (
    <div className={`p-8 ${dashboardStyles} min-h-screen`}>
      <Navbar role={role} onSettingsClick={() => console.log("Settings clicked")} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 mt-8">Página de Ejercicios</h1>
        <p className="text-center text-gray-500">
          Esta es la página principal de Ejercicios para el tema: {idTheme}
        </p>

        {/* Solo mostrar las opciones de configuración si la prueba no ha comenzado */}
        {!isTestReady && (
          <>
            {/* Selección del modo de prueba */}
            <div className="mb-6 text-center">
              <p className="text-lg font-semibold">Elige el modo de la prueba:</p>
              <button
                onClick={() => handleTestModeSelection("all")}
                className={`px-4 py-2 m-2 rounded ${selectedTestMode === "all" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                Todos los temas
              </button>
              <button
                onClick={() => handleTestModeSelection("selected")}
                className={`px-4 py-2 m-2 rounded ${selectedTestMode === "selected" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                Temas seleccionados
              </button>
            </div>

            {/* Menú desplegable para seleccionar los temas, solo cuando se elige "Temas seleccionados" */}
            {isDropdownOpen && selectedTestMode === "selected" && (
              <div className="mb-6 text-center">
                <p className="text-lg font-semibold">Selecciona los temas:</p>
                <div className="grid grid-cols-2 gap-4">
                  {availableTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelection(topic.id)}
                      className={`px-4 py-2 m-2 rounded ${selectedTopics.includes(topic.id) ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    >
                      Tema {topic.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selección del modo de preguntas */}
            <div className="mb-6 text-center">
              <p className="text-lg font-semibold">Elige el modo de preguntas:</p>
              <button
                onClick={() => handleQuestionModeSelection("timer")}
                className={`px-4 py-2 m-2 rounded ${selectedQuestionMode === "timer" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                Contrarreloj
              </button>
              <button
                onClick={() => handleQuestionModeSelection("normal")}
                className={`px-4 py-2 m-2 rounded ${selectedQuestionMode === "normal" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              >
                Normal
              </button>
            </div>

            {/* Selector de cantidad de preguntas */}
            <div className="mb-6 text-center">
              <p className="text-lg font-semibold">Cantidad de preguntas:</p>
              <input
                type="number"
                value={questionCount}
                onChange={handleQuestionCountChange}
                className="px-4 py-2 m-2 rounded bg-gray-300"
                min={1}
                max={50}
              />
            </div>

            {/* Botón para iniciar la prueba */}
            <div className="text-center">
              <button
                onClick={startTest}
                className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Iniciar prueba
              </button>
            </div>
          </>
        )}

        {/* Mostrar componente de ejercicios solo después de la selección */}
        {isTestReady && idTheme && (
          <div className="mt-8">
            <ExerciseComponent mode={1} exercises={exercisesData.length > 0 ? exercisesData : []} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EjerciciosPage;
