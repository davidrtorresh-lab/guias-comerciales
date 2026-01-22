import { useState } from 'react';
import { Check, Wifi } from 'lucide-react';

export default function PlanCard({ plan, onOpenDetail }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const variant = plan.variations[selectedVariantIndex];

  // Detectar si es un header claro (como el amarillo táctico) para ajustar texto
  const isLightHeader = plan.headerClass.includes('from-[#FFC800]');
  const headerTextColor = isLightHeader ? 'text-blue-900' : 'text-white';

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col w-full max-w-sm mx-auto transform hover:-translate-y-1">
      
      {/* Header con gradiente */}
      <div className={`${plan.headerClass} p-5 ${headerTextColor} text-center relative pb-10`}>
        {/* Ribbon si existe promo */}
        {variant.promoText && (
          <div className="absolute top-4 right-0 bg-yellow-400 text-blue-900 text-[10px] font-bold px-3 py-1 shadow-md">
            OFERTA
          </div>
        )}
        
        <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-90 mb-1">
          {plan.category}
        </p>
        <div className="flex justify-center items-baseline gap-1">
          <span className="text-4xl font-black">{plan.megas}</span>
          <span className="text-lg font-bold opacity-90">{plan.manualUnit}</span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wide opacity-90 block mt-1">
          {plan.desc}
        </span>
      </div>

      {/* Barra de especificaciones (flotando sobre el header) */}
      <div className="flex justify-center gap-2 -mt-7 mb-4 relative z-10">
        <div className="bg-white border border-gray-200 px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 shadow-sm flex items-center gap-1">
          <Wifi className="w-3 h-3 text-blue-800" /> {plan.tech}
        </div>
        {plan.estrato && (
          <div className="bg-white border border-gray-200 px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 shadow-sm flex items-center gap-1">
            <span className="text-yellow-500">🏠</span> E: {plan.estrato}
          </div>
        )}
      </div>

      <div className="p-5 pt-0 flex flex-col flex-grow text-center">
        {/* Selector de Variantes */}
        {plan.variations.length > 1 && (
          <div className="bg-gray-100 rounded-full p-1 flex mb-4">
            {plan.variations.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVariantIndex(idx)}
                className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase transition-all duration-300 ${
                  selectedVariantIndex === idx
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Precio y Promo */}
        <div className="mb-4">
          <span className="text-[10px] font-black text-blue-900 uppercase tracking-wide block mb-1">
            {variant.promoText}
          </span>
          <span className="text-3xl font-black text-blue-900 block tracking-tight">
            {variant.price}
          </span>
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-[11px] font-bold px-2 py-1 rounded mt-2 inline-block">
            ⚠️ {variant.regular}
          </div>
        </div>

        {/* Lista de características (con soporte HTML básico para negritas) */}
        <div className="text-left space-y-2 mb-6 flex-grow">
          {variant.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs font-medium text-gray-600 leading-snug">
              <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" strokeWidth={3} />
              <span dangerouslySetInnerHTML={{ __html: feature }}></span>
            </div>
          ))}
        </div>

        {/* Botón de Acción */}
        <button
          onClick={() => onOpenDetail(plan, variant)}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-xs tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2 mt-auto"
        >
          {plan.vertical === 'MOVIL' ? '🆔 VER ID PLAN' : '★ VER CÓDIGOS'}
        </button>
      </div>
    </div>
  );
}