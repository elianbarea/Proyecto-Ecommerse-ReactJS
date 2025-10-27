import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './pages/Navbar'
import Inicio from './pages/Inicio'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/DetalleProductos'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Productos' element={<Productos/>}/>
        <Route path='/Productos/:id' element={<ProductoDetalle/>}/>
      </Routes>
    </div>
  )
}

export default App
