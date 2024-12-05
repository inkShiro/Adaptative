import React, { useEffect, useState } from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement);

interface ExerciseComponentProps {
  exercises?: {
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
  mode?: 0 | 1 | null;
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({ exercises = [], mode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(exercises.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    const storedData = localStorage.getItem("currentExerciseData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSelectedAnswers(parsedData);
    }
  }, []);

  const handleAnswerSelection = (index: number, answer: number) => {
    if (!isSubmitted) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[index] = answer;
      setSelectedAnswers(updatedAnswers);
      localStorage.setItem("currentExerciseData", JSON.stringify(updatedAnswers));
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.includes(null)) {
      alert("Por favor, selecciona una respuesta para todos los ejercicios");
      return;
    }
  
    // Obtener la hora de inicio desde el localStorage
    const startTime = localStorage.getItem("startTime");
  
    if (!startTime) {
      console.error("No se encontró la hora de inicio.");
      return;
    }
  
    // Obtener la hora actual (hora de finalización)
    const endTime = new Date().toISOString();
  
    // Cargar los datos de aprendizaje previamente seleccionados desde el localStorage
    const selectedLearningData = localStorage.getItem("selectedLearningData");
    const aprendizajeSeleccionado = selectedLearningData ? JSON.parse(selectedLearningData) : [];
  
    // Crear un arreglo con las respuestas de los ejercicios, incluyendo el tipo de pregunta y los datos de aprendizaje seleccionados
    const respuestasConHoras = exercises.map((exercise, index) => ({
      question: exercise.question,
      selectedAnswer: selectedAnswers[index],
      correctAnswer: exercise.correctAnswer,
      typeLabel: exercise.typeLabel, // Añadir tipo de pregunta
      aprendizaje: aprendizajeSeleccionado[index] || null, // Asociar los datos de aprendizaje seleccionados si existen
    }));
  
    // Crear un objeto con las respuestas, las horas de inicio y fin, y la cantidad de preguntas
    const resultado = {
      respuestas: respuestasConHoras,
      startTime: startTime,
      endTime: endTime,
      totalQuestions: exercises.length, // Añadir la cantidad de preguntas
    };
  
    // Mostrar el objeto con las respuestas y las horas en consola
    console.log("Resultado enviado:", resultado);
  
    // Actualizamos el estado de la prueba
    setIsSubmitted(true);
  
    // Guardamos las respuestas en el localStorage
    localStorage.setItem("currentExerciseData", JSON.stringify(selectedAnswers));
  
    // Guardamos la hora de finalización
    localStorage.setItem("endTime", endTime);
  };
  
  

  const handlePracticeSubmit = () => {
    if (selectedAnswers.includes(null)) {
      alert("Por favor, selecciona una respuesta para todos los ejercicios");
      return;
    }
    alert("¡Respuestas registradas! (sin evaluación en modo práctica)");
    setIsSubmitted(true);
    localStorage.setItem("currentExerciseData", JSON.stringify(selectedAnswers));
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const goToExercise = (index: number) => {
    setCurrentExerciseIndex(index);
  };

  let chartComponent = null;

  switch (currentExercise?.typeLabel) {
    case "gráfico":
      const barChartData = {
        labels: ['Roja', 'Azul'],
        datasets: [
          {
            label: 'Valor de las barras',
            data: [currentExercise.bars?.redBar || 0, currentExercise.bars?.blueBar || 0],
            backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'],
            borderColor: ['red', 'blue'],
            borderWidth: 2,
          },
        ],
      };

      const maxValue = Math.round(Math.max(currentExercise.bars?.redBar || 0, currentExercise.bars?.blueBar || 0) * 1.2) + (Math.round(Math.max(currentExercise.bars?.redBar || 0, currentExercise.bars?.blueBar || 0) * 1.2) % 2 !== 0 ? 1 : 0);

      const options = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: maxValue,
          },
        },
      };

      chartComponent = (
        <div className="mb-8 mx-auto max-w-[700px]">
          <Bar data={barChartData} options={options} width={700} height={400} />
        </div>
      );
      break;

    case "grupo_puntos":
      const scatterChartData = {
        labels: ['Grupo 1', 'Grupo 2'],
        datasets: [
          {
            label: 'Grupo 1',
            data: currentExercise.points?.group1 || [],
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            pointRadius: 8,
          },
          {
            label: 'Grupo 2',
            data: currentExercise.points?.group2 || [],
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            pointRadius: 8,
          },
        ],
      };

      const scatterOptions: import("chart.js").ChartOptions<'scatter'> = {
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Eje X',
            },
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Eje Y',
            },
          },
        },
      };

      chartComponent = (
        <div className="mb-8 mx-auto max-w-[700px]">
          <Scatter data={scatterChartData} options={scatterOptions} width={700} height={400} />
        </div>
      );
      break;

    default:
      chartComponent = <p>No se reconoce el tipo de ejercicio.</p>;
      break;
  }

  const allQuestionsAnswered = selectedAnswers.every((answer) => answer !== null);
  const anyQuestionAnswered = selectedAnswers.some((answer) => answer !== null);

  return (
    <div className="flex space-x-6 p-6">
      {/* Barra lateral */}
      <div className="w-[250px] bg-gray-100 p-4 border-r rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center text-indigo-600">Ejercicios</h3>
      <div className="grid grid-cols-3 gap-2">
        {exercises.map((_, index) => {
          const isAnswered = selectedAnswers[index] !== null;
          const isCorrect = selectedAnswers[index] === exercises[index]?.correctAnswer;

          let buttonClass = "w-full p-4 text-center rounded-lg font-semibold text-white ";

          if (isAnswered) {
            // Si la respuesta ha sido seleccionada
            if (isSubmitted) {
              // Si el test fue enviado, mostramos si es correcta o incorrecta
              buttonClass += isCorrect ? "bg-green-500" : "bg-red-500";
            } else {
              // Si no se ha enviado el test, lo dejamos en gris cuando solo se seleccionó la respuesta
              buttonClass += "bg-blue-500"; // Color cuando la respuesta ha sido seleccionada
            }
          } else {
            // Si no se ha respondido
            buttonClass += "bg-gray-300";
          }

          return (
            <button
              key={index}
              onClick={() => goToExercise(index)}
              className={buttonClass}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>

      {/* Contenido principal */}
      <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Ejercicio de {currentExercise?.typeLabel}</h3>
        <p className="mb-4">{currentExercise?.question}</p>

        {chartComponent}

        <div className="mb-4">
          <p><strong>Opciones de respuesta:</strong></p>
          <div className="grid grid-cols-2 gap-4 justify-center">
            {currentExercise?.options.map((option, index) => {
              let buttonClass = "px-4 py-2 border rounded mb-2 bg-gray-200";
              if (isSubmitted) {
                if (option === currentExercise?.correctAnswer) {
                  buttonClass = "px-4 py-2 border rounded mb-2 bg-green-500 text-white";
                } else if (option === selectedAnswers[currentExerciseIndex]) {
                  buttonClass = "px-4 py-2 border rounded mb-2 bg-red-500 text-white";
                }
              } else if (selectedAnswers[currentExerciseIndex] === option) {
                buttonClass = "px-4 py-2 border rounded mb-2 bg-blue-500 text-white";
              }
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(currentExerciseIndex, option)}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {isSubmitted && (
          <div className="mb-4">
            <p><strong>Explicación:</strong> {currentExercise?.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          {currentExerciseIndex > 0 && <button onClick={prevExercise} className="text-blue-500">Anterior</button>}
          {currentExerciseIndex < exercises.length - 1 && <button onClick={nextExercise} className="text-blue-500">Siguiente</button>}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePracticeSubmit}
            disabled={!anyQuestionAnswered}
            className={`px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300`}
          >
            Terminar práctica
          </button>

          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className={`px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300`}
          >
            Enviar respuestas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
