function SearchBar({ search, setSearch, categorias, categoriaSeleccionada, setCategoriaSeleccionada, ordenSeleccionado, setOrdenSeleccionado }) {
  return (
    <div className="search-bar flex flex-col gap-4">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded border mb-6 shadow-sm"
      />

      {/* Select de categorías */}
        <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
        <option value="">Todas las categorías</option>
        {categorias.map((cat) => (
        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
        ))}
        </select>



      {/* Select de ordenamiento */}
        <select value={ordenSeleccionado} onChange={(e) => setOrdenSeleccionado(e.target.value)} className="appearance-none p-2 border rounded bg-white">
        <option value="">Sin orden</option>
        <option value="precio-asc">Precio ↑</option>
        <option value="precio-desc">Precio ↓</option>
        <option value="rating-asc">Rating ⭐ ↑</option>
        <option value="rating-desc">Rating ⭐ ↓</option>
        </select>

    </div>
  );
}

export default SearchBar;
