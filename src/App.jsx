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
import Pagar from './pages/Pagar'
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import EditarProductos from "./components/EditarProductos";
import EliminarProducto from "./components/EliminarProducto";
import AgregarProducto from "./components/AgregarProducto";
import Layout from "./components/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div>
      <AuthProvider>
    <AppProvider>
      <Layout>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Productos/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Productos' element={<Productos/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Productos/:id' element={<ProductoDetalle/>}/>
        <Route path='/Carrito' element={
          <RutaProtegida>
            <Carrito />
          </RutaProtegida>}/>
          <Route path='/Pagar' element={
          <RutaProtegida>
            <Pagar />
          </RutaProtegida>}/>
        <Route path='/DetalleProductos/:id' element={<ProductoDetalle/>}/>

        {/* <FormularioProducto - ADMIN/> */}
        <Route path='/agregar-producto' element={
          <RutaProtegida soloAdmin={true}>
            <AgregarProducto/></RutaProtegida>}/>
        {/* <FormularioEditarProducto - ADMIN/> */}
        <Route path='/editar-productos' element={
          <RutaProtegida soloAdmin={true}>
            <EditarProductos/></RutaProtegida>}/>
            <Route path='/eliminar-productos' element={
          <RutaProtegida soloAdmin={true}>
            <EliminarProducto/></RutaProtegida>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Layout>
    </AppProvider>
    </AuthProvider>
    </div>
  )
}

export default App
