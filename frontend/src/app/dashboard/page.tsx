// src/app/dashboard/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import DashboardComponent from '../../components/Dashboard/DashboardBase';
import Navbar from '../../components/Dashboard/Navbar';
import SettingsDrawer from '../../components/Dashboard/SettingsDrawer';
import ProgressSummary from '../../components/Dashboard/ProgressSummary';
import Notifications from '../../components/Dashboard/Notifications';
import QuickActions from '../../components/Dashboard/QuickActions';
import PerformanceChart from '../../components/Dashboard/PerformanceChart';

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);
  }, []);

  const dashboardStyles = role === 'student' ? 'bg-blue-100' : role === 'teacher' ? 'bg-green-100' : 'bg-gray-100';
  const textStyles = 'text-gray-800';

  return (
    <div className={`p-8 ${dashboardStyles} ${textStyles} min-h-screen`}>
      <Navbar role={role} onSettingsClick={toggleSettingsDrawer} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={toggleSettingsDrawer} />
      <DashboardComponent />
      <ProgressSummary role={role} />
      <Notifications />
      <QuickActions role={role} />
      <PerformanceChart />
    </div>
  );
};

export default Dashboard;