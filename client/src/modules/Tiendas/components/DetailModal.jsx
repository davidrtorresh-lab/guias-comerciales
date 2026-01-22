import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function DetailModal({ data, onClose }) {
  const { plan, variant } = data;
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        
        {/* Header Modal */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-black text-blue-900 text-lg">
            {plan.vertical === 'MOVIL' ? 'Identificador del Plan' : 'Códigos de Venta'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 space-y-6">
          <div className="text-center mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Plan Seleccionado</span>
            <h4 className="text-xl font-bold text-gray-800 leading-tight">
              {plan.category} {plan.megas} <br/>
              <span className="text-blue-600">{variant.label}</span>
            </h4>
          </div>

          {plan.vertical === 'MOVIL' ? (
            // Contenido Móvil
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-xs font-bold text-blue-400 mb-2 uppercase">ID EN SISTEMA</p>
              <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
                <code className="text-sm font-mono font-bold text-blue-900 whitespace-pre-line text-left">
                  {variant.favMovil || plan.favMovil || "No disponible"}
                </code>
                <button 
                  onClick={() => handleCopy(variant.favMovil || plan.favMovil)}
                  className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-600"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ) : (
            // Contenido Hogar
            <div className="space-y-4">
              {/* Bloque HFC */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📡</span>
                  <span className="font-bold text-gray-700 text-sm">Tecnología HFC</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs overflow-hidden">
                      <span className="block font-bold text-gray-500 text-[10px]">PLAN</span>
                      <span className="font-mono font-semibold text-gray-800 truncate">{variant.favHFC || "N/A"}</span>
                    </div>
                    <button onClick={() => handleCopy(variant.favHFC)} className="text-blue-500 hover:text-blue-700 ml-2">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-200">
                    <div className="text-xs">
                      <span className="block font-bold text-gray-500 text-[10px]">ID POSPAGO</span>
                      <span className="font-mono font-semibold text-gray-800">{variant.idHFC || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-6 py-3 text-center">
          <button onClick={onClose} className="text-sm font-bold text-gray-500 hover:text-gray-800">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}