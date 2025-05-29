function StatsPanel({
  precioPromedio,
  precioMax,
  precioMin,
  cantidadPorCategoria = [],
  productosStockMayor50,
  productosRatingAlto,
  promedioPorCategoria = [],
  extremosPorCategoria = [],
  promedioRatingGeneral,
  ratingPorCategoria = []
}) {

  return (
    <div className="stats-panel" style={{ display: "block", visibility: "visible", opacity: 1 }}>
      <h2>Estadísticas Generales</h2>

      <p>Precio Promedio: ${typeof precioPromedio === "number" ? precioPromedio.toFixed(2) : "No disponible"}</p>
      <p>Precio Máximo: ${typeof precioMax === "number" ? precioMax.toFixed(2) : "No disponible"}</p>
      <p>Precio Mínimo: ${typeof precioMin === "number" ? precioMin.toFixed(2) : "No disponible"}</p>

      <h3>Productos por Categoría:</h3>
      <ul>
        {Array.isArray(cantidadPorCategoria) && cantidadPorCategoria.length > 0 ? (
          cantidadPorCategoria.map((item, index) => (
            <li key={index}>
              {item?.categoria}: {item?.cantidad ?? "No disponible"}
            </li>
          ))
        ) : (
          <li>No hay datos disponibles.</li>
        )}
      </ul>

      <p>Productos con Stock {">"} 50: {typeof productosStockMayor50 === "number" ? productosStockMayor50 : "No disponible"}</p>
      <p>⭐ Productos con Rating {">"} 4.5: {typeof productosRatingAlto === "number" ? productosRatingAlto : "No disponible"}</p>

      <h3>Promedio de Precio por Categoría:</h3>
      <ul>
        {Array.isArray(promedioPorCategoria) && promedioPorCategoria.length > 0 ? (
          promedioPorCategoria.map((item, index) => (
            <li key={index}>
              {item?.categoria}: ${typeof item?.promedio === "number" ? item.promedio.toFixed(2) : "No disponible"}
            </li>
          ))
        ) : (
          <li>No hay datos disponibles.</li>
        )}
      </ul>

      <h3>Extremos de Precio por Categoría:</h3>
      <ul>
        {Array.isArray(extremosPorCategoria) && extremosPorCategoria.length > 0 ? (
          extremosPorCategoria.map((item, index) => (
          <li key={index}>
          {item?.categoria} - Mín: {item?.masBarato?.name ?? "No disponible"}, Máx: {item?.masCaro?.name ?? "No disponible"}
          </li>
          ))
        ) : (
          <li>No hay datos disponibles.</li>
        )}
      </ul>

      <p>🌟 Promedio de Rating General: {typeof promedioRatingGeneral === "number" ? promedioRatingGeneral.toFixed(2) : "No disponible"}</p>

      <h3>⭐ Rating Promedio por Categoría:</h3>
      <ul>
        {Array.isArray(ratingPorCategoria) && ratingPorCategoria.length > 0 ? (
          ratingPorCategoria.map((item, index) => (
            <li key={index}>
              {item?.categoria}: {typeof item?.promedioRating === "number" ? item.promedioRating.toFixed(2) : "No disponible"}
            </li>
          ))
        ) : (
          <li>No hay datos disponibles.</li>
        )}
      </ul>
    </div>
  );
}

export default StatsPanel;

