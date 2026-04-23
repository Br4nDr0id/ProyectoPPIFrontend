// ============================================================
// Página del catálogo de productos.
// Muestra una grilla de tarjetas con filtros por categoría,
// buscador por nombre/vendedor y ordenamiento.
//
// Por ahora usa datos hardcodeados (productos de ejemplo).
// Cuando el backend esté listo, reemplazar el array
// `productosData` por una llamada axios al endpoint.
// ============================================================

import React, { useState } from 'react'

// ── Datos de ejemplo ──────────────────────────────────────
// Cada objeto representa un producto con todos sus campos.
// Las imágenes usan placeholder.svg para no depender de
// archivos locales. Reemplazar por URLs reales del backend.
const productosData = [
  {
    id: 1,
    nombre: 'Cálculo diferencial — Apuntes completos',
    precio: 15000,
    vendedor: 'Laura Martínez',
    categoria: 'Libros',
    calificacion: 4.8,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Libros',
    descripcion: 'Apuntes detallados del curso de Cálculo I con ejercicios resueltos.',
  },
  {
    id: 2,
    nombre: 'Auriculares Bluetooth Sony',
    precio: 120000,
    vendedor: 'Carlos Ríos',
    categoria: 'Tecnología',
    calificacion: 4.5,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Tecnología',
    descripcion: 'Auriculares inalámbricos en perfecto estado, cargador incluido.',
  },
  {
    id: 3,
    nombre: 'Mochila universitaria negra',
    precio: 55000,
    vendedor: 'Ana Gómez',
    categoria: 'Ropa',
    calificacion: 4.2,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Ropa',
    descripcion: 'Mochila grande con compartimento para portátil de 15 pulgadas.',
  },
  {
    id: 4,
    nombre: 'Tutoría de Estadística',
    precio: 30000,
    vendedor: 'Mateo Torres',
    categoria: 'Servicios',
    calificacion: 5.0,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Servicios',
    descripcion: 'Sesiones de 1 hora para reforzar conceptos de estadística descriptiva.',
  },
  {
    id: 5,
    nombre: 'Acuarelas profesionales Windsor',
    precio: 40000,
    vendedor: 'Valentina Cruz',
    categoria: 'Arte',
    calificacion: 4.7,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Arte',
    descripcion: 'Set de 24 colores, casi sin usar. Ideal para diseño gráfico.',
  },
  {
    id: 6,
    nombre: 'Empanadas caseras (docena)',
    precio: 18000,
    vendedor: 'Sofía Herrera',
    categoria: 'Alimentos',
    calificacion: 4.9,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Alimentos',
    descripcion: 'Empanadas de pipián y carne. Pedido con un día de anticipación.',
  },
  {
    id: 7,
    nombre: 'Calculadora Casio FX-991',
    precio: 65000,
    vendedor: 'David Salazar',
    categoria: 'Tecnología',
    calificacion: 4.6,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Tecnología',
    descripcion: 'Calculadora científica, excelente estado. Incluye estuche.',
  },
  {
    id: 8,
    nombre: 'Diseño de logo para emprendimiento',
    precio: 50000,
    vendedor: 'Isabella Mora',
    categoria: 'Servicios',
    calificacion: 4.4,
    imagen: 'https://placehold.co/300x200/e8f5ed/1a7332?text=Servicios',
    descripcion: 'Diseño de identidad visual: logo en vectores y manual de marca.',
  },
]

// ── Opciones de filtros ───────────────────────────────────
// 'Todas' siempre es la primera opción para mostrar todo.
const categorias = ['Todas', 'Libros', 'Tecnología', 'Servicios', 'Ropa', 'Alimentos', 'Arte']

const ordenOpciones = ['Más recientes', 'Menor precio', 'Mayor precio', 'Mejor calificación']

// ── Componente auxiliar: Estrellas ────────────────────────
// Recibe un número (ej: 4.5) y pinta estrellas llenas,
// media estrella o vacías usando caracteres Unicode.
// Se separa en su propio componente para reutilizarlo.
function Estrellas({ valor }) {
  // Generamos un array de 5 posiciones y decidimos qué estrella poner
  return (
    <span className="prod-estrellas" aria-label={`Calificación: ${valor} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(valor)) return <span key={i}>★</span>      // Llena
        if (i === Math.ceil(valor) && valor % 1 >= 0.5) return <span key={i}>★</span> // Media (simplificada)
        return <span key={i} className="estrella-vacia">★</span>        // Vacía
      })}
      <span className="prod-calificacion-num">({valor})</span>
    </span>
  )
}

// ── Componente auxiliar: Tarjeta de producto ──────────────
// Recibe un objeto `producto` y renderiza la tarjeta completa.
// Se separa para mantener el componente principal más limpio.
function TarjetaProducto({ producto }) {
  // Formatea el precio como moneda colombiana (COP)
  const precioFormateado = producto.precio.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  })

  return (
    <article className="prod-tarjeta">

      {/* Imagen del producto */}
      <div className="prod-imagen-wrapper">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="prod-imagen"
          // Si la imagen falla, mostramos un color de fondo
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {/* Badge de categoría sobre la imagen */}
        <span className="prod-badge-categoria">{producto.categoria}</span>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="prod-cuerpo">

        {/* Nombre del producto */}
        <h3 className="prod-nombre">{producto.nombre}</h3>

        {/* Calificación con estrellas */}
        <Estrellas valor={producto.calificacion} />

        {/* Vendedor */}
        <p className="prod-vendedor">👤 {producto.vendedor}</p>

        {/* Precio */}
        <p className="prod-precio">{precioFormateado}</p>

      </div>
    </article>
  )
}


// ── Componente principal: Productos ───────────────────────
export default function Productos() {

  // ── Estado: texto del buscador ────────────────────────
  const [busqueda, setBusqueda] = useState('')

  // ── Estado: categoría activa en los filtros ───────────
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')

  // ── Estado: criterio de ordenamiento seleccionado ─────
  const [orden, setOrden] = useState('Más recientes')

  // ── Lógica de filtrado y ordenamiento ─────────────────
  // Se ejecuta cada vez que cambia búsqueda, categoría u orden.
  // No modifica el array original, crea uno nuevo filtrado.
  const productosFiltrados = productosData
    // 1. Filtrar por categoría (si es 'Todas', no filtra)
    .filter(p =>
      categoriaActiva === 'Todas' || p.categoria === categoriaActiva
    )
    // 2. Filtrar por texto: busca en nombre Y en vendedor
    .filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.vendedor.toLowerCase().includes(busqueda.toLowerCase())
    )
    // 3. Ordenar según la opción seleccionada
    .sort((a, b) => {
      if (orden === 'Menor precio')       return a.precio - b.precio
      if (orden === 'Mayor precio')       return b.precio - a.precio
      if (orden === 'Mejor calificación') return b.calificacion - a.calificacion
      return a.id - b.id // 'Más recientes': orden por ID (el más alto es el más nuevo)
    })

  return (
    <main className="prod-pagina">

      {/* ── Encabezado de la sección ─────────────────── */}
      <section className="prod-encabezado">
        <div className="prod-encabezado-container">
          <h1 className="prod-titulo-pagina">Productos</h1>
          <p className="prod-subtitulo-pagina">
            Encuentra lo que necesitas en la comunidad TdeA
          </p>

          {/* Buscador general */}
          <input
            type="text"
            placeholder="Buscar por nombre o vendedor..."
            value={busqueda}
            // Cada tecla que el usuario presiona actualiza el estado
            onChange={(e) => setBusqueda(e.target.value)}
            className="prod-buscador"
          />
        </div>
      </section>

      {/* ── Área principal: filtros + grilla ─────────── */}
      <div className="prod-contenido">

        {/* ── Barra lateral: filtros de categoría ────── */}
        <aside className="prod-sidebar">
          <h2 className="prod-sidebar-titulo">Categorías</h2>
          <ul className="prod-categorias-lista">
            {categorias.map((cat) => (
              <li key={cat}>
                <button
                  // Si esta categoría está activa, agrega clase extra para resaltarla
                  className={`prod-categoria-btn ${categoriaActiva === cat ? 'activa' : ''}`}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Área de resultados ───────────────────────── */}
        <section className="prod-resultados">

          {/* Barra superior: conteo + selector de orden */}
          <div className="prod-barra-superior">
            <span className="prod-conteo">
              {/* Muestra cuántos productos coinciden con el filtro */}
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
            </span>

            {/* Select de ordenamiento */}
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="prod-orden-select"
            >
              {ordenOpciones.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>

          {/* ── Grilla de tarjetas ──────────────────────
              Si no hay resultados, muestra mensaje vacío.
              Si hay, renderiza una TarjetaProducto por cada uno. */}
          {productosFiltrados.length === 0 ? (
            <div className="prod-vacio">
              <p>No se encontraron productos con esos filtros.</p>
              <button
                className="btn-primario"
                // Resetea todos los filtros al hacer clic
                onClick={() => { setBusqueda(''); setCategoriaActiva('Todas') }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="prod-grilla">
              {productosFiltrados.map((producto) => (
                // key único requerido por React para listas
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          )}

        </section>
      </div>
    </main>
  )
}