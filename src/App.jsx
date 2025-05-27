import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'

// Componentes
// import Hero from './Components/Hero';
import Hero from './Components/Hero';
import InfoSection from './Components/InfoSection';
import ProductList from './Components/ProductList'
import Footer from './Components/Footer';

function App() {
  // Estados
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  //Referencias
const containerRef = useRef(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  //Función adicional para boton modo oscuro
  const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  containerRef.current.classList.toggle.add("dark-mode");
};

  return (
<div ref={containerRef} className={`app ${darkMode ? " dark-mode" : ""}`}>
  <button onClick={toggleDarkMode}>Modo oscuro</button>

  <Hero darkMode={darkMode} />
  <div className="content py-8 px-4 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded border mb-6 shadow-sm"
      />
      {filteredProducts.length === 0 ? (
        <p className="text-center text-red-600">No se encontraron productos.</p>
      ) : (
        <ProductList products={filteredProducts} darkMode={darkMode} />
      )}
    </div>
  </div>

  <InfoSection darkMode={darkMode}  />
  <Footer  darkMode={darkMode} />
</div>

  );
}

export default App;
