import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '100%',
        margin: '2rem auto',
        color: '#fff',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
      }}
    >
      {/* Imagen de fondo */}
      <img
        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
        alt="Fondo gamers"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35,
          zIndex: 0
        }}
      />
      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Sobre nosotros</h1>
        <p>
          Somos <strong>GameZone Accesorios</strong>, una empresa dedicada a la venta de accesorios gamers de alta calidad. 
          Nuestro objetivo es potenciar tu experiencia de juego con productos innovadores, cómodos y confiables. 
          Ofrecemos teclados mecánicos, mouse de precisión, auriculares envolventes, sillas ergonómicas y mucho más. 
          Nos apasiona el mundo gamer y trabajamos cada día para brindarte el mejor asesoramiento y atención personalizada.
        </p>
        <Link to="/Productos"><button>Volver al Inicio</button></Link>
      </div>
    </div>
  )
}

export default About