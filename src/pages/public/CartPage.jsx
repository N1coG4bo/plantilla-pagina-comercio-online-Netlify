import React, { useContext } from 'react';
import { Container, Table, Button, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartPage = () => {
  // Traemos todo lo necesario del Contexto
  const { cart, decreaseQuantity, addToCart, removeFromCart, cartTotal } = useContext(CartContext);

  // Formateador de dinero
  const formatPrecio = (val) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val);

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2 className="mb-4">Tu carrito está vacío 😢</h2>
        <Link to="/productos">
          <Button variant="success" size="lg">Ir a comprar</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-success">Resumen de Compra</h2>
      
      <div className="table-responsive shadow-sm">
        <Table hover className="align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th className="text-center">Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.code}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <Image src={`/${item.img}`} rounded style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    <div>
                      <h6 className="mb-0">{item.nombre}</h6>
                      <small className="text-muted">Cód: {item.code}</small>
                    </div>
                  </div>
                </td>
                <td>{formatPrecio(item.precio)}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => decreaseQuantity(item.code)}
                    >
                      -
                    </Button>
                    <span className="fw-bold">{item.quantity}</span>
                    <Button 
                      variant="outline-success" 
                      size="sm" 
                      onClick={() => addToCart(item)} // Reusamos addToCart para sumar 1
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="fw-bold">
                  {formatPrecio(item.precio * item.quantity)}
                </td>
                <td className="text-end">
                  <Button 
                    variant="link" 
                    className="text-danger p-0" 
                    onClick={() => removeFromCart(item.code)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Resumen Final */}
      <div className="d-flex justify-content-end mt-4">
        <div className="card border-0 shadow-sm p-4 bg-light" style={{ minWidth: '300px' }}>
          <div className="d-flex justify-content-between mb-3">
            <span className="h5">Total:</span>
            <span className="h4 fw-bold text-success">{formatPrecio(cartTotal)}</span>
          </div>
          <Button variant="success" size="lg" className="w-100">
            Ir a Pagar
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CartPage;