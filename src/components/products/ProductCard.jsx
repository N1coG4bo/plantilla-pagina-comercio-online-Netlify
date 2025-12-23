import React, { useContext } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { code, nombre, precio, unidad, stock, img } = product;
  const { addToCart } = useContext(CartContext);
  const sinStock = stock <= 0;

  const formatPrecio = (val) => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP' 
    }).format(val);
  };

  return (
    // YA NO HAY UN DIV CON CLASE COLUMNA AQUI
    <Card className="h-100 shadow-sm border-0 product-card">
      
      {/* Contenedor de imagen estático con bordes superiores redondeados */}
      <div 
        className="rounded-top" 
        style={{ position: 'relative', height: '200px', overflow: 'hidden' }}
      >
        <motion.img 
          src={`/${img}`} 
          alt={nombre} 
          className="card-img-top"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          whileHover={{ scale: 1.1 }} // Zoom solo a la foto
          transition={{ duration: 0.3 }}
        />

        {sinStock && (
          <Badge 
            bg="danger" 
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
          >
            Agotado
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
           <Badge bg="light" text="dark" className="border">{code}</Badge>
           {!sinStock && <small className="text-muted">Stock: {stock}</small>}
        </div>

        <Card.Title className="h5 fw-bold text-success mb-1">{nombre}</Card.Title>
        <Card.Text className="text-muted small mb-3">Venta por {unidad}</Card.Text>
        
        <div className="mt-auto mb-3">
           <h4 className="fw-bold mb-0">{formatPrecio(precio)}</h4>
        </div>

        <div className="d-grid gap-2">
          <Link to={`/producto/${code}`} className="btn btn-outline-success">
            Ver Detalle
          </Link>
          
          <motion.button 
            className="btn btn-success d-flex align-items-center justify-content-center gap-2"
            disabled={sinStock}
            onClick={() => addToCart(product)}
            whileTap={{ scale: 0.95 }}
          >
            <span>Añadir al Carrito</span>
            <span>🛒</span>
          </motion.button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;