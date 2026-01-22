import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp, 
  Home,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  Building2,
  Briefcase
} from 'lucide-react';

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [actionLoading, setActionLoading] = useState(null);

  // Verificar que el usuario sea Desarrollador
  useEffect(() => {
    if (!user || user.correo !== 'davidrtorresh@gmail.com') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Cargar usuarios pendientes
      const pendingRes = await fetch('/api/auth/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const pendingData = await pendingRes.json();
      setPendingUsers(pendingData.pendingUsers || []);

      // Cargar usuarios activos
      const usersRes = await fetch('/api/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const usersData = await usersRes.json();
      setActiveUsers(usersData.users || []);

      // Calcular estadísticas
      calculateStats(pendingData.pendingUsers || [], usersData.users || []);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (pending, active) => {
    const statsByCanal = active.reduce((acc, user) => {
      if (!acc[user.canal]) acc[user.canal] = 0;
      acc[user.canal]++;
      return acc;
    }, {});

    const statsByRol = active.reduce((acc, user) => {
      if (!acc[user.rol]) acc[user.rol] = 0;
      acc[user.rol]++;
      return acc;
    }, {});

    setStats({
      total: active.length,
      pending: pending.length,
      byCanal: statsByCanal,
      byRol: statsByRol
    });
  };

  const handleApprove = async (userId) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });

      if (response.ok) {
        await loadData();
      } else {
        alert('Error al aprobar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al aprobar usuario');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId) => {
    if (!confirm('¿Estás seguro de rechazar este usuario?')) return;
    
    setActionLoading(userId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });

      if (response.ok) {
        await loadData();
      } else {
        alert('Error al rechazar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al rechazar usuario');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Gestión de usuarios - Guías Comerciales</p>
              </div>
            </div>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Inicio</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Usuarios Activos</p>
                <p className="text-3xl font-bold text-green-600">{stats.total || 0}</p>
              </div>
              <UserCheck className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pendientes</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending || 0}</p>
              </div>
              <Clock className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Canales</p>
                <p className="text-3xl font-bold text-blue-600">{Object.keys(stats.byCanal || {}).length}</p>
              </div>
              <Building2 className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Roles</p>
                <p className="text-3xl font-bold text-purple-600">{Object.keys(stats.byRol || {}).length}</p>
              </div>
              <Briefcase className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Usuarios Pendientes */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Usuarios Pendientes de Aprobación
            </h2>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
              {pendingUsers.length}
            </span>
          </div>

          {pendingUsers.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay usuarios pendientes de aprobación</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="grid md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <p className="font-bold text-gray-800 text-lg mb-1">{user.nombre}</p>
                      <p className="text-sm text-gray-600">{user.correo}</p>
                      <p className="text-sm text-gray-600">{user.telefono}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Canal</p>
                      <p className="font-semibold text-gray-800">{user.canal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Rol</p>
                      <p className="font-semibold text-gray-800">{user.rol}</p>
                    </div>
                    <div className="flex gap-2 items-center justify-end">
                      <button
                        onClick={() => handleApprove(user.id)}
                        disabled={actionLoading === user.id}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {actionLoading === user.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        <span className="hidden md:inline">Aprobar</span>
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        disabled={actionLoading === user.id}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <XCircle className="w-4 h-4" />
                        <span className="hidden md:inline">Rechazar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usuarios Activos */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">Usuarios Activos</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              {activeUsers.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Canal</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden lg:table-cell">Rol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800">{user.nombre}</p>
                      <p className="text-sm text-gray-500 md:hidden">{user.correo}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{user.correo}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                        {user.canal}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{user.rol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}