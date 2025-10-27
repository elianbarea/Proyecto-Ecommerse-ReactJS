import React, {use, useEffect, useState} from "react";
import {Routes, Route} from 'react-router-dom'
import Navbar from './pages/Navbar'
import Inicio from './pages/Inicio'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/DetalleProductos'
import RutaProtegida from './pages/RutaProtegida'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import { AppProvider } from "./context/AppContext";

function App() {

  return (
    <AppProvider>
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Productos' element={<Productos/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Productos/:id' element={<ProductoDetalle/>}/>
        <Route path='/Carrito' element={
          <RutaProtegida>
            <Carrito />
          </RutaProtegida>}/>
        <Route path='/DetalleProductos/:id' element={<ProductoDetalle/>}/>
      </Routes>
    </div>
    </AppProvider>
  )
}

export default App
