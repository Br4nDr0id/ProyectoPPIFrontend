
// Componente que protege rutas que requieren sesión activa.
// Si el usuario NO está logueado → redirige al login.
// Si el usuario SÍ está logueado → muestra el contenido.
//
// Uso en App.jsx:
//   <Route path='/publicar' element={
//     <RutaProtegida>
//       <PublicarProducto />
//     </RutaProtegida>
//   }/>


import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RutaProtegida({ children }) {

  // Obtenemos el usuario del contexto global
  const { usuario } = useAuth()

  // Si no hay usuario logueado, redirige al login
  // "replace" evita que el usuario pueda volver atrás con el botón del navegador
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Si hay usuario, renderiza el contenido protegido normalmente
  return children
}