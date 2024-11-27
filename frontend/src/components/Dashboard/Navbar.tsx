// src/components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiHome, FiSettings, FiLogOut, FiUser, FiBookOpen, FiBarChart2, FiUsers } from 'react-icons/fi';

interface NavbarProps {
  role: string | null;
  onSettingsClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onSettingsClick }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');

    router.push('/');
  };

  const navbarStyles = {
    backgroundColor: role === 'student' ? 'bg-blue-800' :
                     role === 'teacher' ? 'bg-green-800' :
                     'bg-gray-800',
    textColor: 'text-white',
  };

  return (
    <nav className={`flex justify-between items-center p-4 shadow-md ${navbarStyles.backgroundColor} ${navbarStyles.textColor}`}>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
          <FiHome className="mr-2" /> Inicio
        </Link>
        {role === 'student' && (
          <>
            <Link href="/dashboard/perfil" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
              <FiUser className="mr-2" /> Perfil
            </Link>
            <Link href="/dashboard/modulos" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
              <FiBookOpen className="mr-2" /> Módulos
            </Link>
            <Link href="/dashboard/Stadistics" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
              <FiBarChart2 className="mr-2" /> Estadísticas
            </Link>
          </>
        )}
        {role === 'teacher' && (
          <>
            <Link href="/dashboard/perfil" className="flex items-center text-lg font-semibold hover:text-green-300 transition duration-200">
              <FiUser className="mr-2" /> Perfil
            </Link>
            <Link href="/dashboard/grupos" className="flex items-center text-lg font-semibold hover:text-green-300 transition duration-200">
              <FiUsers className="mr-2" /> Grupos
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onSettingsClick}
          className="flex items-center text-lg font-semibold hover:text-gray-300 transition duration-200"
        >
          <FiSettings className="mr-2" /> Configuración
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center text-lg font-semibold hover:text-red-400 transition duration-200"
        >
          <FiLogOut className="mr-2" /> Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
