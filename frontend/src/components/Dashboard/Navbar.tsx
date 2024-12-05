import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiHome, FiSettings, FiLogOut, FiUser, FiBookOpen, FiBarChart2, FiUsers, FiClipboard } from 'react-icons/fi';

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
    <nav className={`w-full flex justify-between items-center p-5 shadow-lg rounded-xl ${navbarStyles.backgroundColor} ${navbarStyles.textColor}`}>
      <div className="flex items-center space-x-6">
        <Link href="/dashboard" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
          <FiHome className="mr-2 text-2xl" />
          <span className="hidden lg:inline">Inicio</span> {/* Texto visible solo en pantallas grandes */}
        </Link>

        {role === 'student' && (
          <>
            <Link href="/dashboard/perfil" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
              <FiUser className="mr-2 text-2xl" />
              <span className="hidden lg:inline">Perfil</span>
            </Link>
            <Link href="/dashboard/ejercicios" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
              <FiClipboard className="mr-2 text-2xl" />
              <span className="hidden lg:inline">Ejercicios</span>
            </Link>
            <Link href="/dashboard/modulos" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
              <FiBookOpen className="mr-2 text-2xl" />
              <span className="hidden lg:inline">Módulos</span>
            </Link>
            <Link href="/dashboard/Stadistics" className="flex items-center text-lg font-semibold hover:text-blue-300 transition duration-200">
              <FiBarChart2 className="mr-2 text-2xl" />
              <span className="hidden lg:inline">Estadísticas</span>
            </Link>
          </>
        )}

        {role === 'teacher' && (
          <>
            <Link href="/dashboard/perfil" className="flex items-center text-lg font-semibold hover:text-green-300 transition duration-200">
              <FiUser className="mr-2 text-2xl" />
              <span className="hidden lg:inline">Perfil</span>
            </Link>
            <Link href="/dashboard/grupos" className="flex items-center text-lg font-semibold hover:text-green-300 transition duration-200">
              <FiUsers className="mr-2 text-2xl" />
              <span className="hidden lg:inline">Grupos</span>
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={onSettingsClick}
          className="flex items-center text-lg font-semibold hover:text-gray-300 transition duration-200"
        >
          <FiSettings className="mr-2 text-2xl" />
          <span className="hidden lg:inline">Configuración</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center text-lg font-semibold hover:text-red-400 transition duration-200"
        >
          <FiLogOut className="mr-2 text-2xl" />
          <span className="hidden lg:inline">Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
