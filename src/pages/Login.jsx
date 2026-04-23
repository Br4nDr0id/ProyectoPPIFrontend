import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  // --- Estado local del formulario--
  // UseState lo  que hace es guardar el valor actual de cada campop.
  // Cada vez que un usuario escriba, actualiza el estado.
  const[formData, setFormData] = useState({
    email: '', //correo del usuario (institucional)
    password: '', //contraseña del usuario
  })

  //---- Manejo de cambios en los inputs----
  // Esta funcion se ejecuta cada vez que el usuario escribe
  // en cualqier campo del formulario.
  // usa "computed property names" para actualizar
  // dinamicamente el campo correcto sisn repetir codigo.
  const handleChange = (e) => {
    const{name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  } // por documentar

  //---- Manejo del envio del formulario ----
  // Por ahoa solo previene el comportamiento por defecto
  //del navegador (se recarga la pagina) y muestra los datos
  // en consola. en el futuro, aqui se haria la backend.
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos de login:', formData)

  }
  return (
    // contenedor de pagina centrado verticalmene
    <div className="auth-page">

      {/* tarjeta del formulario */}
      <div className="auth-card">

         {/*Encabezado: logo y titulo */}
         <div className="auth-header">
          <span className="auth-logo">MarketTdea</span>
          <h1 className="auth-titulo">Bienvenido de nuevo</h1>
          <p className="auth-subtitulo">Inicia sesión con tu cuenta institucional</p>
         </div>

         {/* Formulario de login */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Campo de email */}
            <div className="campo-grupo">
              <label htmlFor="email" className="campo-label">
                Correo Institucional
              </label>
              <input
                id="email"
                type="email" //validamos formato de  email automaticamente
                name="email" // debe coincidir con la clave en formData
                value={formData.email} //controlado por estado de react
                onChange={handleChange} //actualiza estado al escribir
                placeholder="tucorreo@tdea.edu.co"
                required //campo obligatorio osea que impide enviar si esta vacio
                autoComplete="email" // ayuda al navegador a autocompletar
               />
            </div>

            {/* Campo de contraseña */}
            <div className="campo-grupo">
              <div className="campo-label-row">
                <label htmlFor="password" className="campo-label">
                  Contraseña
                </label>  
                {/* Enlace de recuperación (sin funcionalidad aún) */}
                <span className="campo-link"> ¿Olvidaste tu contraseña?</span>
              </div>
              <input
                id="password"
                type="password" //oculta el texto ingresado
                name="password" 
                value={formData.password} //controlado por estado de react
                onChange={handleChange} //actualiza estado al escribir
                placeholder="°°°°°°°°"
                className="campo-input"
                required
                autoComplete="current-password" // ayuda al navegador a autocompletar
               />
              </div>
               {/* Botón de envío */}
              <button type="submit" className="auth-btn-primario">
                Iniciar Sesión
              </button>

             </form>

              {/* Pie de página con enlace a registro */}
               <p className="auth-footer-texto">
                ¿No tienes una cuenta?{' '}
                {/* Link de react-router-dom: no recarga la página */}
                <Link to="/registro" className="auth-link">
                  Regístrate aquí
                </Link>
              </p>


            </div>
        </div>
  )
}
