import React, {useEffect, useState} from "react";
import { Link ,useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";
import "../styles/Productos.css"; // <-- corregido a mayúscula
import {FaShoppingCart} from "react-icons/fa";

function Products() {
    const [productos, setProductos] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //armamos lo que seran las constantes paginadoras/busquedas
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    //---USE EFECT DEL METADATA, esto ayuda a que el cliente encuentre mejor la pagina, con palabras claves definidas.
    useEffect(() => {
        document.title = "Elementos - Mi Tienda";
        const updateMetaTag = (name, content, attribute = "name") => {
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if(!meta){
            meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }
    // Meta tags básicos
updateMetaTag('description', 'Explora el catálogo de juegos de mesa. Encuentra juegos históricos, clásicos, modernos y educativos.');
updateMetaTag('keywords', 'juegos de mesa, juegos históricos, juegos clásicos,juegos modernos, juegos educativos');
updateMetaTag('author', 'Tu Tienda');
updateMetaTag('robots', 'index, follow');

// Open Graph
updateMetaTag('og:title', 'Tienda de Juegos de Mesa', 'property');
updateMetaTag('og:description', 'Explora el catálogo de juegos de mesa.',
'property');
updateMetaTag('og:type', 'website', 'property');
updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
updateMetaTag('og:url', window.location.href, 'property');

}, []); 
    //variable de busqueda
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (producto.categoria && producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
    );
    //paginado
    const productosPorPagina = 6;
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    }

    //resetear a pagina 1 con busquuedas
    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
        setPaginaActual(1);
    };

    // CONTEXTO PARA EL CARRITO
    const { agregarAlCarrito, carrito, setCarrito } = useAppContext();
    const { usuario } = useAuthContext();
    const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
    const esAdmin = usuario?.email === "ad@admin.com" || false;

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
        <main className="productos-main container">
            <div className="productos-header">
                <h1 className="H1Producto">Productos</h1>
                <div className="cart-info">
                    <button className="close-btn btn btn-outline-secondary" onClick={() => setCartOpen(!cartOpen)}>
                    Carrito <FaShoppingCart/>
                    {totalItemsCarrito}
                    </button>
                </div>
            </div>

            <div className="mb-4 mt-3">
                <div className="input-group input-group-lg">
                    <input 
                        type="text" 
                        className="form-control border-primary" 
                        placeholder="Buscar productos por nombre o categoría..."
                        value={busqueda}
                        onChange={manejarBusqueda}
                        style={{borderRadius: '25px 0 0 25px'}}
                    />
                    <button className="btn btn-primary" type="button" style={{borderRadius: '0 25px 25px 0'}}>
                        🔍
                    </button>
                </div>
            </div>

            <div>
                <div id="lista-productos" className="row g-3 productos-list">
                    {productosActuales.map(producto => 
                        <div className="producto-item card col-lg-12" key={producto.id}>
                            <img className="producto-image" src={producto.imagen} alt={producto.nombre}/>
                            <div className="card-body d-flex flex-column">
                                <h5 className="producto-nombre card-title">{producto.nombre}</h5>
                                <p className="producto-precio card-text">Precio: ${producto.precio}</p>

                                <div className="producto-actions mt-auto d-flex">
                                    <Link to={`/productos/${producto.id}`} state={{e: producto}} className="btn detalles me-2">Más detalles</Link>
                                    <button className="btn primary me-2" onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>

                                    {esAdmin && (
                                        <div className="d-flex gap-2">
                                            <button onClick={() => navigate("/editar-productos",{state: {producto}})} className="btn btn-sm btn-outline-primary">Editar</button>
                                            <button onClick={() => navigate("/eliminar-productos",{state: {producto}})} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

      {/* Paginador - Estilo simplificado */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}


        {/* Información de la página actual */}
        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2">
            <small>
              Mostrando {productosActuales.length} productos
              (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}

            </div>
{cartOpen && (
            <div className={`cart-popup ${cartOpen ? "open" : ""}`}>
    <div className="cart-popup-content">
        <button className="btn btn-sm btn-outline-secondary close-popup" onClick={() => setCartOpen(false)}>
            X
        </button>
        <h2>Carrito</h2>

        {(!carrito || carrito.length === 0) ? (
            <p>No hay productos en el carrito.</p>
        ) : (
            <>
            <ul className="list-group">
                {carrito.map((item, idx) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                        <div className="d-flex align-items-center gap-2">
                            <img src={item.imagen} alt={item.nombre} className="img-sm"/>
                            <span>{item.nombre}</span>
                        </div>
                        <span>${item.precio}</span>
                    </li>
                ))}
            </ul>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/Carrito')}>Comprar</button>
            </>
        )}
    </div>
    
</div>)}

        </main>
    );
}
export default Products;