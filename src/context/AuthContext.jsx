import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
        const [usuario, setUsuario] = useState(null);
        const [cargando, setCargando] = useState (true);

        //Verificar token al cargar la aplicacion
        useEffect(() => {
            const token = localStorage.getItem('authToken');
            const emailGuardado = localStorage.getItem('authEmail');
            if (token) {
                const contrasenia = token.replace("fake-token", ""); // Simulación de obtención de usuario desde el token
                setUsuario({ 
                    email: emailGuardado || "",
                    password: contrasenia,
                });
            }
            setCargando(false);
        }, []); // Se ejecuta solo al montar el componente

        // funcion para iniciar sesion
        const iniciarSesion = (contrasenia, emailIngresado) => {
            const token = `fake-token-${contrasenia}`
            localStorage.setItem('authToken', token);
            localStorage.setItem('authEmail', emailIngresado);

            setUsuario({ 
                email: emailIngresado || "",
                password: contrasenia,
            });
            console.log("Email guardado al iniciar sesión:", emailGuardado);
            console.log("contrasenia al iniciar sesión:", contrasenia);
        };

        // funcion para cerrar sesion
        const cerrarSesion = () =>{
            localStorage.removeItem('authToken');
            localStorage.removeItem('authEmail');
            localStorage.removeItem('carrito');
            setUsuario (null);
        };

    const value = {
        //autenticación
        isAuthenticated : !!usuario, //Prepiedad comptada
        cerrarSesion,
        iniciarSesion,
        usuario,
        cargando
    
    }

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAppContext debe usarse dentro de un AppProvider");
    }
    return context;
}