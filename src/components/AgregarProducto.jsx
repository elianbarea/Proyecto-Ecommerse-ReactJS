import React, {useState} from "react";

function AgregarProducto() 
{
const [producto , setProducto] = useState({nombre: '', precio: '', descripcion: '', categoria: '', imagen: ''});
const [errores, setErrores] = useState({});
const [cargando, setCargando] = useState(false);

const manejarCambio = (e) => {
  const { name, value } = e.target;
  
  // valida longitud máx. descripción
  if (name === 'descripcion' && value.length > 200) return;
  
  setProducto(prev => ({ ...prev, [name]: value }));

  // limpia error si existe
  if (errores[name]) {
    setErrores(prev => ({ ...prev, [name]: '' }));
  }
};

// ✅ validarFormulario
const validarFormulario = () => {
  const errorDeCarga = {};

  // nombre
  if (!producto.nombre.trim()) errorDeCarga.nombre = 'El nombre es obligatorio';

  // precio
  if (!producto.precio.trim()) errorDeCarga.precio = 'El precio es obligatorio';
  else {
    const precioLimpio = producto.precio.replace(/\./g, '').replace(',', '.');
    const precioNumerico = parseFloat(precioLimpio);

    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      errorDeCarga.precio = 'El precio debe ser un número positivo';
    } else if (!/^[\d.,]+$/.test(producto.precio.replace(/\./g, ''))) {
      errorDeCarga.precio = 'Solo números, puntos o comas';
    }
  }

  // descripción
  if (!producto.descripcion) {
    errorDeCarga.descripcion = 'La descripción es obligatoria';
  } else if (producto.descripcion.length < 10) {
    errorDeCarga.descripcion = 'La descripción debe tener al menos 10 caracteres';
  } else if (producto.descripcion.length > 200) {
    errorDeCarga.descripcion = 'La descripción no puede exceder los 200 caracteres';
  }

  // ✅ actualiza errores y devuelve si el form es válido
  setErrores(errorDeCarga);
  return Object.keys(errorDeCarga).length === 0;
};

// agregarProducto
const agregarProducto = async (producto) => {
  try {
    const productoEnviar = {
      ...producto,
      precio: producto.precio.replace(',', '.'),
    };

    const respuesta = await fetch(
      'https://68ddd873d7b591b4b78da984.mockapi.io/api/productos/Producto',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEnviar),
      }
    );

    if (!respuesta.ok) throw new Error('Error al agregar el producto');

    const data = await respuesta.json();
    alert('Producto agregado con éxito');
    return data;
  } catch (error) {
    alert('Error al agregar el producto');
    throw error;
  }
};
  // f(x) manejarEnvio
  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    // Validar antes de enviar
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      await agregarProducto(producto);
      
      // Limpiar formulario después del éxito
      setProducto({nombre: '', precio: '', descripcion: '', categoria: '', imagen: ''});
      setErrores({});
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };


  // Renderizado del componente
  return (
    <form onSubmit={manejarEnvio} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Agregar Producto</h2>
      
      {/* Campo Nombre */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Nombre: *
        </label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={manejarCambio}
          disabled={cargando}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${errores.nombre ? 'red' : '#ccc'}`,
            borderRadius: '4px'
          }}
          placeholder="Ingrese el nombre del producto"
        />
        {errores.nombre && <p style={{ color: 'red', margin: '5px 0', fontSize: '14px' }}>{errores.nombre}</p>}
      </div>

      {/* Campo Precio */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Precio: *
        </label>
        <input
          type="text"
          name="precio"
          value={producto.precio}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="Ej: 40.000 o 40.000,50"
          inputMode="decimal"
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${errores.precio ? 'red' : '#ccc'}`,
            borderRadius: '4px'
          }}
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          Formato argentino: punto para miles, sin decimales.
        </div>
        {errores.precio && <p style={{ color: 'red', margin: '5px 0', fontSize: '14px' }}>{errores.precio}</p>}
      </div>

      {/* Campo Categoría */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Categoría:
        </label>
        <input
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="Ej: Electrónica, Ropa, Hogar, etc."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Campo Avatar URL */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Imagen (URL):
        </label>
        <input
          type="text"
          name="avatar"
          value={producto.avatar}
          onChange={manejarCambio}
          disabled={cargando}
          placeholder="https://ejemplo.com/avatar.jpg"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Campo Descripción */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Descripción: *
        </label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={manejarCambio}
          rows="4"
          disabled={cargando}
          maxLength="200"
          placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${errores.descripcion ? 'red' : '#ccc'}`,
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
        <div style={{
          fontSize: '12px',
          color: producto.descripcion.length > 200 ? 'red' : '#666',
          marginTop: '5px'
        }}>
          {producto.descripcion.length}/200 caracteres
        </div>
        {errores.descripcion && (
          <p style={{ color: 'red', margin: '5px 0', fontSize: '14px' }}>{errores.descripcion}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={cargando}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: cargando ? '#ccc' : 'darkolivegreen',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: cargando ? 'not-allowed' : 'pointer'
        }}
      >
        {cargando ? 'Agregando...' : 'Agregar Producto'}
      </button>
      <p>(*) Campos obligatorios</p>
    </form>
  );
} export default AgregarProducto;