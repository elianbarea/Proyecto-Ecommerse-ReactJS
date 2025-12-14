import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react"; 


const Login = () => {
   const { iniciarSesion} = useAuthContext();
   const [formulario, setFormulario] = useState({usuario: '',password: ''});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //simular cred admin
        if(formulario.usuario === 'admin@ad.com' && formulario.password === '1234'){
          localStorage.setItem('authEmail', formulario.usuario);
          iniciarSesion("1234", formulario.usuario);
          navigate('/Productos');
        }
        else if(
          formulario.usuario &&
          formulario.password &&
          formulario.usuario !== "admin@ad.com"
        ) {
          localStorage.setItem('authEmail', formulario.usuario);
          iniciarSesion(formulario.password, formulario.usuario);
        }
        else{
          alert('Credenciales incorrectas');
        }
        
    };


  return (
    <div style={{ maxWidth: "350px", margin: "4rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            placeholder="ejemplo@correo.com"
            value={formulario.usuario}
            onChange={(e) => setFormulario({ ...formulario, usuario: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            placeholder="********"
            value={formulario.password}
            onChange={(e) => setFormulario({ ...formulario, password: e.target.value })}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "0.75rem", background: "#1976d2", color: "#fff", border: "none", borderRadius: "4px" }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;