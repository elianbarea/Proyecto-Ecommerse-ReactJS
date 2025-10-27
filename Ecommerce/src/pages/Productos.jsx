import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Products() {
    const [productos, setProductos] = useState([]);
    const [cartItems, setCartItems] = useState([]);//-- Guarda los productos añadidos al carrito
    const [cargando, setCargando] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleCartItems = (Product) => {
        setCartItems([...cartItems, Product]);
    }
    const BorrarProducto = (ProductIdx) => {
        setCartItems(cartItems.filter((_, i) => i !== ProductIdx));
    }

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

            <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Productos</h1> 
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p>Carrito</p>
                    <button onClick={() => setCartOpen(!cartOpen)}>
                        <span>🛒{cartItems.length}</span>
                    </button>
                </div>
            </div>           
          <div>
            <ul id="lista-productos">
            {productos.map(e => 
                <div key={e.id}>
                <p>{e.nombre}</p>
                <br/>
                <p>${e.precio}</p>
                <br/>
                <img src={e.imagen} alt={e.nombre} width="100"/>
                <br/>
                <Link to={`/productos/${e.id}`} state={{e}}><button>Mas detalles</button></Link>
                <button onClick={() => handleCartItems(e) }>Añadir al carrito</button>
                </div>
            )}
                      </ul>
          </div>
                      {cartOpen && (
                <aside style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '300px',
                    height: '100%',
                    background: '#0d0b0bff',
                    borderLeft: '1px solid #ccc',
                    padding: '1rem',
                    boxShadow: '-2px 0 8px rgba(0,0,0,0.1)'
                }}>
                    <button onClick={() => setCartOpen(!cartOpen)}>X</button>
                    <h2>Carrito</h2>
                    {cartItems.length === 0 ? (
                        <p>No hay productos en el carrito.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item, idx) => (
                                <div style={{display: 'flex', justifyContent: 'space-between'}} key={idx}>
                                <li key={idx}>{item.nombre} - ${item.precio}</li> 
                                <button onClick={()=> BorrarProducto(idx)}>Eliminar</button>
                                </div>                                  
                            ))}
                        </ul>
                    )}
                </aside>
            )}
        </main>
        
    );
} export default Products;