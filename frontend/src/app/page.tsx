// src/app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Para manejar la navegación

// Importación de componentes desde `src/components`
import Header from '../components/MainPage/Header';
import HeroSection from '../components/MainPage/HeroSection';
import FeatureList from '../components/MainPage/FeatureList';
import TestimonialsSection from '../components/MainPage/TestimonialsSection';
import StatsSection from '../components/Dashboard/StatsSection';
import PricingSection from '../components/MainPage/PricingSection';
import FAQSection from '../components/MainPage/FAQSection';
import DemoSection from '../components/MainPage/DemoSection';
import Footer from '../components/MainPage/Footer';
import Modal from '../components/Dashboard/Modal';
import AnimatedComponent from '../components/Efectos/AnimatedComponent';

const HomePage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Redirección al presionar la combinación de teclas
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "M") {
        router.push('/metrics'); // Redirige a la ruta "/metrics"
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <div>
      {/* Contenido principal */}
      <Header onOpenModal={handleOpenModal} />
      
      <AnimatedComponent>
        <HeroSection />
      </AnimatedComponent>
      <AnimatedComponent>
        <FeatureList />
      </AnimatedComponent>
      <AnimatedComponent>
        <TestimonialsSection />
      </AnimatedComponent>
      <AnimatedComponent>
        <StatsSection />
      </AnimatedComponent>
      <AnimatedComponent>
        <PricingSection />
      </AnimatedComponent>
      <AnimatedComponent>
        <FAQSection />
      </AnimatedComponent>
      <AnimatedComponent>
        <DemoSection />
      </AnimatedComponent>
      <Footer />

      {/* Modal */}
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default HomePage;
