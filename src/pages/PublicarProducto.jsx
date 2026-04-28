
//
// Formulario para publicar un nuevo producto.
// Solo accesible si el usuario está logueado (RutaProtegida).
// Al enviar, crea el producto en la BD y redirige al catálogo.


import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import productosService from '../services/productosService'

export default function PublicarProducto() {

  const { usuario } = useAuth()
  const navigate = useNavigate()

  // ── Estado del formulario ────────────────────────────────
  const [formData, setFormData] = useState({
    nombre:       '',
    descripcion:  '',
    precio:       '',
    stock:        '',
    id_categoria: '',
    imagen_url:   '',   // opcional
  })

  // ── Estado de categorías cargadas del backend ────────────
  const [categorias, setCategorias] = useState([])

  // ── Estados de UI ────────────────────────────────────────
  const [error, setError]       = useState('')
  const [cargando, setCargando] = useState(false)
  const [exito, setExito]       = useState(false)

  // ── Carga las categorías al montar el componente ─────────
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await productosService.listarCategorias()
        setCategorias(data)
      } catch (err) {
        setError('No se pudieron cargar las categorías.')
      }
    }
    cargarCategorias()
  }, [])

  // ── Manejo de cambios en los inputs ─────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  // ── Envío del formulario ─────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    console.log('Token:', localStorage.getItem('token'))  
    console.log('Datos a enviar:', formData) 

    try {
      // Obtiene el token guardado en localStorage
      const token = localStorage.getItem('token')

      await productosService.crear({
        nombre:       formData.nombre,
        descripcion:  formData.descripcion,
        precio:       Number(formData.precio),    // convierte a número
        stock:        Number(formData.stock),     // convierte a número
        id_categoria: Number(formData.id_categoria),
        imagen_url:   formData.imagen_url || null, // null si está vacío
      }, token)

      setExito(true)
      // Redirige al catálogo después de 2 segundos
      setTimeout(() => navigate('/productos'), 2000)

    } catch (err) {
      setError(err.response?.data?.message || 'Error al publicar el producto.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '540px' }}>

        {/* Encabezado */}
        <div className="auth-header">
          <span className="auth-logo">MarketTdea</span>
          <h1 className="auth-titulo">Publicar producto</h1>
          <p className="auth-subtitulo">
            Hola {usuario?.nombre}, completa los datos de tu producto
          </p>
        </div>

        {/* Mensaje de éxito */}
        {exito && (
          <div className="auth-exito">
             Producto publicado exitosamente. Redirigiendo...
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Nombre */}
          <div className="campo-grupo">
            <label className="campo-label">Nombre del producto</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Cálculo Diferencial - Stewart"
              className="campo-input"
              required
              maxLength={200}
            />
          </div>

          {/* Descripción */}
          <div className="campo-grupo">
            <label className="campo-label">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe tu producto: estado, características, etc."
              className="campo-input campo-textarea"
              required
              maxLength={500}
              rows={3}
            />
          </div>

          {/* Precio y Stock en la misma fila */}
          <div className="campo-fila">
            <div className="campo-grupo">
              <label className="campo-label">Precio (COP)</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Ej: 25000"
                className="campo-input"
                required
                min={0}
              />
            </div>
            <div className="campo-grupo">
              <label className="campo-label">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Ej: 1"
                className="campo-input"
                required
                min={1}
              />
            </div>
          </div>

          {/* Categoría */}
          <div className="campo-grupo">
            <label className="campo-label">Categoría</label>
            <select
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleChange}
              className="campo-input campo-select"
              required
            >
              <option value="">Selecciona una categoría</option>
              {/* Renderiza las categorías cargadas del backend */}
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* URL de imagen (opcional) */}
          <div className="campo-grupo">
            <label className="campo-label">
              URL de imagen <span style={{ color: 'var(--texto-medio)', fontWeight: 400 }}>(opcional)</span>
            </label>
            <input
              type="url"
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="campo-input"
            />
          </div>

          {/* Error */}
          {error && <p className="auth-error">{error}</p>}

          {/* Botones */}
          <div className="campo-fila">
            <button
              type="button"
              className="btn-secundario"
              onClick={() => navigate('/productos')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="auth-btn-primario"
              disabled={cargando}
            >
              {cargando ? 'Publicando...' : 'Publicar producto'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}