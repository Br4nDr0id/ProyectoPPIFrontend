import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // para acceder al contexto de autenticación


export default function Login() {

  const {usuario, login} = useAuth() // obtenemos el contexto de autenticación

  if (usuario) return <Navigate to="/" replace /> // si ya hay sesión, redirige al inicio
  // --- Estado local del formulario--
  // UseState lo  que hace es guardar el valor actual de cada campop.
  // Cada vez que un usuario escriba, actualiza el estado.
  const[formData, setFormData] = useState({
    correo: '', //correo del usuario (institucional)
    contrasena: '', //contraseña del usuario
  })
  const[error, setError] = useState('') //para mostrar errores de login
  const[cargando, setCargando] = useState(false) //para mostrar un spinner mientras se hace login
  

  //---- Manejo de cambios en los inputs----
  // Esta funcion se ejecuta cada vez que el usuario escribe
  // en cualqier campo del formulario.
  // usa "computed property names" para actualizar
  // dinamicamente el campo correcto sin repetir codigo.
  const handleChange = (e) => {
    const{name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  } 

  //---- Manejo del envio del formulario ----
  // Por ahoa solo previene el comportamiento por defecto
  //del navegador (se recarga la pagina) y muestra los datos
  // en consola. en el futuro, aqui se haria la backend.
 const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setCargando(true)

  try {
    await login(formData.correo, formData.contrasena) // usa el contexto
  } catch (err) {
    setError(err.response?.data?.mensaje || 'Error al conectar con el servidor.')
  } finally {
    setCargando(false)
  }
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
                name="correo" // debe coincidir con la clave en formData
                value={formData.correo} //controlado por estado de react
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
                name="contrasena" 
                value={formData.contrasena} //controlado por estado de react
                onChange={handleChange} //actualiza estado al escribir
                placeholder="°°°°°°°°"
                className="campo-input"
                required
                autoComplete="current-password" // ayuda al navegador a autocompletar
               />
              </div>
               {/* Botón de envío */}
               {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="auth-btn-primario" disabled={cargando}>
               {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
