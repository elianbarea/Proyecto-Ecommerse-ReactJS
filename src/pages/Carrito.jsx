// ...existing code...
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";

const Carrito = () => {
  const { carrito, vaciarCarrito, calcularTotal, agregarCantidad, quitarCantidad } = useAppContext();
  const { usuario } = useAuthContext();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Carrito de compras</h2>
      {carrito.length > 0 ? (
        <>
          <ul className="list-group list-group-flush">
            {carrito.map((prod) => (
              <li key={prod.id} className="list-group-item d-flex align-items-center gap-3 mb-3">
                <img src={prod.imagen} alt={prod.nombre} className="img-thumbnail" style={{ width: 80, height: 80, objectFit: 'cover' }} />
                <div className="flex-grow-1">
                  <div className="fw-bold">{prod.nombre}</div>
                  <div>${prod.precio} — Cantidad: {prod.cantidad || 1}</div>
                  <div className="mt-2">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => agregarCantidad(prod.id)}>+</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => quitarCantidad(prod.id)}>-</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <h3>Total: ${calcularTotal().toFixed(2)}</h3>
          <button>Finalizar compra</button>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default Carrito;
// ...existing code...