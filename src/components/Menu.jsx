import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <header className="encabezado">
      <div className="header-container">
        {/*Logo: al hacer clic lleva al inicio de la pagina */}
        <Link className="logo" to="/">MarketTdea</Link>
        {/* Navegacion principal*/ }
        <nav className="menu-navegacion">
          {/* Enlace a la página de inicio */}
          <Link to="/">Inicio</Link>

          {/* Enlace al catálogo de productos */}
          <Link to="/productos">Productos</Link>

          {/* Sección de autenticación 
              Se usa un div para agrupar los dos botones de auth. */}
          <div className="menu-auth">

            {/* Enlace a la página de login */}
            <Link to="/login" className="menu-link-login">
            Iniciar Sesión
            </Link> 

            {/* Botón de registro  */}
            <Link to="/registro">
            Registrarse
            </Link>

            </div>
          
        </nav>
      </div>
    </header>
  )
}
