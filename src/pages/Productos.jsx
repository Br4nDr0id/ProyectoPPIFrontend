
// Página del catálogo de productos.
// Muestra una grilla de tarjetas con filtros por categoría,
// buscador por nombre/vendedor y ordenamiento.


import React, { useState, useEffect } from 'react'
import productosService from '../services/productosService' 
import { useNavigate } from 'react-router-dom'



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
  const navigate = useNavigate()
  // Formatea el precio como moneda colombiana (COP)
  const precioFormateado = producto.precio.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  })

  return (
    <article className="prod-tarjeta"
      onClick={() => navigate(`/productos/${producto.id_producto}`)}
      style={{ cursor: 'pointer' }}>


      {/* Imagen del producto */}
      <div className="prod-imagen-wrapper">
        <img
          src={producto.imagen_url}
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
        <p className="prod-vendedor">{producto.vendedor}</p>

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

  const[productos, setProductos] = useState([])

  const[cargando, setCargando] = useState(true)

  const[error, setError] = useState('')

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await productosService.listar()
        setProductos(data)
      } catch (err) {
        setError('No se pudieron cargar los productos.')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  // ── Lógica de filtrado y ordenamiento ─────────────────
  // Se ejecuta cada vez que cambia búsqueda, categoría u orden.
  // No modifica el array original, crea uno nuevo filtrado.
  const productosFiltrados = productos
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
      return a.id_producto- b.id_producto // 'Más recientes': orden por ID (el más alto es el más nuevo)
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

           {/* Estado de carga */}
          {cargando && (
            <div className="prod-vacio">
              <p>Cargando productos...</p>
            </div>
            )}

          {/* Estado de error */}
          {error && (
            <div className="prod-vacio">
              <p> {error}</p>
            </div>
          )}

          {/* Grilla normal cuando ya cargó */}
          {!cargando && !error && (
            productosFiltrados.length === 0 ? (
          <div className="prod-vacio">
            <p> No se encontraron productos.</p>
              <button
                className="btn-primario"
                  onClick={() => { setBusqueda(''); setCategoriaActiva('Todas') }}
                >
                Limpiar filtros
              </button>
          </div>
          ) : (
          <div className="prod-grilla">
            {productosFiltrados.map((producto) => (
            <TarjetaProducto key={producto.id_producto} producto={producto} />
            ))}
          </div>
          )
        )}

        </section>
      </div>
    </main>
  )
}