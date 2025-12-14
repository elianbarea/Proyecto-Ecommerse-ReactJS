import React, { createContext, useState, useContext, useEffect } from "react";
import { toast as Toast } from 'react-toastify';

//Crear el contarcto
export const AppCotext = createContext();
//Crear el proveedor del contexto
export function AppProvider({ children }) {
    const [carrito, setCarrito] = useState([]); //-- Guarda los productos añadidos al carrito
    const [cargaCompleta, setCargaCompleta] = useState(false); //BANDERA

    useEffect(()=>{
      const carritoGuardado = localStorage.getItem('carrito');
      if(carritoGuardado){
        setCarrito (JSON.parse (carritoGuardado));
      }
      setCargaCompleta (true);
    },[]);
    // Guardar el carrito en el localStorage cada vez que cambie
    useEffect(()=>{
      if(cargaCompleta){
        localStorage.setItem ('carrito', JSON.stringify (carrito));
      }
    }, [carrito, cargaCompleta]);
      
    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            // Verificar si el producto ya está en el carrito
            const productoExistente = prevCarrito.find(item => item.id === producto.id);
            if  (productoExistente) {
                // Si existe, aumentar la cantidad
                return prevCarrito.map(item =>
                    item.id === producto.id
                    ? {...item, cantidad: item.cantidad + 1}
                    : item);}
            else {
                return [...prevCarrito, {...producto, cantidad: 1}];
            }
        });
        Toast.success(`Producto ${producto.nombre} agregado al carrito!`)
    }

    function calcularTotalPorItem(productoId) {
      const item = carrito.find(item => item.id === productoId);

      if(carrito.find(item => item.id === productoId)) {
        const cantidad = item.cantidad || 1;
        return Number(item.precio) * cantidad;
      }
      else {
        return 0;
      }
    }

      function calcularTotal() {
    const total = carrito.reduce((sum, item) => {
      const cantidad = item.cantidad || 1;
      return sum + (Number(item.precio)) * cantidad;
    }, 0);
    return total;
  }

  function agregarCantidad(productoId) {
    setCarrito(carrito.map(prod => {
      if (prod.id === productoId) {
        return { ...prod, cantidad: (prod.cantidad || 1) + 1 };
      }
      return prod;
    }
    ));
  }

    function quitarCantidad(productoId) {
    setCarrito(carrito.map(prod => {
      if (prod.id === productoId) {
        return { ...prod, cantidad: (prod.cantidad || 1) - 1 };
      }
      return prod;
    }
    ));
  }

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const EliminarDeCarrito = (productoId) => {
        setCarrito(carrito.filter(prod => prod.id !== productoId));
    }; // cierre correcto

  
 

    const value = {
        //carrito
        carrito,
        agregarAlCarrito,
        vaciarCarrito,
        EliminarDeCarrito,
        calcularTotal,
        agregarCantidad,
        quitarCantidad,
        calcularTotalPorItem
    }

    return (
        <AppCotext.Provider value={ value }>
            {children}
        </AppCotext.Provider>
    );


    
}

export function useAppContext() {
    const context = useContext(AppCotext);
    if (!context) {
        throw new Error("useAppContext debe usarse dentro de un AppProvider");
    }
    return context;
}