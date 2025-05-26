# Proyecto Integrdor ABP- ISPC

# Proyecto React + Axios + Tailwind

Este proyecto tiene como objetivo reforzar conceptos fundamentales de **React**, consumir datos desde una API externa usando **Axios**, implementar una funcionalidad de búsqueda, y mejorar la experiencia visual mediante **Tailwind CSS** y una correcta **componentización**.

---

## 🗓️ Semana 1 – React + Axios + Búsqueda

### Objetivo

- Consolidar los fundamentos de React: estado, props, efectos.
- Consumir la API de DummyJSON con Axios.
- Implementar una búsqueda dinámica de productos.

### Tareas Realizadas

- Partimos de un proyecto base en React.
- Obtenemos 100 productos desde la API: [https://dummyjson.com/products?limit=100](https://dummyjson.com/products?limit=100).
- Mostramos una **lista de productos** con su **nombre** y **precio**.
- Implementamos un **input de búsqueda** para filtrar los productos.
- Se muestra un **mensaje si no hay coincidencias** con la búsqueda.
- Agregamos un **botón** para mostrar u ocultar estadísticas (por ejemplo, promedio de precios, cantidad total de productos, etc.).

---

## 🗓️ Semana 2 – Tailwind CSS + Componentización

### Objetivo

- Estilizar la aplicación utilizando Tailwind CSS.
- Mejorar la estructura del proyecto dividiéndolo en componentes reutilizables.

### Tareas Realizadas

- Configuramos **Tailwind CSS** en el proyecto React.
- Se crearon y utilizaron los siguientes componentes:
  - `ProductList` – Renderiza la lista completa de productos.
  - `ProductItem` – Muestra la información de cada producto individual.
  - `StatsPanel` – Muestra estadísticas dinámicas de los productos.
  - `SearchBar` – Input de búsqueda con control del estado.
- # Componentes Adicionales (Tailblocks)
Se agregaron dos componentes nuevos utilizando bloques de Tailblocks para mejorar la interfaz de usuario:
  - `Hero` – Sección principal de bienvenida con un llamado a la acción.
  - `Footer` – Pie de página con enlaces y créditos.

- Aplicamos **estilos responsivos** con clases utilitarias de Tailwind.
- Implementamos **modo oscuro** usando `useRef` para cambiar clases dinámicamente.


## Tecnologías Usadas

- React
- Axios
- Tailwind CSS
