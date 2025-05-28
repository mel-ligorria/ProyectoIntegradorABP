import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

// Componentes
import Hero from './Components/Hero';
import InfoSection from './Components/InfoSection';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';

function App() {
  // Estados
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('');

  // Referencias
  const containerRef = useRef(null);

  // Cargar productos al iniciar la aplicación
  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  // Cargar categorías al iniciar la aplicación
  useEffect(() => {
  axios.get("https://dummyjson.com/products/categories")
    .then(res => {
      console.log("Categorías obtenidas:", res.data); // Esto mostrará cómo vienen los datos
      setCategorias(res.data);
    })
    .catch(err => console.error("Error al cargar categorías:", err));
}, []);

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };

  // Filtrar productos por búsqueda y categoría
  let productosFiltrados = products
    .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    .filter(product => categoriaSeleccionada ? product.category === categoriaSeleccionada : true);

  // Aplicar ordenamiento después del filtrado
  if (ordenSeleccionado === 'precio-asc') {
    productosFiltrados.sort((a, b) => a.price - b.price);
  } else if (ordenSeleccionado === 'precio-desc') {
    productosFiltrados.sort((a, b) => b.price - a.price);
  } else if (ordenSeleccionado === 'rating-asc') {
    productosFiltrados.sort((a, b) => a.rating - b.rating);
  } else if (ordenSeleccionado === 'rating-desc') {
    productosFiltrados.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div ref={containerRef} className={`app ${darkMode ? "dark-mode" : ""}`}>
      <button onClick={toggleDarkMode}>Modo oscuro</button>

      <Hero darkMode={darkMode} />

      <div className="content py-8 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* SearchBar centraliza búsqueda, filtros y ordenamiento */}
          <SearchBar 
            search={search} setSearch={setSearch} 
            categorias={categorias} categoriaSeleccionada={categoriaSeleccionada} setCategoriaSeleccionada={setCategoriaSeleccionada}
            ordenSeleccionado={ordenSeleccionado} setOrdenSeleccionado={setOrdenSeleccionado}
          />

          {/* Mostrar productos filtrados */}
          {productosFiltrados.length === 0 ? (
            <p className="text-center text-red-600">No se encontraron productos.</p>
          ) : (
            <ProductList products={productosFiltrados} darkMode={darkMode} />
          )}
        </div>
      </div>

      <InfoSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
