function ProductList({ products, darkMode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div
          key={product.id}
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
        </div>
      ))}
    </div>
  );
}

export default ProductList;

