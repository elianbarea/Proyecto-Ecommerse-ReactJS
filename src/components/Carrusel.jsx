import React from 'react'
import { Link ,useNavigate } from "react-router-dom";
import '../styles/Carrusel.css'

function Carrusel() {
  const navigate = useNavigate();

  const irAProductos = () => {
    navigate('/Productos');
  };

  return (
    <div id="carruselPrincipal" className="carousel slide mb-4" data-bs-ride="carousel">
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button 
          type="button" 
          data-bs-target="#carruselPrincipal" 
          data-bs-slide-to="0" 
          className="active" 
          aria-current="true" 
          aria-label="Slide 1"
        ></button>
        <button 
          type="button" 
          data-bs-target="#carruselPrincipal" 
          data-bs-slide-to="1" 
          aria-label="Slide 2"
        ></button>
        <button 
          type="button" 
          data-bs-target="#carruselPrincipal" 
          data-bs-slide-to="2" 
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-image-container" onClick={irAProductos}>
            <img 
              src="https://www.coto.com.ar/images/slider/suc-mdq-121225b.jpg" 
              className="d-block w-100" 
              alt="Slide 1"
            />
          </div>
          <div className="carousel-caption d-none d-md-block">
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-image-container" onClick={irAProductos}>
            <img 
              src="https://www.coto.com.ar/images/slider/hero-desktop-20comump-nuevob.jpg" 
              className="d-block w-100" 
              alt="Slide 2"
            />
          </div>
          <div className="carousel-caption d-none d-md-block">
          </div>
        </div>
      </div>

      {/* Controles */}
      <button 
        className="carousel-control-prev" 
        type="button" 
        data-bs-target="#carruselPrincipal" 
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button 
        className="carousel-control-next" 
        type="button" 
        data-bs-target="#carruselPrincipal" 
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Carrusel
