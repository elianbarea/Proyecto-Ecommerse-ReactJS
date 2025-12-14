import React from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Pagar = () => {
  const { carrito, calcularTotal, calcularTotalPorItem } = useAppContext();

  const handlePagar = () => {
    alert("Pago realizado con éxito");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">

        <div className="col-lg-8">
          <div className="card shadow-sm p-4">

            <h2 className="mb-4 text-center">Finalizar compra</h2>

            {/* Lista de productos */}
            <h5 className="mb-3">Productos en el carrito</h5>

            {carrito.length === 0 ? (
              <p className="text-muted text-center">No hay productos en el carrito</p>
            ) : (
              <ul className="list-group mb-4">
                {carrito.map((producto) => (
                  <li
                    key={producto.id}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="rounded"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                      <div>
                        <h6 className="mb-1">{producto.nombre}</h6>
                        <small className="text-muted">
                          Cantidad: {producto.cantidad}
                        </small>
                      </div>
                    </div>

                    <div className="text-end">
                      <span className="fw-semibold">
                        ${calcularTotalPorItem(producto.id).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Total */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Total a pagar</h5>
              <h4 className="mb-0 text-success">
                ${calcularTotal().toFixed(2)}
              </h4>
            </div>

            {/* Acciones */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-success flex-fill"
                onClick={handlePagar}
              >
                Pagar
              </button>

              <Link to="/productos" className="flex-fill">
                <button className="btn btn-outline-dark w-100">
                  Seguir comprando
                </button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Pagar;
