// src/components/PerformanceChart.tsx
import React from 'react';
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
import Link from 'next/link'; // Importa el componente Link de Next.js

// Registro de escalas y elementos
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getRandomValues = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100)); // Genera números aleatorios entre 0 y 99
};

const PerformanceChart: React.FC = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Progreso',
        data: getRandomValues(5), // Generar 5 valores aleatorios
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Gráfico de Rendimiento</h2>
      <Bar data={data} />
      <Link href="/dashboard/Stadistics">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Ver Estadísticas
        </button>
      </Link>
    </div>
  );
};

export default PerformanceChart;
