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

  {/* Estadísticas */}
const calcularPromedio = (arr, key) => {
    const total = arr.reduce((acc, el) => acc + el[key], 0);
    return arr.length > 0 ? (total / arr.length).toFixed(2) : "No disponible";
  };

  const precioPromedio = calcularPromedio(productosFiltrados, 'price');
  const precioMax = productosFiltrados.length > 0 ? Math.max(...productosFiltrados.map(p => p.price)).toFixed(2) : "No disponible";
  const precioMin = productosFiltrados.length > 0 ? Math.min(...productosFiltrados.map(p => p.price)).toFixed(2) : "No disponible";
  const promedioRatingGeneral = calcularPromedio(productosFiltrados, 'rating');

  // Estadísticas por categoría
  const cantidadPorCategoria = categorias.map(cat => ({
    categoria: cat,
    cantidad: productosFiltrados.filter(p => p.category === cat).length
  }));

  const promedioPorCategoria = categorias.map(cat => {
    const productosCat = productosFiltrados.filter(p => p.category === cat);
    return {
      categoria: cat,
      promedio: productosCat.length ? calcularPromedio(productosCat, 'price') : "No disponible"
    };
  });

  const extremosPorCategoria = categorias.map(cat => {
    const productosCat = productosFiltrados.filter(p => p.category === cat);
    if (productosCat.length === 0) {
      return { categoria: cat, masBarato: "No disponible", masCaro: "No disponible" };
    }
    const masCaro = Math.max(...productosCat.map(p => p.price));
    const masBarato = Math.min(...productosCat.map(p => p.price));
    return {
      categoria: cat,
      masCaro: masCaro.toFixed(2),
      masBarato: masBarato.toFixed(2)
    };
  });

  const ratingPorCategoria = categorias.map(cat => {
    const productosCat = productosFiltrados.filter(p => p.category === cat);
    return {
      categoria: cat,
      promedioRating: productosCat.length ? calcularPromedio(productosCat, 'rating') : "No disponible"
    };
  });

  const productosStockMayor50 = productosFiltrados.filter(p => p.stock > 50).length;
  const productosRatingAlto = productosFiltrados.filter(p => p.rating > 4.5).length;





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
      <StatsPanel
       precioPromedio={parseFloat(precioPromedio)}
  precioMax={parseFloat(precioMax)}
  precioMin={parseFloat(precioMin)}
  cantidadPorCategoria={cantidadPorCategoria}
  productosStockMayor50={productosStockMayor50}
  productosRatingAlto={productosRatingAlto}
  promedioPorCategoria={promedioPorCategoria}
  extremosPorCategoria={extremosPorCategoria}
  promedioRatingGeneral={parseFloat(promedioRatingGeneral)}
  ratingPorCategoria={ratingPorCategoria}
    />
      <InfoSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
