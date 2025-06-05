import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StatsChart = ({ productosFiltrados, darkMode }) => {
  if (!productosFiltrados.length) return <p className="text-center text-gray-600">No hay datos disponibles.</p>;

  // Cantidad de productos por categoría (gráfico de Barras)
  const categorias = [...new Set(productosFiltrados.map(product => product.category))];
  const cantidadPorCategoria = categorias.map(category => productosFiltrados.filter(product => product.category === category).length);

  const dataBarras = {
    labels: categorias,
    datasets: [{ label: "Cantidad de productos", data: cantidadPorCategoria, backgroundColor: ["#f87171", "#4ade80", "#60a5fa"], borderRadius: 8 }],
  };

  // Simulación de evolución de precios (gráfico de Líneas)
  const labelsLinea = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
  const datasetsLinea = productosFiltrados.slice(0, 5).map(product => ({
    label: product.title,
    data: labelsLinea.map(() => product.price * (0.8 + Math.random() * 0.4)), 
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    fill: false,
  }));

  const dataLinea = { labels: labelsLinea, datasets: datasetsLinea };

  // Proporción de stock (Pie Chart)
  const bajoStock = productosFiltrados.filter(product => product.stock < 20).length;
  const medioStock = productosFiltrados.filter(product => product.stock >= 20 && product.stock <= 50).length;
  const altoStock = productosFiltrados.filter(product => product.stock > 50).length;

  const dataPie = {
    labels: ["Bajo Stock", "Medio Stock", "Alto Stock"],
    datasets: [{ data: [bajoStock, medioStock, altoStock], backgroundColor: ["#f87171", "#fbbf24", "#4ade80"] }],
  };

  const options = { responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true } } };

  return (
   <div className={`stats-chart ${darkMode ? "dark-mode" : ""} bg-white p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas y Visualizaciones</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cantidad de productos por categoría</h3>
          <div style={{ maxWidth: "700px" }}>
            <Bar key="bar-chart" data={dataBarras} options={options} />
          </div>
        </div>

        {/* Gráfico de Líneas */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Evolución de precios</h3>
          <div style={{ maxWidth: "700px" }}>
            <Line key= "line-chart" data={dataLinea} options={options} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Proporción de Stock</h3>
          <div style={{ maxWidth: "500px" }}>
            <Pie key= "pie-chart" data={dataPie} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;



