import React from 'react';

const StatsPanel = ({ productosFiltrados }) => {
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

  // Cantidad de productos por categoría
  const cantidadPorCategoria = productosFiltrados.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Precio promedio por categoría
  const precioPromedioPorCategoria = Object.keys(cantidadPorCategoria).reduce((acc, category) => {
    const productosDeCategoria = productosFiltrados.filter(product => product.category === category);
    const promedioCategoria = (
      productosDeCategoria.reduce((sum, product) => sum + product.price, 0) / productosDeCategoria.length
    ).toFixed(2);
    acc[category] = promedioCategoria;
    return acc;
  }, {});

  // Producto más caro y más barato por categoría
  const productoMasCaroPorCategoria = {};
  const productoMasBaratoPorCategoria = {};
  
  productosFiltrados.forEach(product => {
    if (!productoMasCaroPorCategoria[product.category] || product.price > productoMasCaroPorCategoria[product.category].price) {
      productoMasCaroPorCategoria[product.category] = product;
    }
    if (!productoMasBaratoPorCategoria[product.category] || product.price < productoMasBaratoPorCategoria[product.category].price) {
      productoMasBaratoPorCategoria[product.category] = product;
    }
  });

  // Promedio de rating general
  const ratingPromedioGeneral = (productosFiltrados.reduce((acc, product) => acc + product.rating, 0) / productosFiltrados.length).toFixed(2);

  // Promedio de rating por categoría
  const ratingPromedioPorCategoria = {};
  Object.keys(cantidadPorCategoria).forEach(category => {
    const productosDeCategoria = productosFiltrados.filter(product => product.category === category);
    ratingPromedioPorCategoria[category] = (
      productosDeCategoria.reduce((acc, product) => acc + product.rating, 0) / productosDeCategoria.length
    ).toFixed(2);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estadísticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de estadísticas generales */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos Generales</h3>
          <p><strong>Precio Promedio:</strong> ${precioPromedio}</p>
          <p><strong>Precio Máximo:</strong> ${precioMaximo}</p>
          <p><strong>Precio Mínimo:</strong> ${precioMinimo}</p>
          <p><strong>Productos con stock &gt; 50:</strong> {productosConStockAlto}</p>
          <p><strong>Productos con rating &gt; 4.5:</strong> {productosConRatingAlto}</p>
        </div>

        {/* Tarjeta de estadísticas por categoría */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">📌 Por Categoría</h3>
          {Object.entries(cantidadPorCategoria).map(([category, count]) => (
            <p key={category}><strong>{category}:</strong> {count} productos - Precio Promedio: ${precioPromedioPorCategoria[category]}</p>
          ))}
        </div>
      </div>

      {/* Producto más caro y más barato por categoría */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">💰 Producto más caro y más barato por categoría</h3>
        {Object.keys(productoMasCaroPorCategoria).map(category => (
          <p key={category}>
            <strong>{category}:</strong> 
            Más caro: {productoMasCaroPorCategoria[category].name} (${productoMasCaroPorCategoria[category].price}) | 
            Más barato: {productoMasBaratoPorCategoria[category].name} (${productoMasBaratoPorCategoria[category].price})
          </p>
        ))}
      </div>

      {/* Rating Promedio */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">⭐ Rating Promedio</h3>
        <p><strong>General:</strong> {ratingPromedioGeneral}</p>
        {Object.entries(ratingPromedioPorCategoria).map(([category, rating]) => (
          <p key={category}><strong>{category}:</strong> Rating Promedio: {rating}</p>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;

