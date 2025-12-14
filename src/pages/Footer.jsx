import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "../styles/Footer.css"; // opcional si querés estilos propios

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Info */}
        <div className="footer-info">
          <p className="footer-p">Desarrollado por <strong>Elian Barea</strong></p>
          <p className="footer-rights">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>

        {/* Links legales */}
        <div className="footer-links">
          <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer">
            Términos y condiciones
          </a>
          <span>•</span>
          <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">
            Política de privacidad
          </a>
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
