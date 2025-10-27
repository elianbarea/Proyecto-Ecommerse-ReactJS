import React from 'react'
import { Link } from 'react-router-dom'

function Servicios() {
  return (
    <div>
        <h1>Bienvenidos a Servicios</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum nesciunt mollitia aut voluptates reiciendis ex quasi laboriosam soluta sed dolorem a, nihil cupiditate consectetur commodi magni accusamus quaerat aperiam alias.</p>
        <Link to="/"><button>Volver al Inicio</button></Link>
    </div>
  )
}

export default Servicios