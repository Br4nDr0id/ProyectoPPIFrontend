import axios from 'axios'

const API_URL = 'http://localhost:4000/api'

const productosService = {

  // Obtiene todos los productos disponibles del backend
  listar: async () => {
    const respuesta = await axios.get(`${API_URL}/productos`)
    return respuesta.data.data // el backend devuelve { success, data }
  },
  // el nombre lo dice, pillamos esa vuelta del prodcuto por su ID
  obtenerPorId: async (id) => {
    const respuesta = await axios.get(`${API_URL}/productos/${id}`)
    return respuesta.data.data
  },
  // Con este parcero vamos a obtener las categorias para el selector 
  listarCategorias: async () => {
    const respuesta = await axios.get(`${API_URL}/categorias`)
    return respuesta.data.data
  },
  // Se crea un producto enviando FormData (soporta archivos de imagen)
  crear: async (datos, token) => {
    await axios.post(`${API_URL}/productos`, datos, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  // Devuelve solo los productos publicados por el usuario logueado
  listarMisProductos: async (token) => {
    const respuesta = await axios.get(`${API_URL}/mis-productos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return respuesta.data.data
  },

  // Actualiza un producto (envía FormData para soportar cambio de imagen)
  actualizar: async (id, datos, token) => {
    await axios.put(`${API_URL}/productos/${id}`, datos, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },

  // Elimina un producto por su ID
  eliminar: async (id, token) => {
    await axios.delete(`${API_URL}/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}

export default productosService