import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartAnnotation from 'chartjs-plugin-annotation';  // Importar el plugin correctamente
import Link from 'next/link'; // Importa el componente Link de Next.js

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

// Registro de escalas, elementos y el plugin de anotaciones
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartAnnotation  // Asegúrate de registrar el plugin aquí
);

// Función para obtener los datos aleatorios si no hay datos reales
const getRandomValues = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100)); // Genera números aleatorios entre 0 y 99
};

const PerformanceChart: React.FC = () => {
  const [data, setData] = useState<any>(null); // Estado para almacenar los datos del rendimiento
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar el estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  
  // Suponiendo que el userId es un valor disponible (puede venir del localStorage, contexto, etc.)
  const userId = localStorage.getItem('userID'); // Obtén el userID del localStorage

  // Hacer fetch al endpoint para obtener los datos
  useEffect(() => {
    const fetchRendimiento = async () => {
      try {
        const response = await fetch(`${baseURL}/api/rendimiento-de-aprendizaje/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del rendimiento');
        }
        const result = await response.json();

        // Si no hay datos, podemos configurar los valores a 0 por defecto
        setData({
          labels: ['Visual', 'Auditivo', 'Kinestésico', 'Lectura/Escritura', 'Secuencial', 'Global', 'Activo', 'Reflexivo', 'Social', 'Individual'],
          datasets: [
            {
              label: 'Progreso',
              data: [
                result.aprendizajeVisual || 0,
                result.aprendizajeAuditivo || 0,
                result.aprendizajeKinestesico || 0,
                result.aprendizajeLecturaEscritura || 0,
                result.aprendizajeSecuencial || 0,
                result.aprendizajeGlobal || 0,
                result.aprendizajeActivo || 0,
                result.aprendizajeReflexivo || 0,
                result.aprendizajeSocial || 0,
                result.aprendizajeIndividual || 0,
              ],
              // Cambiar el color dependiendo del valor
              backgroundColor: (context: any) => {
                const value = context.raw;
                return value < 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)';
              },
              borderColor: (context: any) => {
                const value = context.raw;
                return value < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)';
              },
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError('Hubo un error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchRendimiento();
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Gráfico de Rendimiento</h2>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Gráfico de Rendimiento</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Gráfico de Rendimiento</h2>
      <Bar
        data={data}
        options={{
          scales: {
            y: {
              min: -20,  // Establece el valor mínimo en el eje Y
              max: 20,   // Establece el valor máximo en el eje Y
            },
          },
          plugins: {
            annotation: {
              annotations: {
                line: {
                  type: 'line',
                  yMin: 0,   // Línea en y = 0
                  yMax: 0,   // Línea en y = 0
                  borderColor: 'rgba(0, 0, 0, 0.8)', // Color de la línea
                  borderWidth: 2, // Grosor de la línea
                  borderDash: [5, 5], // Líneas discontinuas
                },
              },
            },
          },
        }}
      />
      <Link href="/dashboard/Stadistics">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Ver Estadísticas
        </button>
      </Link>
    </div>
  );
};

export default PerformanceChart;
