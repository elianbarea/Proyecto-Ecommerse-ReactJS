import React from "react";

import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


function RutaProtegida ({children}) {
    const { isAuthenticated } = useAppContext();
    if(!isAuthenticated){
        console.log('No estas autenticado, redirigiendo a Productos');
        return <Navigate to="/Login"/>
    }

    return children;
    
} export default RutaProtegida;
