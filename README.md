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
  
- ## Componentes Adicionales (Tailblocks)
Se agregaron dos componentes nuevos utilizando bloques de Tailblocks para mejorar la interfaz de usuario:
  - `Hero` – Sección principal de bienvenida con un llamado a la acción.
  - `Footer` – Pie de página con enlaces y créditos.

- Aplicamos **estilos responsivos** con clases utilitarias de Tailwind.
- Implementamos **modo oscuro** usando `useRef` para cambiar clases dinámicamente.


## 🗓️ Semana 3 – Filtrado Avanzado y Ordenamiento  

### Objetivo  
- Implementación de **filtros dinámicos** por categoría de los productos.  
- Agregue **ordenamiento** por precio y rating (ascendente/descendente).  
- Usamos  **selects** para que el usuario elija filtros y órdenes.  
- Combine todo con la **búsqueda existente** dentro de `SearchBar.jsx`.  

### Tareas realizadas  
- **Integración de `SearchBar.jsx`** para manejar la búsqueda, filtro por categoría y ordenamiento.  
- **Obtención dinámica de categorías** desde la API: [DummyJSON Categories](https://dummyjson.com/products/categories).  
- **Filtrado de productos** por categoría seleccionada en el select.  
- **Ordenamiento de productos** por precio y rating en modo ascendente y descendente (`sort()`).  
- Aplique mejoras en la interfaz:  
  - Oculte flechas dobles en `select` usando `appearance-none`.  
  - Mejore la apariencia y estructura de los filtros con `Tailwind CSS`.  

## 🗓️ Semana 4 – Estadísticas Detalladas  

### **Objetivo**  

Aplicar procesamiento de datos y estadística básica utilizando funciones de orden superior y condicionales.

**Tareas Realizadas**  
Se desarrollaron funciones para mostrar estadísticas detalladas sobre los productos obtenidos desde la API:

-  Precio promedio general.
-  Precio máximo y mínimo general.
-  Cantidad de productos por categoría.
-  Cantidad de productos con:
  - Stock mayor a 50.
  - Rating mayor a 4.5.
  - Otros criterios combinados.
-  Precio promedio por categoría.
-  Producto más caro y más barato por categoría.
-  Promedio de rating general y por categoría.

Estas estadísticas se muestran dinámicamente y se actualizan al aplicar filtros de búsqueda, categoría y ordenamiento.

- Uso de métodos de alto orden como `map()`, `reduce()`, `filter()`.

Las estadísticas se presentan dentro del componente `StatsPanel`, con diseño claro y accesible, respetando el modo oscuro y los estilos generales definidos con Tailwind CSS

## 🗓️ **Semana 5 – Visualizaciones**

### Objetivo
Incluir visualización de datos mediante gráficos simples para facilitar la interpretación de la información procesada.

### Tareas Realizadas
Se integró la librería [Recharts](https://recharts.org/) para representar visualmente diferentes aspectos de los productos obtenidos desde la API.

Los gráficos implementados son:

- **Gráfico de Barras**: muestra la **cantidad de productos por categoría**.  
  Se utiliza para visualizar de forma clara cuántos productos pertenecen a cada categoría filtrada.

- **Gráfico de Líneas**: simula la **evolución de precios a lo largo del tiempo**.  
  Se generaron valores ficticios por producto para representar una variación de precios estimada.

- **Gráfico de Torta (Pie Chart)**: indica la **proporción de productos según el nivel de stock**.  
  Se agrupan los productos por rangos de stock (bajo, medio, alto) y se representa su proporción relativa.


## 🗓️ Semana 6 – Exportación y Experiencia de Usuario  

### **Objetivo**  

Añadir funciones de exportación y mejorar la experiencia del usuario mediante optimizaciones en la usabilidad.

### **Tareas Realizadas**  

Se implementaron nuevas características enfocadas en mejorar la interacción y la exportación de datos:

- **Exportación de productos filtrados** a los formatos JSON y CSV utilizando `Blob` y `URL.createObjectURL()`, eliminando dependencias externas.
- **Implementación de paginación** mediante parámetros `limit` y `skip` en la API, garantizando una carga eficiente de datos.
- **Optimización en la interfaz de paginación**, deshabilitando el botón de "Página siguiente" cuando no hay más productos disponibles.
- **Mensajes de éxito** tras cada exportación, brindando retroalimentación clara al usuario.
- **Mejoras en la jerarquía visual**, asegurando una presentación clara y organizada de los productos y estadísticas.
- **Optimización en tiempo de carga**, reduciendo el volumen de datos solicitados y manteniendo un flujo eficiente.



## Tecnologías Usadas

- React
- Axios
- Tailwind CSS
