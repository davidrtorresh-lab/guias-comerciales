import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Smartphone, Store, Users } from 'lucide-react';
import DealerMovil from './modules/DealerMovil/DealerMovil';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Routes sin navegación global */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dealer-movil/*" element={<DealerMovil />} />
          <Route path="/tiendas" element={<ComingSoon title="Tiendas" />} />
          <Route path="/fvd" element={<ComingSoon title="FVD" />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home className="w-12 h-12 text-blue-600" />
            <h1 className="text-6xl font-bold text-gray-800">Guías Comerciales</h1>
          </div>
          <p className="text-2xl text-gray-600">Selecciona una unidad de negocio</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link 
            to="/dealer-movil" 
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105"
          >
            <div className="p-10 text-center">
              <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Smartphone className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                Dealer Móvil
              </h2>
              <p className="text-gray-600">Facturación Pospago, Combinaciones y más</p>
            </div>
          </Link>

          <Link 
            to="/tiendas" 
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105"
          >
            <div className="p-10 text-center">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Store className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                Tiendas
              </h2>
              <p className="text-gray-600">Próximamente</p>
            </div>
          </Link>

          <Link 
            to="/fvd" 
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105"
          >
            <div className="p-10 text-center">
              <div className="bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Users className="w-12 h-12 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                FVD
              </h2>
              <p className="text-gray-600">Próximamente</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 text-lg transition-colors"
        >
          <Home className="w-6 h-6" />
          Volver al inicio
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">{title}</h1>
          <p className="text-2xl text-gray-600">Este módulo estará disponible próximamente</p>
        </div>
      </div>
    </div>
  );
}

export default App;