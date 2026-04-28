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
   // Se crea un producto melo enviado ese parcero del token JWT
  crear: async (datos, token) =>{
    const respuesta = await axios.post(`${API_URL}/productos`, datos,{
      headers: {
        Authorization:`Bearer ${token}` // Token para autenticar al vendedor y tales.
      }
    })
    
  }
}

export default productosService