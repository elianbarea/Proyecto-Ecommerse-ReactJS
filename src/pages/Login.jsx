import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; 


const Login = () => {
   const { isAuthenticated , setIsAuthenticated } = useAppContext();
   console.log(isAuthenticated, 'IsAuthenticated desde Login');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAuthenticated(true);
        navigate('/Productos');
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