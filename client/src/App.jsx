import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Smartphone, Store, Users } from 'lucide-react';
import DealerMovil from './modules/DealerMovil/DealerMovil';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">Guías Comerciales</span>
              </Link>
              <div className="flex gap-4">
                <Link to="/dealer-movil" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Smartphone className="w-5 h-5" />
                  Dealer Móvil
                </Link>
                <Link to="/tiendas" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Store className="w-5 h-5" />
                  Tiendas
                </Link>
                <Link to="/fvd" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Users className="w-5 h-5" />
                  FVD
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
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
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Bienvenido a Guías Comerciales</h1>
        <p className="text-xl text-gray-600 mb-8">Selecciona una unidad de negocio para comenzar</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Link to="/dealer-movil" className="p-8 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border-2 border-blue-200 hover:scale-105 transform duration-200">
            <Smartphone className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Dealer Móvil</h2>
            <p className="text-gray-600 mt-2">Facturación Pospago, Combinaciones y más</p>
          </Link>
          <Link to="/tiendas" className="p-8 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border-2 border-green-200 hover:scale-105 transform duration-200">
            <Store className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">Tiendas</h2>
            <p className="text-gray-600 mt-2">Próximamente</p>
          </Link>
          <Link to="/fvd" className="p-8 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors border-2 border-purple-200 hover:scale-105 transform duration-200">
            <Users className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">FVD</h2>
            <p className="text-gray-600 mt-2">Próximamente</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
      >
        <Home className="w-5 h-5" />
        Volver al inicio
      </Link>
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-xl text-gray-600">Esta sección estará disponible próximamente</p>
      </div>
    </div>
  );
}

export default App;