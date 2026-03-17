import React from 'react'
import {Link} from 'react-router-dom'

export default function Menu() {
  return (
    <>
    <Link to="/">Principal</Link>
    <Link to="/productos">Productos</Link>
    <Link to="/login">Iniciar Sesión</Link>
    
    </>
    
  )
}
