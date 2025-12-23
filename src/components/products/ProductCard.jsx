import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap'; //
import { Link } from 'react-router-dom'; //
import { CartContext } from '../../context/CartContext'; //
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  // Desestructuramos las propiedades del producto para usarlas fácilmente
  const { code, nombre, precio, unidad, stock, img } = product;
  
  // Consumimos el contexto para usar la función de añadir al carrito
  const { addToCart } = useContext(CartContext);

  // Lógica simple para saber si hay stock
  const sinStock = stock <= 0;

  // Función auxiliar para formatear el precio a Pesos Chilenos
  const formatPrecio = (val) => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP' 
    }).format(val);
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <Card className="h-100 shadow-sm border-0 product-card">
        {/* Contenedor de la imagen animado con Motion */}
        <motion.div 
          style={{ position: 'relative', height: '200px', overflow: 'hidden' }}
          whileHover={{ scale: 1.05 }} // Zoom suave al pasar el mouse
          transition={{ duration: 0.3 }}
        >
          <Card.Img 
            variant="top" 
            src={`/${img}`} 
            alt={nombre} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          {/* Badge de "Agotado" sobre la imagen si no hay stock */}
          {sinStock && (
            <Badge 
              bg="danger" 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                zIndex: 1 
              }}
            >
              Agotado
            </Badge>
          )}
        </motion.div>

        <Card.Body className="d-flex flex-column">
          {/* Fila superior: Código del producto */}
          <div className="d-flex justify-content-between align-items-center mb-2">
             <Badge bg="light" text="dark" className="border">
               {code}
             </Badge>
             {!sinStock && (
               <small className="text-muted">Stock: {stock}</small>
             )}
          </div>

          {/* Nombre del producto */}
          <Card.Title className="h5 fw-bold text-success mb-1">
            {nombre}
          </Card.Title>
          
          {/* Unidad de medida */}
          <Card.Text className="text-muted small mb-3">
             Venta por {unidad}
          </Card.Text>
          
          {/* Precio (ocupa el espacio disponible para empujar los botones al fondo) */}
          <div className="mt-auto mb-3">
             <h4 className="fw-bold mb-0">{formatPrecio(precio)}</h4>
          </div>

          {/* Botones de acción */}
          <div className="d-grid gap-2">
            <Link to={`/producto/${code}`} className="btn btn-outline-success">
              Ver Detalle
            </Link>
            
            {/* Botón animado con Motion */}
            <motion.button 
              className="btn btn-success d-flex align-items-center justify-content-center gap-2"
              disabled={sinStock}
              onClick={() => addToCart(product)}
              whileTap={{ scale: 0.95 }} // Efecto de presión al hacer clic
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span>Añadir al Carrito</span>
              <span>🛒</span>
            </motion.button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;