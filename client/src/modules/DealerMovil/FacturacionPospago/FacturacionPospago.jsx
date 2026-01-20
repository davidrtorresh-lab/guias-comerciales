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
    let ciclo, corte, flp, suspParcial, suspTotal, factura2;

    if (transactionType === 'linea-nueva') {
      ciclo = new Date(fechaCompra);
      corte = new Date(fechaCompra);
      corte.setDate(corte.getDate() - 1);
      
      factura2 = new Date(ciclo);
      factura2.setDate(factura2.getDate() + 5);
      
      flp = new Date(ciclo);
      flp.setDate(flp.getDate() + 15);
      
      suspParcial = new Date(flp);
      suspParcial.setDate(suspParcial.getDate() + 2);
      
      suspTotal = new Date(ciclo);
      suspTotal.setMonth(suspTotal.getMonth() + 1);
      suspTotal.setDate(suspTotal.getDate() - 1);
    } else if (transactionType === 'portabilidad') {
      ciclo = new Date(fechaCompra);
      
      corte = new Date(ciclo);
      corte.setDate(corte.getDate() - 1);
      
      factura2 = new Date(ciclo);
      factura2.setDate(factura2.getDate() + 5);
      
      flp = new Date(ciclo);
      flp.setDate(flp.getDate() + 15);
      
      suspParcial = new Date(flp);
      suspParcial.setDate(suspParcial.getDate() + 2);
      
      suspTotal = new Date(ciclo);
      suspTotal.setMonth(suspTotal.getMonth() + 1);
      suspTotal.setDate(suspTotal.getDate() - 1);
    } else {
      ciclo = new Date(fechaCompra);
      
      corte = new Date(ciclo);
      corte.setDate(corte.getDate() - 1);
      
      factura2 = new Date(ciclo);
      factura2.setDate(factura2.getDate() + 5);
      
      flp = new Date(ciclo);
      flp.setDate(flp.getDate() + 15);
      
      suspParcial = new Date(flp);
      suspParcial.setDate(suspParcial.getDate() + 2);
      
      suspTotal = new Date(ciclo);
      suspTotal.setMonth(suspTotal.getMonth() + 1);
      suspTotal.setDate(suspTotal.getDate() - 1);
    }

    return {
      fechaCompra: fechaCompra.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      ciclo: ciclo.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' }),
      corte: corte.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' }),
      factura2: factura2.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' }),
      flp: flp.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' }),
      suspParcial: suspParcial.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' }),
      suspTotal: suspTotal.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })
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
                      ? `border-${type.color}-500 bg-${type.color}-50 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${isSelected ? `text-${type.color}-600` : 'text-gray-400'}`} />
                  <h3 className={`font-bold mb-2 ${isSelected ? `text-${type.color}-800` : 'text-gray-800'}`}>
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm font-semibold text-blue-800 mb-1">Fecha de Compra</div>
                <div className="text-lg font-bold text-blue-900">{ciclos.fechaCompra}</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="text-sm font-semibold text-purple-800 mb-1">Ciclo</div>
                <div className="text-lg font-bold text-purple-900">{ciclos.ciclo}</div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <div className="text-sm font-semibold text-indigo-800 mb-1">Corte</div>
                <div className="text-lg font-bold text-indigo-900">{ciclos.corte}</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-sm font-semibold text-green-800 mb-1">Entrega Factura 2</div>
                <div className="text-lg font-bold text-green-900">{ciclos.factura2}</div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <div className="text-sm font-semibold text-yellow-800 mb-1">Fecha Límite de Pago</div>
                <div className="text-lg font-bold text-yellow-900">{ciclos.flp}</div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="text-sm font-semibold text-orange-800 mb-1">Suspensión Parcial</div>
                <div className="text-lg font-bold text-orange-900">{ciclos.suspParcial}</div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 md:col-span-2 lg:col-span-3">
                <div className="text-sm font-semibold text-red-800 mb-1">Suspensión Total</div>
                <div className="text-lg font-bold text-red-900">{ciclos.suspTotal}</div>
                <div className="text-xs text-red-600 mt-1">Inicia si se acumulan 2 facturas sin pago</div>
              </div>
            </div>
          )}
        </div>

        {/* Conceptos Clave */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Conceptos Clave
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">CICLO</div>
              <p className="text-sm text-gray-700">Fecha de asignación de recursos del cliente y generación de la deuda</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">CORTE</div>
              <p className="text-sm text-gray-700">Fecha fin del ciclo, fecha límite para consumir los recursos</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">FLP</div>
              <p className="text-sm text-gray-700">Fecha hasta la cual se puede pagar la factura sin incurrir en retrasos</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}