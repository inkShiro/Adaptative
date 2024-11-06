// src/app/dashboard/statistics/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Dashboard/Navbar';
import SettingsDrawer from '../../../components/Dashboard/SettingsDrawer';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import AnimatedComponent from '../../../components/Efectos/AnimatedComponent';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Función para generar valores aleatorios
const getRandomValues = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100)); // Generar números aleatorios entre 0 y 99
};

const StatisticsPage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);

    // Simulación de datos de ejemplo
    const simulatedData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      values: getRandomValues(5), // Generar 5 valores aleatorios
      additionalData: [
        { labels: ['Enero', 'Febrero', 'Marzo'], values: getRandomValues(3) },
        { labels: ['Abril', 'Mayo', 'Junio'], values: getRandomValues(3) },
        { labels: ['Julio', 'Agosto', 'Septiembre'], values: getRandomValues(3) },
      ],
    };

    setData(simulatedData);
    setLoading(false);
  }, []);

  const dashboardStyles =
    role === 'student' ? 'bg-blue-100' :
    role === 'teacher' ? 'bg-green-100' : 
    'bg-gray-100';

  const chartData = (values: number[], labels: string[]) => ({
    labels: labels || [],
    datasets: [
      {
        label: 'Progreso',
        data: values || [],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      }
    ]
  });

  return (
    <div className={`p-8 ${dashboardStyles}`}>
      <Navbar role={role} onSettingsClick={toggleSettingsDrawer} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={toggleSettingsDrawer} />

      <h1 className="text-4xl font-bold mb-4 mt-8">Estadísticas</h1>
      
      {loading ? (
        <p className="text-gray-500">Cargando estadísticas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Gráfico 1 */}
          <AnimatedComponent>
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
              <h2 className="text-2xl font-semibold mb-2">Gráfico 1</h2>
              <Line data={chartData(data.values, data.labels)} />
            </div>
          </AnimatedComponent>

          {/* Gráfico 2 */}
          <AnimatedComponent>
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
              <h2 className="text-2xl font-semibold mb-2">Gráfico 2</h2>
              <Line data={chartData(data.additionalData[0].values, data.additionalData[0].labels)} />
            </div>
          </AnimatedComponent>

          {/* Gráfico 3 */}
          <AnimatedComponent>
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
              <h2 className="text-2xl font-semibold mb-2">Gráfico 3</h2>
              <Line data={chartData(data.additionalData[1].values, data.additionalData[1].labels)} />
            </div>
          </AnimatedComponent>

          {/* Gráfico 4 */}
          <AnimatedComponent>
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
              <h2 className="text-2xl font-semibold mb-2">Gráfico 4</h2>
              <Line data={chartData(data.additionalData[2].values, data.additionalData[2].labels)} />
            </div>
          </AnimatedComponent>
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
