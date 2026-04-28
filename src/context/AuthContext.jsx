// ============================================================
// src/context/AuthContext.jsx
//
// Contexto global de autenticación.
// Permite que CUALQUIER componente sepa si hay sesión activa
// y acceda al usuario sin pasar props manualmente.
//
// Uso en cualquier componente:
//   const { usuario, login, cerrarSesion } = useContext(AuthContext)
// ============================================================

import React, { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

// Creamos el contexto — es el "canal" por donde fluyen los datos
export const AuthContext = createContext(null)

// ── Proveedor del contexto ───────────────────────────────
// Envuelve toda la app en App.jsx para que todos los
// componentes tengan acceso al estado de autenticación.
export function AuthProvider({ children }) {

  // Estado global del usuario — empieza leyendo localStorage
  const [usuario, setUsuario] = useState(() => authService.obtenerUsuario())

  const navigate = useNavigate()

  // ── Login ──────────────────────────────────────────────
  // Llama al servicio, guarda la sesión y actualiza el estado.
  const login = async (correo, contrasena) => {
    authService.cerrarSesion() // Limpia cualquier sesión previa    
    const data = await authService.login(correo, contrasena)
    authService.guardarSesion(data.token, data.usuario)
    setUsuario(data.usuario)
    navigate('/')
  }

  // ── Cerrar sesión ──────────────────────────────────────
  // Limpia localStorage, resetea el estado y redirige.
  const cerrarSesion = () => {
    authService.cerrarSesion()
    setUsuario(null)
    navigate('/login')
  }

  // ── Registro ───────────────────────────────────────────
  // Registra el usuario y lo redirige al login.
  const registro = async (datos) => {
    await authService.registro(datos)
    navigate('/login')
  }

  // Todos estos valores estarán disponibles en cualquier componente
  return (
    <AuthContext.Provider value={{ usuario, login, cerrarSesion, registro }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook personalizado ───────────────────────────────────
// En vez de escribir useContext(AuthContext) en cada componente,
// usamos este hook que lo hace más corto y legible:
//   const { usuario } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}