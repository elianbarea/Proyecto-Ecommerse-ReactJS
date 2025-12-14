import React from "react";

function Contact() {
  return (
    <div className="container my-5">
      <div className="row align-items-center justify-content-center g-4">

        {/* Formulario */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Contacto</h2>

            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+54 11 1234 5678"
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Imagen */}
        <div className="col-md-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6194/6194658.png"
            alt="Contacto"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: "400px" }}
          />
        </div>

      </div>
    </div>
  );
}

export default Contact;
