import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ContactInfo = () => {
  return (
    <section className="mb-5">
      <Container>
        <Row className="text-center mt-5">
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">📍 Dirección</h5>
            <p className="text-muted">Av. Siempreviva 742, Santiago</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">📞 Teléfono</h5>
            <p className="text-muted">+56 9 1234 5678</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">✉️ Email</h5>
            <p className="text-muted">contacto@huertohogar.cl</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactInfo;