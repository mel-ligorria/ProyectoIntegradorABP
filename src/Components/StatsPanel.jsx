import React from 'react';

const StatsPanel = ({ productosFiltrados, darkMode }) => {
  if (!productosFiltrados.length) {
    return <p className="text-center text-gray-600">No hay productos disponibles para calcular estadísticas.</p>;
  }

  // Cálculos de estadísticas
  const precios = productosFiltrados.map(product => product.price);
  const precioPromedio = (precios.reduce((acc, price) => acc + price, 0) / precios.length).toFixed(2);
  const precioMaximo = Math.max(...precios);
  const precioMinimo = Math.min(...precios);
  const productosConStockAlto = productosFiltrados.filter(product => product.stock > 50).length;
  const productosConRatingAlto = productosFiltrados.filter(product => product.rating > 4.5).length;

  return (
    <div className={`stats-panel ${darkMode ? "dark-mode" : ""} bg-white p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas</h2>

      {/* Datos generales */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos Generales</h3>
        <p><strong>Precio Promedio:</strong> ${precioPromedio}</p>
        <p><strong>Precio Máximo:</strong> ${precioMaximo}</p>
        <p><strong>Precio Mínimo:</strong> ${precioMinimo}</p>
        <p><strong>Productos con stock &gt; 50:</strong> {productosConStockAlto}</p>
        <p><strong>Productos con rating &gt; 4.5:</strong> {productosConRatingAlto}</p>
      </div>
    </div>
  );
};

export default StatsPanel;

