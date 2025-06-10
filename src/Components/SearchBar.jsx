function SearchBar({ search, setSearch, categorias, categoriaSeleccionada, setCategoriaSeleccionada, ordenSeleccionado, setOrdenSeleccionado, darkMode }) {
  return (
    <div className={`search-bar flex flex-col gap-4 ${darkMode ? "dark-mode" : ""}`}>
      {/* Input de búsqueda */}
      <input
        key="input-search"
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded border mb-6 shadow-sm"
      />

      {/* Select de categorías */}
        <select key="categories" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
        <option value="">Todas las categorías</option>
        {categorias.map((cat) => (
        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
        ))}
        </select>

      {/* Select de ordenamiento */}
        <select key="ordering" value={ordenSeleccionado} onChange={(e) => setOrdenSeleccionado(e.target.value)}>
          <option value="">Sin orden</option>
          <option value="precio-asc">Precio Ascedente</option>
          <option value="precio-desc">Precio Descendente</option>
          <option value="rating-asc">Rating ⭐ Ascedente </option>
          <option value="rating-desc">Rating ⭐ Descendente</option>
        </select>

    </div>
  );
}

export default SearchBar;
