import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { useAppContext } from "../context/AppContext";
import "../styles/productos.css";

function Products() {
    const [productos, setProductos] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    // CONTEXTO PARA EL CARRITO
    const { agregarAlCarrito, carrito } = useAppContext();

    useEffect(() => {
        fetch('https://68ddd873d7b591b4b78da984.mockapi.io/api/productos/Producto')
        .then ((respuesta) => respuesta.json())
        .then ((datos) => {
            setProductos(datos);
            setCargando(false)
        })
        .catch ((error) => {
            setError('Error al cargar los productos');
            setCargando(false);
        });
    }, []);

    if(cargando) return <p>Cargando...</p>;
    if(error) return <p>{error}</p>;

    return (
        <main className="productos-main">
            <div className="productos-header">
                <h1 className="H1Producto">Productos</h1>
                <div className="cart-info">
                    <button className="close-btn" onClick={() => setCartOpen(!cartOpen)}>Carrito</button>
                </div>
            </div>

            <div>
                <ul id="lista-productos" className="">
                    {productos.map(producto => 
                        <li className="producto-item" key={producto.id}>
                            <p className="producto-nombre">{producto.nombre}</p>
                            <p className="producto-precio">${producto.precio}</p>
                            <img className="producto-image" src={producto.imagen} alt={producto.nombre}/>
                            <div className="producto-actions">
                                <Link to={`/productos/${producto.id}`} state={{e: producto}}>
                                    <button className="btn detalles">Más detalles</button>
                                </Link>
                                <button className="btn primary" onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            {cartOpen && (
                <aside className="cart-aside">
                    <button className="close-btn" onClick={() => setCartOpen(!cartOpen)}>X</button>
                    <h2>Carrito</h2>
                    {(!carrito || carrito.length === 0) ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        <ul>
                            {carrito.map((item, idx) => (
                                <li className="cart-item" key={idx}>
                                    <span>{item.nombre} - ${item.precio}</span>
                                    <button className="btn small">Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </aside>
            )}
        </main>
    );
}
export default Products;