"use client";

import React from "react";

const UserMetricsPage: React.FC = () => {
  // Métricas simuladas
  const metrics = {
    totalUsers: 12345,
    activeUsers: 8765,
    newUsersToday: 128,
    retentionRate: "85%",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Metrics</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjetas de métricas */}
        {Object.entries(metrics).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
          >
            <p className="text-gray-500 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
            <h2 className="text-2xl font-semibold text-gray-800">{value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMetricsPage;
