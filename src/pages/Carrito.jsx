// ...existing code...
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Carrito = () => {
  const { carrito, vaciarCarrito, EliminarDeCarrito, setCarrito } = useAppContext();

  function calcularTotal() {
    const total = carrito.reduce((sum, item) => {
      const cantidad = item.cantidad || 1;
      return sum + (Number(item.precio)) * cantidad;
    }, 0);
    return total;
  }
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Carrito de compras</h2>
      {carrito.length > 0 ? (
        <>
          <ul>
            {carrito.map((prod) => (
              <li key={prod.id}>
                {prod.nombre} - ${prod.precio}
              </li>
            ))}
          </ul>
          <hr />
          <h3>Total: ${calcularTotal()}</h3>
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