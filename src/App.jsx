import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Login from './pages/Login'
import Principal from './pages/Principal'
import Register from './pages/Register'
import Productos from './pages/Productos'
import { AuthProvider } from './context/AuthContext'
import RutaProtegida from './components/RutaProtegida'
import DetalleProducto from './pages/DetalleProducto'
import PublicarProducto from './pages/PublicarProducto'
import MisProductos from './pages/MisProductos'
import EditarProducto from './pages/EditarProducto'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Menu/>
        <Routes>
          <Route path='/' element={<Principal/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registro' element={<Register/>}/>
          <Route path='/productos' element={<Productos/>}/>
          <Route path='/productos/:id' element={<DetalleProducto/>}/>

          {/* Rutas protegidas — requieren sesión activa */}
          <Route path='/publicar' element={
            <RutaProtegida>
              <PublicarProducto />
            </RutaProtegida>
          }/>
          <Route path='/mis-productos' element={
            <RutaProtegida>
              <MisProductos />
            </RutaProtegida>
          }/>
          <Route path='/editar/:id' element={
            <RutaProtegida>
              <EditarProducto />
            </RutaProtegida>
          }/>

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
