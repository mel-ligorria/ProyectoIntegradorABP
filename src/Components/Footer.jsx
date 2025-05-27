function Footer({ darkMode }) {
  return (
    <footer className={`text-center py-4 ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-800 text-white"}`}>
      <p>Proyecto Integrador - Melania Ligorria &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;