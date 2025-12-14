import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import { useAuthContext } from '../context/AuthContext'

function Navbar() {
  const { usuario, isAuthenticated ,cerrarSesion } = useAuthContext();
  return (
    <nav className='navbar navbar-expand-lg custom-navbar'>
      <div className="container">
        <Link className="navbar-brand" to="/Productos">MiLogo</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/Productos">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/About">Sobre nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Contact">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Carrito">Carrito</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Pagar">Pagar</Link></li>
            {usuario?.email === 'ad@admin.com' && (
              <li className="nav-item"><Link className="nav-link" to="/agregar-producto">Agregar Producto</Link></li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {!isAuthenticated ? (
              <Link to="/Login" className="btn btn-login">Login</Link>
            ) : (
              <div className="usuario-info d-flex align-items-center gap-2">
                <span className="usuario-email">{usuario.email}</span>
                <button onClick={cerrarSesion} className="logout-btn btn">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar