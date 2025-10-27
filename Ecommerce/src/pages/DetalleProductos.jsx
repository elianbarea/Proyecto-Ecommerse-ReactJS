import { Link, useParams, useLocation } from "react-router-dom";

const ProductoDetalle =() => {
    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.e;

    if (!producto) {
        return <p>Producto no encontrado</p>;
        <Link to="/productos"><button>Volver a Productos</button></Link>
    }
    return (
        <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <h1>Detalle del Producto {id}</h1>
            <div key={producto.id}>
                <p>Nombre: {producto.nombre}</p>
                <p>Precio: ${producto.precio}</p>
                <img src={producto.imagen} alt={producto.nombre} width="200"/>
            </div>
            <Link to="/productos"><button>Volver a Productos</button></Link>
        </div>
    );
}; export default ProductoDetalle;