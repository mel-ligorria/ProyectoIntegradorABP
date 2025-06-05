import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

// Componentes
import Hero from './Components/Hero';
import InfoSection from './Components/InfoSection';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import StatsPanel from './Components/StatsPanel';
import StatsChart from "./Components/StatsChart";

function App() {
  // Estados
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState("");
  const [page, setPage] = useState(1); // Estado de paginación
  const [totalProducts, setTotalProducts] = useState(0); // Total de productos en la API
  const limit = 10; // Número de productos por página

  // Referencias
  const containerRef = useRef(null);

  // Carga el total de productos en la API
  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(res => setTotalProducts(res.data.total))
      .catch(err => console.error("Error al obtener total de productos:", err));
  }, []);

  // Carga productos con paginación desde la API
  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`)
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error al cargar productos:', err));
  }, [page]); // Se ejecuta cada vez que `page` cambia

  // Carga de categorías al iniciar la aplicación
  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error al cargar categorías:", err));
  }, []);

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  // Filtrar productos por búsqueda y categoría
  let productosFiltrados = products
    .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    .filter(product => categoriaSeleccionada ? product.category === categoriaSeleccionada : true);

  // Aplicar ordenamiento
  if (ordenSeleccionado === 'precio-asc') {
    productosFiltrados.sort((a, b) => a.price - b.price);
  } else if (ordenSeleccionado === 'precio-desc') {
    productosFiltrados.sort((a, b) => b.price - a.price);
  } else if (ordenSeleccionado === 'rating-asc') {
    productosFiltrados.sort((a, b) => a.rating - b.rating);
  } else if (ordenSeleccionado === 'rating-desc') {
    productosFiltrados.sort((a, b) => b.rating - a.rating);
  }

  //Funciones de exportación
  const exportToJSON = () => {
    const jsonData = JSON.stringify(productosFiltrados, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const fileURL = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.download = "productos.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(fileURL);
    setMensaje("¡Exportación a JSON completada!");
  };

  const exportToCSV = () => {
    const headers = Object.keys(productosFiltrados[0]).join(",");
    const rows = productosFiltrados.map(product => Object.values(product).join(",")).join("\n");
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const fileURL = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.download = "productos.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(fileURL);
    setMensaje("¡Exportación a CSV completada!");
  };

  return (
    <div ref={containerRef} className={`app ${darkMode ? "dark-mode" : ""}`}>
      <button onClick={toggleDarkMode}>Modo oscuro</button>

      <Hero darkMode={darkMode} />

      <div className="content py-8 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Barra de búsqueda y filtros */}
          <SearchBar 
            search={search} setSearch={setSearch} 
            categorias={categorias} categoriaSeleccionada={categoriaSeleccionada} setCategoriaSeleccionada={setCategoriaSeleccionada}
            ordenSeleccionado={ordenSeleccionado} setOrdenSeleccionado={setOrdenSeleccionado}
            darkMode={darkMode} 
          />

          {/* Mostrar productos filtrados */}
          {productosFiltrados.length === 0 ? (
            <p className="text-center text-red-600">No se encontraron productos.</p>
          ) : (
            <ProductList products={productosFiltrados} darkMode={darkMode} />
          )}

          {/* Botones de exportación */}
          <div className="flex gap-4 mt-6">
            <button onClick={exportToJSON}>Exportar a JSON</button>
            <button onClick={exportToCSV}>Exportar a CSV</button>
            {mensaje && <p className="text-green-600 font-semibold">{mensaje}</p>}
          </div>

          {/* Paginación con botones corregidos */}
          <div className="pagination flex justify-center gap-4 mt-6">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Página anterior</button>
            <small>Estamos en la Página {page}</small>
            <button disabled={page * limit >= totalProducts} onClick={() => setPage(page + 1)}>Página siguiente</button>
          </div>
        </div>
      </div>

      <StatsPanel productosFiltrados={productosFiltrados} darkMode={darkMode} />
      <StatsChart productosFiltrados={productosFiltrados} darkMode={darkMode}/>
      <InfoSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;


