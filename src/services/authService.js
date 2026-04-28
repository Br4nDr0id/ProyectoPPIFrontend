
//
// Centraliza todas las llamadas al backend relacionadas
// con autenticación. Si cambia la URL o el puerto del
// backend, solo se edita aquí, no en cada componente.


import axios from 'axios'

// URL base del backend — un solo lugar para cambiarla
const API_URL = 'http://localhost:4000/api/auth'

const authService = {

  // ── Login ────────────────────────────────────────────────
  // Envía correo y contraseña al backend.
  // Retorna { token, usuario } si es exitoso.
  login: async (correo, contrasena) => {
    const respuesta = await axios.post(`${API_URL}/login`, {
      correo,
      contrasena,
    })
    return respuesta.data
  },

  // ── Registro ─────────────────────────────────────────────
  // Envía los datos del nuevo usuario al backend.
  registro: async (datos) => {
    const respuesta = await axios.post(`${API_URL}/registro`, datos)
    return respuesta.data
  },

  // ── Guardar sesión ───────────────────────────────────────
  // Guarda el token y los datos del usuario en localStorage.
  guardarSesion: (token, usuario) => {
    localStorage.setItem('token',   token)
    localStorage.setItem('usuario', JSON.stringify(usuario))
  },

  // ── Cerrar sesión ────────────────────────────────────────
  // Elimina el token y los datos del usuario de localStorage.
  cerrarSesion: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  },

  // ── Obtener usuario actual ───────────────────────────────
  // Lee el usuario guardado en localStorage.
  // Retorna el objeto usuario o null si no hay sesión.
  obtenerUsuario: () => {
    const data = localStorage.getItem('usuario')
    return data ? JSON.parse(data) : null
  },

  // ── Verificar si hay sesión activa ───────────────────────
  // Retorna true si hay token guardado, false si no.
  estaLogueado: () => {
    return !!localStorage.getItem('token')
  },

}

export default authService