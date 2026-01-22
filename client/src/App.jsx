import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import { Home, Smartphone, Store, Users, User, Building2, Briefcase, Phone, Mail, LogOut } from 'lucide-react';
import DealerMovil from './modules/DealerMovil/DealerMovil';
import TiendasPage from './modules/Tiendas/TiendasPage'; // <--- NUEVO IMPORT
import { useAuth } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          
          {/* Módulo Dealer Móvil */}
          <Route path="/dealer-movil/*" element={
            <ProtectedRoute requiredCanal="DEALER MOVIL">
              <DealerMovil />
            </ProtectedRoute>
          } />

          {/* Módulo Tiendas (ACTUALIZADO) */}
          <Route path="/tiendas" element={
            <ProtectedRoute requiredCanal="TIENDA">
              <TiendasPage />
            </ProtectedRoute>
          } />

          {/* Módulo FVD (Aún pendiente) */}
          <Route path="/fvd" element={
            <ProtectedRoute requiredCanal="FVD">
              <ComingSoon title="FVD" canal="FVD" />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function HomePage() {
  const { user, hasAccess, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unidades = [
    {
      id: 'dealer-movil',
      title: 'Dealer Móvil',
      description: 'Facturación Pospago, Combinaciones y más',
      icon: Smartphone,
      path: '/dealer-movil',
      color: 'blue',
      canal: 'DEALER MOVIL'
    },
    {
      id: 'tiendas',
      title: 'Tiendas',
      description: 'Ofertas Hogar, Móvil y Tácticos', // Actualizado descripción
      icon: Store,
      path: '/tiendas',
      color: 'green',
      canal: 'TIENDA'
    },
    {
      id: 'fvd',
      title: 'FVD',
      description: 'Próximamente',
      icon: Users,
      path: '/fvd',
      color: 'purple',
      canal: 'FVD'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header con botón de perfil y admin */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Guías Comerciales</h1>
                <p className="text-sm text-gray-600 hidden md:block">Bienvenido, {user.nombre}</p>
              </div>
            </div>
            
            {/* Botones de navegación */}
            <div className="flex items-center gap-3">
              {/* Botón de perfil */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Mi Perfil</span>
              </button>
              
              {/* Botón de Admin (solo para Desarrolladores) */}
              {user.correo === 'davidrtorresh@gmail.com' && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Users className="w-5 h-5" />
                  <span className="hidden md:inline">Admin</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de perfil */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mt-4 mb-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Mi Perfil</h3>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="font-semibold text-gray-800 break-words">{user.nombre}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Canal</p>
                    <p className="font-semibold text-gray-800 break-words">{user.canal}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Rol</p>
                    <p className="font-semibold text-gray-800 break-words">{user.rol}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <Phone className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="font-semibold text-gray-800 break-words">{user.telefono}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <Mail className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Correo</p>
                    <p className="font-semibold text-gray-800 break-words text-sm">{user.correo}</p>
                  </div>
                </div>
              </div>

              {(user.rol === 'Desarrollador' || user.canal === 'TRADE&TRAINING') && (
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-800">⭐ Acceso Total</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Tienes acceso a todas las unidades de negocio
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Selecciona una unidad de negocio
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Accede a las guías y herramientas de tu canal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {unidades.map((unidad) => {
            const Icon = unidad.icon;
            const tieneAcceso = hasAccess(unidad.canal);
            
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600'
            };

            const bgColorClasses = {
              blue: 'bg-blue-100',
              green: 'bg-green-100',
              purple: 'bg-purple-100'
            };

            const textColorClasses = {
              blue: 'text-blue-600',
              green: 'text-green-600',
              purple: 'text-purple-600'
            };

            if (!tieneAcceso) {
              return (
                <div
                  key={unidad.id}
                  className="relative bg-white rounded-xl shadow-md p-6 md:p-8 text-center opacity-50 cursor-not-allowed"
                >
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Sin acceso
                    </span>
                  </div>
                  <div className="bg-gray-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-400 mb-2">{unidad.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400">{unidad.description}</p>
                </div>
              );
            }

            return (
              <Link
                key={unidad.id}
                to={unidad.path}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 active:scale-95"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[unidad.color]} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative p-6 md:p-8 text-center">
                  <div className={`${bgColorClasses[unidad.color]} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${textColorClasses[unidad.color]}`} />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:${textColorClasses[unidad.color]} transition-colors`}>
                    {unidad.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">{unidad.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ title, canal }) {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 text-base md:text-lg transition-colors"
        >
          <Home className="w-5 h-5 md:w-6 md:h-6" />
          Volver al inicio
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">Este módulo estará disponible próximamente</p>
          <p className="text-sm md:text-base text-gray-500">Canal: {user.canal}</p>
        </div>
      </div>
    </div>
  );
}

export default App;