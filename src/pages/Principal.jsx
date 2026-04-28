// src/pages/Principal.jsx
import React from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Principal() {
  const {usuario} = useAuth()
  const navigate = useNavigate()
  const categorias = [
    {nombre: 'Libros y apuntes',descripcion:'Materiales de estudio'},
    {nombre: 'Tecnología',descripcion:'Equipos y accesorios'},
    {nombre: 'Arte y Diseño',descripcion:'Materiales creativos'},
    {nombre: 'Ropa y accesorios',descripcion:'Moda y estilo para todos'},
    {nombre: 'Alimentos',descripcion:'Comida casera y snacks'},
    {nombre: 'Servicios',descripcion:'Tutorías y más'},
  ]
  return (
    <main>
      
      <section className="hero">
        <div className="hero-container">
          <div className="hero-texto">
            <span className="hero-badge">Comunidad TdeA</span>
            <h1>Bienvenido a MarketTdea</h1>
            <p>
              El mercado oficial de la comunidad del Tdea. Compra, vende e
              intercambia productos y servicios con tus compañeros de manera
              segura y facil.
            </p>
            <div className="hero-botones">
              {/* Enlace al catálogo de productos */ }
              <Link to="/productos" className="btn-primario">Ver productos</Link>
              <button className="btn-secundario"onClick={() => usuario ? navigate('/publicar'): navigate('/login')}>
                Publicar producto
                </button>
            </div>
          </div>
          <div className="hero-imagen" aria-hidden = "true">
          </div>
        </div>
      </section>

      {/*Categorias*/}
      <section className="categorias">
        <div className="categorias-container">
          <h2 className="seccion-titulo">Explorar categorias</h2>
          <p className="seccion-subtitulo">Encuentra lo que necesitas entre nuestras categorias</p>
          <div className="categorias-grid">
            {categorias.map((cat) =>(
              <a key={cat.nombre} href='/productos' className="categoria-card">
                <h3>{cat.nombre}</h3>
                <p>{cat.descripcion}</p>
              </a>
            ))
            }
          </div>

        </div>

      </section>



      {/*footer*/}
      <footer>
        <div className="footer-container">
          <div className="footer-marca">
            <p>MarketTdea</p>
            <p>El mercado de la comunidad TdeA</p>
          </div>
          <div className="footer-contacto">
            <p>Contacto</p>
            <p>MarketTdeA@gmail.com</p>
            <p>Tel: 123-456-7890</p>
          </div>
        </div>
        <hr className="footer-divider"/>
        <p className="footer-copy">© 2025 MarketTdea — Tecnológico de Antioquia</p>
      </footer>
    </main>
  )
}