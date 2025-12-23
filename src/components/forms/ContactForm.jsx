import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica real hacia el backend
    setShowSuccess(true);
    e.target.reset();
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.
        </Alert>
      )}

      <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control type="text" placeholder="Ej: Juan Pérez" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" placeholder="nombre@ejemplo.com" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Asunto</Form.Label>
            <Form.Select defaultValue="Consulta sobre pedido">
              <option>Consulta sobre pedido</option>
              <option>Quiero ser proveedor</option>
              <option>Reclamo o Sugerencia</option>
              <option>Otro</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí..." required />
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" size="lg" type="submit">
              Enviar Mensaje
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;