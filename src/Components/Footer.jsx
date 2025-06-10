function Footer({ darkMode }) {
  return (
    <footer className={`text-center py-4 ${darkMode ? "bg-gray-900 text-gray-300" : "footer-light text-gray-800"}`}>
      <p>Proyecto Integrador - Melania Ligorria &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
