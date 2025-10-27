import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar() {
  return (
    <div>
        <nav className='navbar'>
           <div className="navbar-logo">MiLogo</div>
          <div className='navbar-links'>
            <ul>
                {/* <li><a href="/">Inicio</a></li>
                <li><a href='/Servicios'>Servicios</a></li>  esto seria la forma vieja de nav*/}
                <li><Link to="/Login">Login</Link>  </li>
                <li><Link to="/Productos">Inicio</Link></li>
                <li><Link to="/About">Sobre nosotros</Link> </li>
                <li><Link to="/Contact">Contacto</Link></li>
                <li><Link to="/Carrito">Carrito</Link></li>
            </ul>
          </div>
        </nav>
    </div>
  )
}

export default Navbar