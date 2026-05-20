
// Página "Mis productos".
// Muestra los productos publicados por el usuario logueado,
// con opciones para editar o eliminar cada uno.

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import productosService from '../services/productosService'

export default function MisProductos() {

  const { usuario } = useAuth()
  const navigate    = useNavigate()

  const [productos,  setProductos]  = useState([])
  const [cargando,   setCargando]   = useState(true)
  const [error,      setError]      = useState('')
  const [eliminando, setEliminando] = useState(null)

  // ── Modal de confirmación ────────────────────────────────
  const [modal, setModal] = useState({ abierto: false, id: null, nombre: '' })

  const abrirModal  = (id, nombre) => setModal({ abierto: true, id, nombre })
  const cerrarModal = ()           => setModal({ abierto: false, id: null, nombre: '' })

  // ── Carga los productos del vendedor ─────────────────────
  const cargar = async () => {
    try {
      const token = localStorage.getItem('token')
      const data  = await productosService.listarMisProductos(token)
      setProductos(data)
    } catch (err) {
      setError('No se pudieron cargar tus productos.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargar() }, [])

  // ── Eliminar producto (se llama tras confirmar en el modal) ─
  const handleEliminar = async () => {
    const { id } = modal
    cerrarModal()
    setEliminando(id)
    try {
      const token = localStorage.getItem('token')
      await productosService.eliminar(id, token)
      setProductos(prev => prev.filter(p => p.id_producto !== id))
    } catch (err) {
      setError('No se pudo eliminar el producto. Intenta de nuevo.')
    } finally {
      setEliminando(null)
    }
  }

  const formatearPrecio = (precio) =>
    Number(precio).toLocaleString('es-CO', {
      style: 'currency', currency: 'COP', minimumFractionDigits: 0,
    })

  return (
    <main className="prod-pagina">

      {/* ── Modal de confirmación de eliminación ─────────── */}
      {modal.abierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-titulo">¿Eliminar producto?</h2>
            <p className="modal-mensaje">
              Estás a punto de eliminar <strong>"{modal.nombre}"</strong>.
              <br />Esta acción no se puede deshacer.
            </p>
            <div className="modal-botones">
              <button className="modal-btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              <button
                className="modal-btn-eliminar"
                onClick={handleEliminar}
                disabled={eliminando === modal.id}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Encabezado verde ─────────────────────────────── */}
      <section className="prod-encabezado">
        <div className="prod-encabezado-container">
          <h1 className="prod-titulo-pagina">Mis productos</h1>
          <p className="prod-subtitulo-pagina">
            Hola {usuario?.nombre}, aquí están tus publicaciones
          </p>
          <button
            className="mis-prod-btn-publicar"
            onClick={() => navigate('/publicar')}
          >
            + Publicar nuevo producto
          </button>
        </div>
      </section>

      {/* ── Contenido ────────────────────────────────────── */}
      <div className="mis-prod-contenido">

        {cargando && (
          <div className="prod-vacio"><p>Cargando tus productos...</p></div>
        )}

        {error && (
          <p className="auth-error" style={{ maxWidth: '500px', margin: '0 auto' }}>
            {error}
          </p>
        )}

        {!cargando && !error && productos.length === 0 && (
          <div className="prod-vacio">
            <p>Aún no has publicado ningún producto.</p>
            <button className="btn-primario" onClick={() => navigate('/publicar')}>
              Publicar mi primer producto
            </button>
          </div>
        )}

        {!cargando && !error && productos.length > 0 && (
          <>
            <p className="prod-conteo" style={{ marginBottom: '20px' }}>
              {productos.length} producto{productos.length !== 1 ? 's' : ''} publicado{productos.length !== 1 ? 's' : ''}
            </p>

            <div className="mis-prod-grilla">
              {productos.map((producto) => (
                <div key={producto.id_producto} className="mis-prod-tarjeta">

                  <div className="prod-imagen-wrapper">
                    {producto.imagen_url ? (
                      <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="prod-imagen"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    ) : (
                      <div className="detalle-imagen-placeholder">
                        <span>{producto.categoria}</span>
                      </div>
                    )}
                    <span className="prod-badge-categoria">{producto.categoria}</span>
                  </div>

                  <div className="mis-prod-cuerpo">
                    <h3 className="prod-nombre">{producto.nombre}</h3>
                    <p className="mis-prod-precio">{formatearPrecio(producto.precio)}</p>
                    <p className="mis-prod-stock">Stock: {producto.stock} unidades</p>
                  </div>

                  <div className="mis-prod-acciones">
                    <button
                      className="mis-prod-btn-editar"
                      onClick={() => navigate(`/editar/${producto.id_producto}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="mis-prod-btn-eliminar"
                      onClick={() => abrirModal(producto.id_producto, producto.nombre)}
                      disabled={eliminando === producto.id_producto}
                    >
                      {eliminando === producto.id_producto ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  )
}
