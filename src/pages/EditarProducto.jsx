
// Página de edición de un producto existente.
// Carga los datos actuales, los muestra pre-llenados y
// permite modificar cualquier campo, incluyendo la imagen.

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productosService from '../services/productosService'

export default function EditarProducto() {

  const { id }   = useParams()
  const navigate = useNavigate()

  const refCamara  = useRef(null)
  const refGaleria = useRef(null)

  // ── Campos del formulario ────────────────────────────────
  const [formData, setFormData] = useState({
    nombre:       '',
    descripcion:  '',
    precio:       '',
    stock:        '',
    id_categoria: '',
  })

  // ── Gestión de imagen ────────────────────────────────────
  const [imagenFile,        setImagenFile]        = useState(null)   // archivo nuevo
  const [imagenPreviewBlob, setImagenPreviewBlob] = useState(null)   // blob URL del archivo nuevo
  const [imagenUrlActual,   setImagenUrlActual]   = useState('')     // URL actual guardada en BD

  // La imagen que se muestra: primero el blob nuevo, luego la URL actual, luego nada
  const imagenSrc = imagenPreviewBlob || imagenUrlActual || null

  // ── Categorías y estados de UI ───────────────────────────
  const [categorias,       setCategorias]       = useState([])
  const [cargandoProducto, setCargandoProducto] = useState(true)
  const [error,            setError]            = useState('')
  const [cargando,         setCargando]         = useState(false)
  const [toast,            setToast]            = useState(false)

  // ── Carga producto y categorías al montar ────────────────
  useEffect(() => {
    const cargar = async () => {
      try {
        const [producto, cats] = await Promise.all([
          productosService.obtenerPorId(id),
          productosService.listarCategorias(),
        ])
        setFormData({
          nombre:       producto.nombre       || '',
          descripcion:  producto.descripcion  || '',
          precio:       producto.precio       || '',
          stock:        producto.stock        || '',
          id_categoria: producto.id_categoria || '',
        })
        setImagenUrlActual(producto.imagen_url || '')
        setCategorias(cats)
      } catch (err) {
        setError('No se pudo cargar el producto.')
      } finally {
        setCargandoProducto(false)
      }
    }
    cargar()
  }, [id])

  // ── Limpia el blob URL al desmontar ─────────────────────
  useEffect(() => {
    return () => {
      if (imagenPreviewBlob) URL.revokeObjectURL(imagenPreviewBlob)
    }
  }, [imagenPreviewBlob])

  // ── Cambios en inputs de texto ───────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  // ── Imagen seleccionada desde cámara o galería ───────────
  const handleImagenChange = (e) => {
    const archivo = e.target.files?.[0]
    if (!archivo) return
    if (imagenPreviewBlob) URL.revokeObjectURL(imagenPreviewBlob)
    setImagenFile(archivo)
    setImagenPreviewBlob(URL.createObjectURL(archivo))
    setError('')
    e.target.value = ''
  }

  // ── Quitar imagen (nueva o actual) ───────────────────────
  const quitarImagen = () => {
    if (imagenPreviewBlob) URL.revokeObjectURL(imagenPreviewBlob)
    setImagenFile(null)
    setImagenPreviewBlob(null)
    setImagenUrlActual('')
  }

  // ── Envío del formulario ─────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const token = localStorage.getItem('token')

      const data = new FormData()
      data.append('nombre',       formData.nombre)
      data.append('descripcion',  formData.descripcion)
      data.append('precio',       Number(formData.precio))
      data.append('stock',        Number(formData.stock))
      data.append('id_categoria', Number(formData.id_categoria))

      if (imagenFile) {
        // Se subió una imagen nueva
        data.append('imagen', imagenFile)
      } else {
        // Se mantiene la actual (o vacío si se quitó)
        data.append('imagen_url', imagenUrlActual || '')
      }

      await productosService.actualizar(id, data, token)
      setToast(true)
      setTimeout(() => navigate('/mis-productos'), 2500)

    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el producto.')
    } finally {
      setCargando(false)
    }
  }

  // ── Estado de carga inicial ──────────────────────────────
  if (cargandoProducto) {
    return (
      <div className="detalle-cargando">
        <p>Cargando producto...</p>
      </div>
    )
  }

  return (
    <>
      {/* ── Toast de éxito ──────────────────────────────── */}
      {toast && (
        <div className="toast-exito">
          <span className="toast-icono">✅</span>
          <div className="toast-texto">
            <p className="toast-titulo">¡Cambios guardados!</p>
            <p className="toast-subtitulo">Tu producto fue actualizado correctamente.</p>
          </div>
        </div>
      )}

    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '540px' }}>

        {/* Encabezado */}
        <div className="auth-header">
          <span className="auth-logo">MarketTdea</span>
          <h1 className="auth-titulo">Editar producto</h1>
          <p className="auth-subtitulo">Modifica los datos de tu publicación</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Nombre */}
          <div className="campo-grupo">
            <label className="campo-label">Nombre del producto</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
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
              className="campo-input campo-textarea"
              required
              maxLength={500}
              rows={3}
            />
          </div>

          {/* Precio y Stock */}
          <div className="campo-fila">
            <div className="campo-grupo">
              <label className="campo-label">Precio (COP)</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
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
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* ── Imagen ──────────────────────────────────────── */}
          <div className="campo-grupo">
            <label className="campo-label">
              Imagen del producto{' '}
              <span style={{ color: 'var(--texto-medio)', fontWeight: 400 }}>(opcional)</span>
            </label>

            <div
              className="img-upload-zona"
              onClick={() => !imagenSrc && refGaleria.current.click()}
            >
              {imagenSrc ? (
                <div className="img-upload-preview">
                  <img src={imagenSrc} alt="Vista previa" className="img-upload-preview-img" />
                  <button
                    type="button"
                    className="img-upload-quitar"
                    onClick={(e) => { e.stopPropagation(); quitarImagen() }}
                  >
                    ✕ Quitar
                  </button>
                </div>
              ) : (
                <div className="img-upload-placeholder">
                  <span className="img-upload-icono">🖼️</span>
                  <p className="img-upload-texto">Toca para agregar imagen</p>
                </div>
              )}
            </div>

            {!imagenSrc && (
              <div className="img-upload-botones">
                <button type="button" className="img-upload-btn" onClick={() => refCamara.current.click()}>
                  📷 Tomar foto
                </button>
                <button type="button" className="img-upload-btn" onClick={() => refGaleria.current.click()}>
                  🖼️ Cargar imagen
                </button>
              </div>
            )}

            <input
              ref={refCamara}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImagenChange}
              style={{ display: 'none' }}
            />
            <input
              ref={refGaleria}
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Error */}
          {error && <p className="auth-error">{error}</p>}

          {/* Botones */}
          <div className="campo-fila">
            <button
              type="button"
              className="btn-secundario"
              onClick={() => navigate('/mis-productos')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="auth-btn-primario"
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
  )
}
