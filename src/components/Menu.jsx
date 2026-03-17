import React from 'react'
import {Link} from 'react-router-dom'

export default function Menu() {
  return (
    <>
    <header>
        <img src="/banner.jpg" alt="Banner" />
    </header>
    <Link to="/">Principal</Link>
    <Link to="/docentes">Docentes</Link>
    <Link to="/estudiantes">Estudiantes</Link>
    
    </>
    
  )
}
