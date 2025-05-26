function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div
          key={product.id}
          className="bg-white p-4 rounded shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-green-600 font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
