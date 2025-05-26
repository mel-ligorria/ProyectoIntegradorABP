import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
// Componentes
// import Hero from './Components/Hero';
import Hero from './Components/Hero';
import InfoSection from './Components/InfoSection';
import ProductList from './Components/ProductList'
import Footer from './Components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Hero />

      <div className="bg-gray-100 py-8 px-4 min-h-screen">
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
            <ProductList products={filteredProducts} />
          )}
        </div>
      </div>

      <InfoSection />
      <Footer />
    </>
  );
}

export default App;
