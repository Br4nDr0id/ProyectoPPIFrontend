import React, { useState } from 'react'

const productos = []

const categorias =['Todas', 'Libros', 'Tecnología', 'Servicios', 'Ropa', 'Alimentos', 'Arte']

const ordenOpciones=['Mas recientes','Menor precio', 'Mayor precio', 'Mejor calificación']

export default function Productos(){
    const[busqueda,setBusqueda] = useState('')
    const[categoriaActiva,setCategoriaActiva] = useState('Todas')
    const[orden,setOrden] = useState('Mas recientes')

    const filtrados = productos
    .filter(p => categoriaActiva === 'Todas' || p.categoria === categoriaActiva)
    .filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                 p.vendedor.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => {
      if (orden === 'Menor precio') return parseInt(a.precio.replace(/\D/g, '')) - parseInt(b.precio.replace(/\D/g, ''))
      if (orden === 'Mayor precio') return parseInt(b.precio.replace(/\D/g, '')) - parseInt(a.precio.replace(/\D/g, ''))
      if (orden === 'Mejor calificación') return b.calificacion - a.calificacion
      return a.id - b.id
    })
 
 
}