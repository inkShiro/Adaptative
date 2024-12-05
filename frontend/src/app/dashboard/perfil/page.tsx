// src/app/dashboard/perfil/page.tsx
"use client";
import Navbar from '../../../components/Dashboard/Navbar';
import SettingsDrawer from '../../../components/Dashboard/SettingsDrawer';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_URLBASE;

interface UserProfile {
  id: number; // Cambié el tipo de string a number porque el id en tu objeto es un número
  fullName: string;
  email: string;
  profileImage?: string;
  dateOfBirth?: string | null; // Puede ser null según el objeto mostrado
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  school?: string | null;
  credenciales: {
    email: string;
  };
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el formulario de edición
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile | null>(null); // Estado para los datos actualizados

  const toggleSettingsDrawer = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userID');
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);

        if (!userId) {
          setError('No se encontró el ID del usuario.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseURL}/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
          setUpdatedProfile(data); // Establecer los datos actuales en el estado de actualización
        } else {
          setError('Error al cargar el perfil del usuario.');
        }
      } catch (error) {
        setError('Error de red. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdateProfile = async () => {
    if (updatedProfile) {
      try {
        const userId = localStorage.getItem('userID');
        // Asegúrate de que dateOfBirth esté en formato ISO-8601
        const formattedDateOfBirth = updatedProfile.dateOfBirth
          ? new Date(updatedProfile.dateOfBirth).toISOString() // Convierte a formato ISO
          : null;
  
        const response = await fetch(`${baseURL}/api/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...updatedProfile,
            dateOfBirth: formattedDateOfBirth, // Usa la fecha formateada
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data); // Actualizar el perfil en el estado
          setIsEditing(false); // Cerrar el formulario de edición
        } else {
          setError('Error al actualizar el perfil.');
        }
      } catch (error) {
        setError('Error de red. Intenta de nuevo.');
      }
    }
  };

  const handleCancelEdit = () => {
    setUpdatedProfile(userProfile); // Restablecer los datos a los originales
    setIsEditing(false); // Cerrar el formulario de edición
  };

  const dashboardStyles =
    role === 'student' ? 'bg-blue-100' :
    role === 'teacher' ? 'bg-green-100' : 
    'bg-gray-100';

  return (
    <div className={`p-8 ${dashboardStyles}`}>
      <Navbar role={role} onSettingsClick={toggleSettingsDrawer} />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={toggleSettingsDrawer} />
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-4 space-y-6">
        <h1 className="text-4xl font-bold mb-4 p-6">Perfil de Usuario</h1>
        {loading ? (
          <p className="text-gray-500">Cargando perfil...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {isEditing ? (
              <div className="space-y-4">
                <input
                type="text"
                name="fullName"
                value={updatedProfile?.fullName || ''}
                onChange={handleInputChange}
                className="border p-2 w-full bg-gray-200 text-gray-500" // Agrega clases para el fondo y el color del texto
                placeholder="Nombre Completo"
                readOnly // Hacer el campo de nombre de solo lectura
              />
              <input
                type="email"
                name="email"
                value={updatedProfile?.credenciales.email || ''}
                onChange={handleInputChange}
                className="border p-2 w-full bg-gray-200 text-gray-500" // Agrega clases para el fondo y el color del texto
                placeholder="Correo Electrónico"
                readOnly // Hacer el campo de correo de solo lectura
              />
                <input 
                  type="date"
                  name="dateOfBirth"
                  value={updatedProfile?.dateOfBirth || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  placeholder="Fecha de Nacimiento"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={updatedProfile?.phoneNumber || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  placeholder="Teléfono"
                />
                <input
                  type="text"
                  name="address"
                  value={updatedProfile?.address || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  placeholder="Dirección"
                />
                <input
                  type="text"
                  name="city"
                  value={updatedProfile?.city || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  placeholder="Ciudad"
                />
                <input
                  type="text"
                  name="school"
                  value={updatedProfile?.school || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  placeholder="Escuela"
                />
                <div className="flex space-x-4">
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleUpdateProfile}
                  >
                    Confirmar Cambios
                  </button>
                  <button 
                    className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Imagen de perfil centrada */}
                <div className="flex justify-center">
                  <div className="w-3/6 h-64 rounded-lg overflow-hidden border-4 border-gray-300">
                    {userProfile?.profileImage ? (
                      <img 
                        src={userProfile.profileImage} 
                        alt="Imagen de perfil" 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        Sin Imagen
                      </div>
                    )}
                  </div>
                </div>

                {/* Información del usuario */}
                <div className="text-left space-y-2">
                  <p><strong>Nombre completo:</strong> {userProfile?.fullName || "Sin datos"}</p>
                  <p><strong>Email:</strong> {userProfile?.credenciales.email || "Sin datos"}</p>
                  <p><strong>Fecha de nacimiento:</strong> {userProfile?.dateOfBirth ? userProfile.dateOfBirth.split('T')[0] : "Sin datos"}</p>
                  <p><strong>Teléfono:</strong> {userProfile?.phoneNumber || "Sin datos"}</p>
                  <p><strong>Dirección:</strong> {userProfile?.address || "Sin datos"}</p>
                  <p><strong>Ciudad:</strong> {userProfile?.city || "Sin datos"}</p>
                  <p><strong>Escuela:</strong> {userProfile?.school || "Sin datos"}</p>
                </div>

                {/* Botón para editar */}
                <button 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200 mx-auto"
                  onClick={handleEditClick}
                >
                  <FiEdit className="text-lg" />
                  <span>Editar Datos</span>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
