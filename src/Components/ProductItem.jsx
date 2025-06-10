import React from 'react';

const ProductItem = ({ product, darkMode }) => {
  return (
    <div
      className={`p-4 rounded shadow hover:shadow-md transition ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
        {product.title}
      </h2>
      <p className={`font-semibold ${darkMode ? "text-green-300" : "text-green-600"}`}>
        ${product.price}
      </p>
      <p className={`font-semibold ${darkMode ? "text-yellow-300" : "text-yellow-600"}`}>
        {product.rating}⭐
      </p>
    </div>
  );
};

export default ProductItem;


