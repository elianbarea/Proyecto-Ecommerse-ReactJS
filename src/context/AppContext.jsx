import React, { createContext, useState, useContext } from "react";

//Crear el contarcto
export const AppCotext = createContext();
//Crear el proveedor del contexto
export function AppProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState({nombre:"",email:""});  
    const [carrito, setCarrito] = useState([]); //-- Guarda los productos añadidos al carrito

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
        alert(`Producto ${producto.nombre} añadido al carrito`);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const EliminarDeCarrito = (productoId) => {
        setCarrito(carrito.filter(prod => prod.id !== productoId));
    }; // cierre correcto

  
  const CerrarSesion = () => {
    setIsAuthenticated (false);
    setUsuario({nombre:"",email:""});
    vaciarCarrito();
};

    const value = {
        //autenticación
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,

        //carrito
        carrito,
        agregarAlCarrito,
        vaciarCarrito,
        EliminarDeCarrito
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