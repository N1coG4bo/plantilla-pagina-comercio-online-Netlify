import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-success py-5 text-white text-center mb-5">
      <Container>
         <h1 className="display-4 fw-bold">Del Huerto a tu Hogar</h1>
         <p className="lead mb-4">Frutas, verduras y productos orgánicos frescos.</p>
         <Link to="/productos">
            <Button variant="warning" size="lg" className="fw-bold text-dark">Ver Catálogo</Button>
         </Link>
      </Container>
    </section>
  );
};
export default HeroSection;