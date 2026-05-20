import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Menu() {

  const { usuario, cerrarSesion } = useAuth()
  const [abierto, setAbierto]     = useState(false)
  const wrapperRef                = useRef(null)

  // Cierra el dropdown al hacer clic fuera de él
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setAbierto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleCerrarSesion = () => {
    setAbierto(false)
    cerrarSesion()
  }

  return (
    <header className="encabezado">
      <div className="header-container">

        <Link className="logo" to="/">MarketTdea</Link>

        <nav className="menu-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>

          <div className="menu-auth">
            {usuario ? (
              // ── Usuario logueado: botón con dropdown ─────────
              <div className="menu-usuario-wrapper" ref={wrapperRef}>
                <button
                  className="menu-usuario-btn"
                  onClick={() => setAbierto(prev => !prev)}
                  aria-expanded={abierto}
                >
                  {/* Avatar con la inicial del nombre */}
                  <span className="menu-avatar">
                    {usuario.nombre?.charAt(0).toUpperCase()}
                  </span>
                  <span className="menu-avatar-nombre">{usuario.nombre}</span>
                  <span className="menu-chevron">{abierto ? '▲' : '▼'}</span>
                </button>

                {/* Dropdown */}
                {abierto && (
                  <div className="menu-dropdown">

                    {/* Encabezado del dropdown */}
                    <div className="menu-dropdown-header">
                      <p className="menu-dropdown-saludo">Bienvenido/a</p>
                      <p className="menu-dropdown-nombre">
                        {usuario.nombre} {usuario.apellido}
                      </p>
                    </div>

                    {/* Mis productos */}
                    <Link
                      to="/mis-productos"
                      className="menu-dropdown-item"
                      onClick={() => setAbierto(false)}
                    >
                      <span className="menu-dropdown-icono"></span>
                      <div>
                        <p className="menu-dropdown-item-titulo">Mis productos</p>
                        <p className="menu-dropdown-item-desc">Gestiona tus publicaciones</p>
                      </div>
                    </Link>

                    {/* Publicar */}
                    <Link
                      to="/publicar"
                      className="menu-dropdown-item"
                      onClick={() => setAbierto(false)}
                    >
                      <span className="menu-dropdown-icono"></span>
                      <div>
                        <p className="menu-dropdown-item-titulo">Publicar producto</p>
                        <p className="menu-dropdown-item-desc">Añade una nueva publicación</p>
                      </div>
                    </Link>

                    {/* Cerrar sesión */}
                    <button
                      className="menu-dropdown-item menu-dropdown-item-cerrar"
                      onClick={handleCerrarSesion}
                    >
                      <span className="menu-dropdown-icono"></span>
                      <div>
                        <p className="menu-dropdown-item-titulo">Cerrar sesión</p>
                      </div>
                    </button>

                  </div>
                )}
              </div>
            ) : (
              // ── Sin sesión: enlaces de acceso ────────────────
              <>
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/registro">Registrarse</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
