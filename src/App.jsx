import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Login from './pages/Login'
import Principal from './pages/Principal'
import Register from './pages/Register'
import Productos from './pages/Productos'

function App() {

  return (
    
      <Router>
        <Menu/>
        <Routes>    
          <Route path='/' element={<Principal/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registro' element={<Register/>}/>
          <Route path='/productos' element={<Productos/>}/>
        </Routes>
      </Router>
      
  
  )
}

export default App
