import { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle, Clock, FileText, Users, Smartphone } from 'lucide-react';

export default function FacturacionPospago() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState('linea-nueva');
  const [ciclos, setCiclos] = useState(null);

  const transactionTypes = [
    {
      id: 'linea-nueva',
      title: 'Línea Nueva',
      description: 'Línea que se compra por primera vez dentro de la compañía, con un número completamente nuevo',
      icon: Smartphone,
      color: 'blue'
    },
    {
      id: 'portabilidad',
      title: 'Portabilidad',
      description: 'Cambio de operador de telefonía móvil conservando el mismo número',
      icon: Users,
      color: 'green'
    },
    {
      id: 'migracion',
      title: 'Migración',
      description: 'Cambio de plan tarifario, conservando su número de teléfono, pasando de Prepago a Pospago',
      icon: FileText,
      color: 'orange'
    }
  ];

  const calculateCiclos = (date, transactionType) => {
    if (!date) return null;

    const fechaCompra = new Date(date + 'T00:00:00');
    let ciclo, corte, factura2, flp, suspParcial, suspTotal;

    // FACTURACIÓN ANTICIPADA:
    // Ciclo = Día de compra (línea nueva/migración) o día siguiente (portabilidad)
    if (transactionType === 'portabilidad') {
      ciclo = new Date(fechaCompra);
      ciclo.setDate(ciclo.getDate() + 1); // Portabilidad: ciclo al día siguiente
    } else {
      ciclo = new Date(fechaCompra); // Línea nueva/migración: ciclo el mismo día
    }

    // Corte = Un día antes del ciclo del próximo mes
    corte = new Date(ciclo);
    corte.setMonth(corte.getMonth() + 1);
    corte.setDate(corte.getDate() - 1);

    // Factura 2 = Se entrega 5 días después del primer ciclo (aproximadamente 35-36 días después de activación)
    factura2 = new Date(ciclo);
    factura2.setMonth(factura2.getMonth() + 1);
    factura2.setDate(factura2.getDate() + 5);

    // FLP = 15 días después del primer ciclo mensual (20 días desde entrega de factura)
    flp = new Date(ciclo);
    flp.setMonth(flp.getMonth() + 1);
    flp.setDate(flp.getDate() + 20);

    // Suspensión Parcial = 2 días después de FLP
    suspParcial = new Date(flp);
    suspParcial.setDate(suspParcial.getDate() + 2);

    // Suspensión Total = Al siguiente ciclo si no hay pago (2 facturas acumuladas)
    suspTotal = new Date(ciclo);
    suspTotal.setMonth(suspTotal.getMonth() + 2);
    suspTotal.setDate(suspTotal.getDate() - 1);

    return {
      fechaCompra: fechaCompra.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      ciclo: ciclo.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      corte: corte.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      factura2: factura2.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      flp: flp.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      suspParcial: suspParcial.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      suspTotal: suspTotal.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setCiclos(calculateCiclos(date, selectedTransaction));
  };

  const handleTransactionChange = (type) => {
    setSelectedTransaction(type);
    if (selectedDate) {
      setCiclos(calculateCiclos(selectedDate, type));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Facturación Pospago</h1>
          <p className="text-gray-600">Dealer Móvil - Calculadora de Ciclos y Guía Interactiva</p>
        </div>

        {/* Tipos de Transacción */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Tipos de Transacción
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {transactionTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedTransaction === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleTransactionChange(type.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? type.color === 'blue' ? 'border-blue-500 bg-blue-50 shadow-lg' :
                        type.color === 'green' ? 'border-green-500 bg-green-50 shadow-lg' :
                        'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${
                    isSelected 
                      ? type.color === 'blue' ? 'text-blue-600' :
                        type.color === 'green' ? 'text-green-600' :
                        'text-orange-600'
                      : 'text-gray-400'
                  }`} />
                  <h3 className={`font-bold mb-2 ${
                    isSelected 
                      ? type.color === 'blue' ? 'text-blue-800' :
                        type.color === 'green' ? 'text-green-800' :
                        'text-orange-800'
                      : 'text-gray-800'
                  }`}>
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                  {isSelected && type.id === 'portabilidad' && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-xs font-semibold text-green-700">
                        ⚠️ El ciclo se asigna al día siguiente de la activación
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculadora de Ciclos */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Calculadora de Ciclos
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selecciona la fecha de compra/activación:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full md:w-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {ciclos && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="text-sm font-semibold text-blue-800 mb-1">Fecha de Compra/Activación</div>
                  <div className="text-lg font-bold text-blue-900">{ciclos.fechaCompra}</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="text-sm font-semibold text-purple-800 mb-1">Ciclo (Asignación)</div>
                  <div className="text-lg font-bold text-purple-900">{ciclos.ciclo}</div>
                  {selectedTransaction === 'portabilidad' && (
                    <div className="text-xs text-purple-600 mt-1">⚠️ Día siguiente a la activación</div>
                  )}
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                  <div className="text-sm font-semibold text-indigo-800 mb-1">Corte</div>
                  <div className="text-lg font-bold text-indigo-900">{ciclos.corte}</div>
                  <div className="text-xs text-indigo-600 mt-1">Un día antes del próximo ciclo</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="text-sm font-semibold text-green-800 mb-1">Entrega Factura 2</div>
                  <div className="text-lg font-bold text-green-900">{ciclos.factura2}</div>
                  <div className="text-xs text-green-600 mt-1">5 días después del ciclo mensual</div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="text-sm font-semibold text-yellow-800 mb-1">Fecha Límite de Pago (FLP)</div>
                  <div className="text-lg font-bold text-yellow-900">{ciclos.flp}</div>
                  <div className="text-xs text-yellow-600 mt-1">20 días después del ciclo mensual</div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="text-sm font-semibold text-orange-800 mb-1">Suspensión Parcial</div>
                  <div className="text-lg font-bold text-orange-900">{ciclos.suspParcial}</div>
                  <div className="text-xs text-orange-600 mt-1">2 días después de FLP</div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 md:col-span-2 lg:col-span-3">
                  <div className="text-sm font-semibold text-red-800 mb-1">Suspensión Total</div>
                  <div className="text-lg font-bold text-red-900">{ciclos.suspTotal}</div>
                  <div className="text-xs text-red-600 mt-1">⚠️ Inicia si se acumulan 2 facturas sin pago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Conceptos Clave */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Conceptos Clave - Facturación Anticipada
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">CICLO</div>
              <p className="text-sm text-gray-700">Día de asignación del ciclo. En portabilidad se asigna al día siguiente de la activación</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">CORTE</div>
              <p className="text-sm text-gray-700">Un día antes del ciclo del mes siguiente. Fecha límite para consumir los recursos</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">FACTURA 2</div>
              <p className="text-sm text-gray-700">Se entrega aproximadamente 35-40 días después de la activación (5 días después del primer ciclo mensual)</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">FLP</div>
              <p className="text-sm text-gray-700">Fecha límite de pago, aproximadamente 20 días después del ciclo mensual</p>
            </div>
          </div>
          
          {/* Nota importante sobre Facturación Anticipada */}
          <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">¿Qué es la Facturación Anticipada?</h3>
                <p className="text-sm leading-relaxed">
                  En Tigo, el cliente <strong>paga por adelantado</strong> el mes 1 y recibe recursos inmediatamente. 
                  No hay scoring en el primer mes. La primera factura (Factura 2) llega aproximadamente 35-40 días después 
                  de la activación, y el cliente tendrá 15 días adicionales para pagarla (FLP).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recordatorios Importantes */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Recordatorios Importantes
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-red-800">Autorización de Datos y Contrato</div>
                <div className="text-sm text-red-700">Toda venta debe diligenciar la Autorización de Datos y Contrato Pospago dentro de las 48 horas, de lo contrario será penalizada</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-yellow-800">Devolución de Contratos</div>
                <div className="text-sm text-yellow-700">En caso de devolución, realízalo de inmediato luego de recibir la notificación del error</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-blue-800">Migración - Antigüedad</div>
                <div className="text-sm text-blue-700">Antes de realizar una migración, consulta que la antigüedad de la línea sea mayor a 60 días</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-purple-800">Facturación Anticipada</div>
                <div className="text-sm text-purple-700">No hay scoring en el primer mes. El cliente paga anticipado el mes 1 y recibe recursos inmediatamente</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-green-800">Portabilidad - Ciclo Especial</div>
                <div className="text-sm text-green-700">En portabilidad, el ciclo se asigna al día SIGUIENTE de la activación, a diferencia de línea nueva y migración donde es el mismo día</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}