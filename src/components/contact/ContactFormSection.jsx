import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from '../forms/ContactForm'; // Asegúrate que la ruta al form sea correcta

const ContactFormSection = () => {
  return (
    <section className="my-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {/* Título y Texto Intro */}
            <div className="text-center mb-5">
              <h2 className="fw-bold text-success">Contáctanos</h2>
              <p className="text-muted">
                ¿Tienes dudas sobre tu pedido o quieres ser proveedor? Escríbenos.
              </p>
            </div>

            {/* El Formulario Funcional */}
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactFormSection;