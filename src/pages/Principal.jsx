// src/pages/Principal.jsx
import React from 'react';

export default function Principal() {
  return (
    <div className="site-wrapper">
      {/* Encabezado del sitio */}
<header className="encabezado">
<div className="header-container">
<a className="logo" href="/">MarketTdea</a>
<nav className="menu-navegacion">
<a href="/">Inicio</a>
<a href="/productos">Productos</a>
</nav>
</div>
</header>
 
      {/* Sección principal del sitio */}
<main>
<section className="descripcion">
<div className="descripcion-container">
<div className="descripcion-texto">
<h1>Bienvenido a MarketTdea</h1>
<h2>
                El mercado oficial de la comunidad del TdeA
</h2>
              {/* Botón de acción (opcional para mejorar el diseño) */}
<button className="btn-primario">Ver Catálogo</button>
</div>
            {/* Imagen del Hero */}
<div className="descripcion-imagen" aria-hidden="true">
                {/* Puedes poner una <img> aquí o manejarla por CSS con background-image */}
</div>
</div>
</section>
</main>
 
      {/* Pie de página */}
<footer className="footer-principal">
<p>Contacto MarketTdea: MarketTdeA@gmail.com - Tel: 123-456-7890</p>
</footer>
</div>
  );
}
