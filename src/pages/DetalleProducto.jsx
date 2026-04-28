
// Página de detalle de un producto específico.
// Lee el ID de la URL, consulta el backend y muestra
// toda la información del producto.

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productosService from '../services/productosService'

export default function DetalleProducto() {
    console.log('Renderizando DetalleProducto')

  // ── useParams: lee el :id de la URL (/productos/1) ──────
  const { id } = useParams()
  const navigate = useNavigate()

  // ── Estados ──────────────────────────────────────────────
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // ── Carga el producto al montar el componente ────────────
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await productosService.obtenerPorId(id)
        setProducto(data)
      } catch (err) {
        setError('No se pudo cargar el producto.')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  // ── Formatea el precio como moneda colombiana ────────────
  const formatearPrecio = (precio) => {
    return Number(precio).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    })
  }

  // ── Formatea la fecha de publicación ────────────────────
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // ── Estado de carga ──────────────────────────────────────
  if (cargando) return (
    <div className="detalle-cargando">
      <p>Cargando producto...</p>
    </div>
  )

  // ── Estado de error ──────────────────────────────────────
  if (error) return (
    <div className="detalle-cargando">
      <p> {error}</p>
      <button className="btn-primario" onClick={() => navigate('/productos')}>
        Volver a productos
      </button>
    </div>
  )

  return (
    <div className="detalle-page">
      <div className="detalle-container">

        {/* ── Botón volver ─────────────────────────────── */}
        <button className="detalle-volver" onClick={() => navigate('/productos')}>
          ← Volver a productos
        </button>

        <div className="detalle-card">

          {/* ── Imagen del producto ───────────────────── */}
          <div className="detalle-imagen-wrapper">
            {producto.imagen_url ? (
              <img src={producto.imagen_url} alt={producto.nombre} className="detalle-imagen" />
            ) : (
              // Si no hay imagen, mostramos un placeholder con la categoría
              <div className="detalle-imagen-placeholder">
                <span>{producto.categoria}</span>
              </div>
            )}
            {/* Badge de categoría */}
            <span className="detalle-badge">{producto.categoria}</span>
          </div>

          {/* ── Información del producto ──────────────── */}
          <div className="detalle-info">

            {/* Nombre */}
            <h1 className="detalle-nombre">{producto.nombre}</h1>

            {/* Precio */}
            <p className="detalle-precio">{formatearPrecio(producto.precio)}</p>

            {/* Descripción */}
            <div className="detalle-seccion">
              <h2 className="detalle-seccion-titulo">Descripción</h2>
              <p className="detalle-descripcion">{producto.descripcion}</p>
            </div>

            {/* Especificaciones */}
            <div className="detalle-seccion">
              <h2 className="detalle-seccion-titulo">Especificaciones</h2>
              <div className="detalle-specs">
                <div className="detalle-spec-item">
                  <span className="spec-label">Estado</span>
                  <span className="spec-valor">{producto.estado}</span>
                </div>
                <div className="detalle-spec-item">
                  <span className="spec-label">Stock disponible</span>
                  <span className="spec-valor">{producto.stock} unidades</span>
                </div>
                <div className="detalle-spec-item">
                  <span className="spec-label">Publicado el</span>
                  <span className="spec-valor">{formatearFecha(producto.fecha_publicacion)}</span>
                </div>
                <div className="detalle-spec-item">
                  <span className="spec-label">Categoría</span>
                  <span className="spec-valor">{producto.categoria}</span>
                </div>
              </div>
            </div>

            {/* Información del vendedor */}
            <div className="detalle-seccion detalle-vendedor-card">
              <h2 className="detalle-seccion-titulo">Información del vendedor</h2>
              <p className="detalle-vendedor-nombre">{producto.vendedor}</p>
              <div className="detalle-specs">
                <div className="detalle-spec-item">
                  <span className="spec-label"> Correo</span>
                  <span className="spec-valor">{producto.correo_vendedor}</span>
                </div>
                {producto.telefono_vendedor && (
                  <div className="detalle-spec-item">
                    <span className="spec-label"> Teléfono</span>
                    <span className="spec-valor">{producto.telefono_vendedor}</span>
                  </div>
                )}
              </div>

              {/* Botón de contactar */}
              {producto.telefono_vendedor ? (
                <a
                href={`https://wa.me/${producto.telefono_vendedor}?text=Hola%20${encodeURIComponent(producto.vendedor)},%20estoy%20interesado%20en%20tu%20producto%20${encodeURIComponent(producto.nombre)}.%20publicado%20en%20MarketTdea.%20%C2%BFSigue%20disponible?`}
                target="_blank"
                rel="noopener noreferrer"
                className= "detalle-btn-contactar"
                >
                    Contactar por WhatsApp
                </a>
                ) : (
                    <a
                    href={`mailto:${producto.correo_vendedor}`}
                    className="detalle-btn-contactar"
                    >
                    Contactar por correo
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}