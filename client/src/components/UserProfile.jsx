import { useAuth } from '../contexts/AuthContext';
import { User, Building2, Briefcase, Phone, Mail, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Mi Perfil</h3>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Nombre</p>
            <p className="font-semibold text-gray-800">{user.nombre}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Canal</p>
            <p className="font-semibold text-gray-800">{user.canal}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Briefcase className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Rol</p>
            <p className="font-semibold text-gray-800">{user.rol}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="font-semibold text-gray-800">{user.telefono}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Correo</p>
            <p className="font-semibold text-gray-800">{user.correo}</p>
          </div>
        </div>
      </div>

      {(user.rol === 'Desarrollador' || user.canal === 'TRADE&TRAINING') && (
        <div className="mt-6 pt-6 border-t-2 border-gray-100">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm font-semibold text-yellow-800">
              ⭐ Acceso Total
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Tienes acceso a todas las unidades de negocio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}