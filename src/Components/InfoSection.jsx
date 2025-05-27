function InfoSection({ darkMode }) {
  return (
    <section className={`py-12 ${darkMode ? "dark-mode bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
          Sobre este Proyecto
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Esta aplicación fue desarrollada como parte del Proyecto Integrador usando React con Vite,
          Tailwind CSS para estilos, Axios para conectarse con una API externa, y componentes modernos gracias a Tailblocks.
        </p>
      </div>
    </section>
  );
}

export default InfoSection;
