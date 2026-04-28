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

          {/* Ruta protegida — por ahora con contenido temporal */}
          <Route path='/publicar' element={            
            <RutaProtegida>                            
              <PublicarProducto />
            </RutaProtegida>                           
          }/>                                          

        </Routes>
      </AuthProvider>                                  
    </Router>
  )
}

export default App
