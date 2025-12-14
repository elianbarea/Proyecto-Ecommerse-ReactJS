import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditarProductos() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const productoOriginal = state.producto;

  const [producto, setProducto] = useState({
    ...productoOriginal,
    categoria: productoOriginal.categoria || "sin categoria",
  });

  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  // helper para borde según error
  const borde = (campo) =>
    errores[campo] ? "form-control is-invalid" : "form-control";

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const errorDeCarga = {};

    if (!producto.nombre.trim())
      errorDeCarga.nombre = "El nombre es obligatorio";

    if (!producto.precio.trim())
      errorDeCarga.precio = "El precio es obligatorio";
    else {
      const precioLimpio = producto.precio.replace(/\./g, "").replace(",", ".");
      const precioNumerico = parseFloat(precioLimpio);

      if (isNaN(precioNumerico) || precioNumerico <= 0) {
        errorDeCarga.precio = "El precio debe ser un número positivo";
      } else if (!/^[\d.,]+$/.test(producto.precio.replace(/\./g, ""))) {
        errorDeCarga.precio = "Solo números, puntos o comas";
      }
    }

    if (!producto.descripcion)
      errorDeCarga.descripcion = "La descripción es obligatoria";
    else if (producto.descripcion.length < 10)
      errorDeCarga.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    else if (producto.descripcion.length > 200)
      errorDeCarga.descripcion =
        "La descripción no puede exceder los 200 caracteres";

    setErrores(errorDeCarga);
    return Object.keys(errorDeCarga).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.replace(",", "."),
        imagen: producto.avatar ?? producto.imagen,
      };

      const respuesta = await fetch(
        `https://68ddd873d7b591b4b78da984.mockapi.io/api/productos/Producto/${producto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoEnviar),
        }
      );

      if (!respuesta.ok) throw new Error("Error al actualizar el producto");
      alert("Producto actualizado con éxito");
      navigate("/productos");
    } catch (error) {
      alert("Error al actualizar el producto");
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    alert("Edición cancelada");
    navigate("/productos");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">
                Editar producto
              </h3>

              <form onSubmit={manejarEnvio}>
                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={manejarCambio}
                    className={borde("nombre")}
                  />
                  {errores.nombre && (
                    <div className="invalid-feedback">
                      {errores.nombre}
                    </div>
                  )}
                </div>

                {/* Precio */}
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={manejarCambio}
                    placeholder="Ej: 40.000 o 40.000,50"
                    className={borde("precio")}
                  />
                  <div className="form-text">
                    Formato: punto para miles, coma para decimales
                  </div>
                  {errores.precio && (
                    <div className="invalid-feedback">
                      {errores.precio}
                    </div>
                  )}
                </div>

                {/* Categoría */}
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <input
                    type="text"
                    name="categoria"
                    value={producto.categoria}
                    onChange={manejarCambio}
                    className="form-control"
                  />
                </div>

                {/* Imagen */}
                <div className="mb-3">
                  <label className="form-label">Imagen (URL)</label>
                  <input
                    type="text"
                    name="avatar"
                    value={producto.avatar}
                    onChange={manejarCambio}
                    className="form-control"
                  />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={manejarCambio}
                    rows="4"
                    className={borde("descripcion")}
                  />
                  {errores.descripcion && (
                    <div className="invalid-feedback">
                      {errores.descripcion}
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    disabled={cargando}
                    className="btn btn-primary w-100"
                  >
                    {cargando ? "Actualizando..." : "Confirmar cambios"}
                  </button>

                  <button
                    type="button"
                    onClick={cancelarEdicion}
                    className="btn btn-secondary w-100"
                  >
                    Cancelar
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProductos;
