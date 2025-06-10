import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StatsChart = ({ productosFiltrados, darkMode }) => {
  if (!productosFiltrados.length) return <p className="text-center text-gray-600">No hay datos disponibles.</p>;

  const defaultColors = [
    "#f87171",
    "#fbbf24",
    "#4ade80",
    "#60a5fa",
    "#a78bfa",
    "#f472b6",
    "#a1a1aa",
    "#eab308",
    "#84cc16",
    "#06b6d4",
  ];

  // Función para preparar los datos para el Line Chart
  const prepareChartLineData = (products) => {
    const labelsLinea = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
    const datasetsLinea = products.map(product => ({
      label: product.title,
      data: labelsLinea.map(() => product.price * (0.8 + Math.random() * 0.4)),
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      fill: false,
    }));

    return { labels: labelsLinea, datasets: datasetsLinea };
  };

  // Función para preparar los datos para el Bar Chart
  const prepareChartBarData = (products) => {
    const categoryCounts = {};

    // Contar la cantidad de productos por categoría
    products.forEach(product => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });

    const labels = Object.keys(categoryCounts);
    const dataValues = Object.values(categoryCounts);

    return {
      labels: labels,
      datasets: [{
        label: 'Cantidad de Productos',
        data: dataValues,
        backgroundColor: defaultColors,
        borderColor: defaultColors.map(color => color.replace(')', ', 0.8)')),
        borderWidth: 1,
      }],
    };
  };

  // Función para preparar los datos para el Pie Chart
  const prepareChartPieData = (products) => {
    const labels = [];
    const dataValues = [];
    const backgroundColors = [];

    // Calcula el stock total para obtener las proporciones
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

    products.forEach((product, index) => {
      labels.push(product.title);
      dataValues.push(((product.stock / totalStock) * 100).toFixed(2));
      backgroundColors.push(defaultColors[index % defaultColors.length]);
    });

    return {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      }],
    };
  };

  const dataPie = prepareChartPieData(productosFiltrados);
  const dataBarras = prepareChartBarData(productosFiltrados);
  const dataLinea = prepareChartLineData(productosFiltrados);

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Cantidad: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categoría',
          font: {
            size: 16
          }
        }
      },
      y: {
        beginAtZero: true, // Asegura que el eje Y comience en 0
        title: {
          display: true,
          text: 'Número de Productos',
          font: {
            size: 16
          }
        },
        ticks: {
          precision: 0 // Para mostrar solo números enteros en el eje Y
        }
      }
    }
  };

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed + '%';
          }
        },
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        }
      }
    }
  };

  const optionsLine = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y.toFixed(2)}`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Fecha',
          font: {
            size: 16
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Precio',
          font: {
            size: 16
          }
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div className={`stats-chart ${darkMode ? "dark-mode" : ""} bg-white p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas y Visualizaciones</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cantidad de productos por categoría</h3>
          <div style={{ maxWidth: "700px" }}>
            <Bar key="bar-chart" data={dataBarras} options={optionsBar} />
          </div>
        </div>

        {/* Gráfico de Líneas */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Evolución de Precios</h3>
          <div style={{ maxWidth: "700px" }}>
            <Line key="line-chart" data={dataLinea} options={optionsLine} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Proporción de Productos según Stock</h3>
          <div style={{ maxWidth: "500px", margin: "auto" }}> {/* Centra el gráfico */}
            <Pie key="pie-chart" data={dataPie} options={optionsPie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;



