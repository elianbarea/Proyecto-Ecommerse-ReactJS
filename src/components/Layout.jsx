import React, {use, useEffect} from 'react';
import styled from 'styled-components';
import Navbar from './../pages/Navbar';
import Footer from './../pages/Footer';
import Carrusel from './Carrusel';


function Layout ({ children }) {

    //SEO NATIVO con useEffect
    useEffect(() => {
        document.title = "Mi Tienda - La mejor tienda de juegos de mesa";
        
    //Funcion que actualiza o crea meta tags
    const updateMetaTag = (name, content, attribute = "name") => {
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if(!meta){
            meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            document.head.appendChild(meta);
        }
        meta.content = content;
    };
    // Meta tags básicos// Meta tags básicos
updateMetaTag('description', 'Explora nuestro catálogo completo de juegos de mesa únicos. Encuentra juegoshistóricos, clásicos, modernos y educativos. Compra en línea con los mejores precios.');
updateMetaTag('keywords', 'juegos de mesa, juegos históricos, juegos clásicos, juegos modernos, juegoseducativos, tienda de juegos, comprar juegos de mesa');
updateMetaTag('author', 'Tienda de Juegos de Mesa');
updateMetaTag('robots', 'index, follow');

// Open Graph para redes sociales
updateMetaTag('og:title', 'Tienda de Juegos de Mesa | Los Mejores Juegos', 'property');
updateMetaTag('og:description', 'Descubre una amplia variedad de juegos de mesa. Desde clásicos históricoshasta juegos modernos y educativos.', 'property');
updateMetaTag('og:type', 'website', 'property' );
updateMetaTag('og:image', window. location.origin + '/logo.jpg', 'property');

// Twitter Card
updateMetaTag('twitter:card', 'summary_large_image');
updateMetaTag('twitter:title', 'Tienda de Juegos de Mesa');
updateMetaTag('twitter:description', 'Compra los mejores juegos de mesa en línea');
updateMetaTag('twitter:image', window.location.origin + '/logo.jpg');

// Canonical link
let canonical = document.querySelector('link[rel="canonical"]');
if (!canonical) {
canonical = document.createElement('link');
canonical.rel = 'canonical';
document.head. appendChild(canonical);
}
canonical.href = window.location.origin;

}, []);

return (
<LayoutContainer>
<Header>
<Navbar />
<Carrusel />
</Header>

<Main>
{children}
</Main>

 <FooterWrapper>
<Footer />
</FooterWrapper>
</LayoutContainer>
);
}

export default Layout;



const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  top: 0;
  z-index: 100;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

const FooterWrapper = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 0;
  margin-top: auto;
  border-top: 2px solid #34495e;
`;