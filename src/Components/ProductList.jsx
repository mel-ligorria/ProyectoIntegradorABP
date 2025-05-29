import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, darkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductItem key={product.id} product={product} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default ProductList;


