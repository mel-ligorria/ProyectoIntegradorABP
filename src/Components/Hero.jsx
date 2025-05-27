function Hero({ darkMode }) {
  return (
    <section className={`body-font py-16 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700"}`}>
      <div className="container mx-auto flex px-5 items-center justify-center flex-col">
        <h1 className={`title-font sm:text-5xl text-4xl mb-4 font-bold text-center ${darkMode ? "text-purple-300" : "text-blue-600"}`}>
          Proyecto Integrador
        </h1>
        <p className={`mb-8 leading-relaxed text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Descubrí productos, filtralos y analizalos para encontrar lo que más te gusta.
        </p>
      </div>
    </section>
  );
}

export default Hero;
