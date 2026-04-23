
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {

  // ── Estado local del formulario ──────────────────────────
  // Cada propiedad corresponde a un campo del formulario.
  const [formData, setFormData] = useState({
    nombre: '',           // Nombre completo del usuario
    email: '',            // Correo institucional
    password: '',         // Contraseña elegida
    confirmarPassword: '',// Repetición de la contraseña para validar
    rol: 'estudiante',    // Rol por defecto: estudiante o docente
  })

  // ── Estado para mostrar errores de validación ────────────
  // Si el usuario no llena algo bien, aquí guardamos el mensaje.
  const [error, setError] = useState('')

  // ── Manejo de cambios en los inputs ─────────────────────
  // Función reutilizable para todos los campos:
  // usa el atributo `name` del input para saber qué clave
  // del estado actualizar.
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Limpiamos el error al escribir de nuevo
  }

  // ── Validación local antes de enviar ────────────────────
  // Verifica que las contraseñas coincidan antes de mandar
  // los datos al servidor.
  const validar = () => {
    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden.')
      return false
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return false
    }
    return true
  }

  // ── Manejo del envío del formulario ─────────────────────
  // Primero valida localmente; si todo está bien, aquí irá
  // la llamada al backend.
  const handleSubmit = (e) => {
    e.preventDefault() // Evita que la página se recargue
    if (!validar()) return // Si la validación falla, no continúa

    console.log('Datos de registro:', formData)
    // TODO: conectar con el backend
    // Ejemplo futuro:
    // axios.post('/api/auth/register', formData)
    //   .then(res => navigate('/login'))
    //   .catch(err => setError(err.response.data.message))
  }

  return (
    // ── Contenedor de página centrado verticalmente ────────
    <div className="auth-page">

      {/* ── Tarjeta del formulario ─────────────────────── */}
      <div className="auth-card auth-card--registro">

        {/* Encabezado */}
        <div className="auth-header">
          <span className="auth-logo">MarketTdea</span>
          <h1 className="auth-titulo">Crea tu cuenta</h1>
          <p className="auth-subtitulo">Únete a la comunidad del Tdea</p>
        </div>

        {/* ── Formulario de registro ────────────────────── */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Campo: Nombre completo */}
          <div className="campo-grupo">
            <label htmlFor="nombre" className="campo-label">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              className="campo-input"
              required
              autoComplete="name"
            />
          </div>

          {/* Campo: Correo electrónico */}
          <div className="campo-grupo">
            <label htmlFor="email" className="campo-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tucorreo@tdea.edu.co"
              className="campo-input"
              required
              autoComplete="email"
            />
          </div>

          {/* ── Selector de rol ──────────────────────────
              Permite al usuario elegir si es Estudiante o Docente.
              El valor seleccionado se guarda en formData.rol.        */}
          <div className="campo-grupo">
            <label htmlFor="rol" className="campo-label">
              Soy...
            </label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="campo-input campo-select"
            >
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
            </select>
          </div>

          {/* Campo: Contraseña */}
          <div className="campo-grupo">
            <label htmlFor="password" className="campo-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              className="campo-input"
              required
              autoComplete="new-password"
            />
          </div>

          {/* Campo: Confirmar contraseña */}
          <div className="campo-grupo">
            <label htmlFor="confirmarPassword" className="campo-label">
              Confirmar contraseña
            </label>
            <input
              id="confirmarPassword"
              type="password"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              className="campo-input"
              required
              autoComplete="new-password"
            />
          </div>

          {/* ── Mensaje de error ─────────────────────────
              Solo se muestra si la variable `error` tiene contenido. */}
          {error && (
            <p className="auth-error">{error}</p>
          )}

          {/* Botón de envío */}
          <button type="submit" className="auth-btn-primario">
            Crear cuenta
          </button>

        </form>

        {/* ── Pie: enlace al login ──────────────────────── */}
        <p className="auth-footer-texto">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="auth-link">
            Inicia sesión
          </Link>
        </p>

      </div>
    </div>
  )
}
