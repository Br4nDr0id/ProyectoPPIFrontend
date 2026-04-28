import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Menu() {

  // Obtiene el usuario y cerrarSesion directo del contexto global
  // Cuando el contexto cambia, el menú se actualiza automáticamente
  const { usuario, cerrarSesion } = useAuth()

  return (
    <header className="encabezado">
      <div className="header-container">

        <Link className="logo" to="/">MarketTdea</Link>

        <nav className="menu-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>

          <div className="menu-auth">
            {usuario ? (
              <>
                <span className="menu-usuario">
                   {usuario.nombre} {usuario.apellido}
                </span>
                <button className="menu-btn-cerrar" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </>
            ) : (
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
