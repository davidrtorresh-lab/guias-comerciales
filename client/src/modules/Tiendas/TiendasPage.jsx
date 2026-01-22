import { useState } from 'react';
import { Home, Smartphone, ArrowLeft } from 'lucide-react';
import { planesDB } from './data/planesDB';
import PlanCard from './components/PlanCard';
import DetailModal from './components/DetailModal';

export default function TiendasPage() {
  const [view, setView] = useState('landing');
  const [vertical, setVertical] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('FULL TIGO');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const filters = vertical === 'HOGAR' 
    ? ['FULL TIGO', 'TACTICO', 'NACIONAL']
    : ['POSPAGO', 'MOVIL_TACTICO'];

  const handleStart = (selectedVertical) => {
    setVertical(selectedVertical);
    setCategoryFilter(selectedVertical === 'HOGAR' ? 'FULL TIGO' : 'POSPAGO');
    setView('dashboard');
  };

  const filteredPlans = planesDB.filter(p => p.vertical === vertical && p.category === categoryFilter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* VISTA LANDING */}
      {view === 'landing' && (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 animate-fadeIn">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black text-blue-900 mb-2 uppercase tracking-tighter">Tiendas Costa</h1>
            <p className="text-gray-500">Selecciona una unidad de negocio</p>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <button 
              onClick={() => handleStart('HOGAR')}
              className="bg-white w-64 h-56 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 flex flex-col items-center justify-center transition-all transform hover:-translate-y-2 group"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <Home className="w-10 h-10 text-blue-900" />
              </div>
              <span className="text-2xl font-black text-blue-900 tracking-wide">HOGAR</span>
              <span className="text-sm font-semibold text-gray-400 mt-1">Internet + TV</span>
            </button>

            <button 
              onClick={() => handleStart('MOVIL')}
              className="bg-white w-64 h-56 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 flex flex-col items-center justify-center transition-all transform hover:-translate-y-2 group"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <Smartphone className="w-10 h-10 text-blue-900" />
              </div>
              <span className="text-2xl font-black text-blue-900 tracking-wide">MÓVIL</span>
              <span className="text-sm font-semibold text-gray-400 mt-1">Pospago</span>
            </button>
          </div>
        </div>
      )}

      {/* VISTA DASHBOARD */}
      {view === 'dashboard' && (
        <div className="animate-slideIn">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-3">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{vertical === 'HOGAR' ? '🏠' : '📱'}</span>
                  <h2 className="text-xl font-black text-blue-900 tracking-tight">{vertical}</h2>
                </div>
                <button onClick={() => setView('landing')} className="md:hidden p-2 bg-gray-100 rounded-full text-gray-600">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-2 bg-gray-100 p-1 rounded-full overflow-x-auto max-w-full">
                {filters.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      categoryFilter === cat 
                        ? 'bg-blue-900 text-white shadow-md' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <button onClick={() => setView('landing')} className="hidden md:flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold text-xs uppercase transition-colors">
                <ArrowLeft className="w-4 h-4" /> Salir
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlans.map(plan => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  onOpenDetail={(p, v) => setSelectedPlan({ plan: p, variant: v })} 
                />
              ))}
            </div>
            {filteredPlans.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                No hay ofertas disponibles.
              </div>
            )}
          </div>
        </div>
      )}

      {selectedPlan && (
        <DetailModal data={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}