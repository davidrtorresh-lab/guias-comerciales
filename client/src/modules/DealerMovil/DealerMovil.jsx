import { Link, Routes, Route } from 'react-router-dom';
import { FileText, Package, ArrowLeft } from 'lucide-react';
import FacturacionPospago from './FacturacionPospago/FacturacionPospago';

function DealerMovil() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<DealerMovilMenu />} />
        <Route path="/facturacion-pospago" element={<FacturacionPospago />} />
        <Route path="/combinaciones-prepago" element={<ComingSoon title="Combinaciones Prepago" />} />
      </Routes>
    </div>
  );
}

function DealerMovilMenu() {
  const menuOptions = [
    {
      id: 'facturacion-pospago',
      title: 'Facturación Pospago',
      description: 'Calculadora de ciclos, tipos de transacción y conceptos clave',
      icon: FileText,
      path: '/dealer-movil/facturacion-pospago',
      color: 'blue',
      available: true
    },
    {
      id: 'combinaciones-prepago',
      title: 'Combinaciones Prepago',
      description: 'Guía de combinaciones y paquetes prepago',
      icon: Package,
      path: '/dealer-movil/combinaciones-prepago',
      color: 'green',
      available: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header con botón de regreso */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dealer Móvil</h1>
          <p className="text-gray-600">Selecciona el módulo que deseas consultar</p>
        </div>
      </div>

      {/* Grid de opciones */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuOptions.map((option) => {
          const Icon = option.icon;
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
            green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
            purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
            orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
          };

          if (!option.available) {
            return (
              <div
                key={option.id}
                className="relative bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 opacity-60"
              >
                <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Próximamente
                </div>
                <Icon className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            );
          }

          return (
            <Link
              key={option.id}
              to={option.path}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[option.color]} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative p-6">
                <Icon className={`w-12 h-12 text-${option.color}-600 mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                <div className="flex items-center text-blue-600 font-semibold text-sm">
                  Acceder
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <Link 
        to="/dealer-movil" 
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a Dealer Móvil
      </Link>
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-xl text-gray-600">Este módulo estará disponible próximamente</p>
      </div>
    </div>
  );
}

export default DealerMovil;