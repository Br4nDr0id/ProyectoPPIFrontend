import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <header className="encabezado">
      <div className="header-container">
        <Link className="logo" to="/">MarketTdea</Link>
        <nav className="menu-navegacion">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/estudiantes">Estudiantes</Link>
        </nav>
      </div>
    </header>
  )
}
