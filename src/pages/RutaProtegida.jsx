import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


function RutaProtegida ({children, soloAdmin = false}) {

    const { usuario, cargando } = useAuthContext();
    if(cargando){
        return <p>Cargando...</p>
    }
    if(!usuario){
        console.log('No estas autenticado, redirigiendo a Productos');
        return <Navigate to="/Login" replace/>
    }

    if(soloAdmin && usuario.email !== 'ad@admin.com')
    {return <Navigate to="/Productos" replace/>}

    return children;
    
} export default RutaProtegida;
