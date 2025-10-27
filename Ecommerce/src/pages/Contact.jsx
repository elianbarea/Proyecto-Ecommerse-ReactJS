import React from 'react';

function Contact() {
  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '2rem', padding: '1rem', borderRadius: '8px', maxWidth: '900px', margin: '0 auto', position: 'relative', }}>
      {/* Formulario de contacto */}
      <form style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', alignItems: 'flex-start' , padding: '1rem', borderRadius: '8px' }}>
        <h2>Contacto</h2>
        <label>
          Nombre:
          <input type="text" name="nombre" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Número de Teléfono:
          <input type="tel" name="telefono" required />
        </label>
        <button type="submit">Enviar</button>
      </form>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
      <img 
        src="https://cdn-icons-png.flaticon.com/512/6194/6194658.png" 
        alt="Imagen de contacto" 
        style={{width:'400px' , borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      />
    </div>
      
     
    </div>
  );
}

export default Contact;