import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Container, Image } from 'react-bootstrap';
import { getProducts } from '../../services/productService'; 

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  // Cargar productos al iniciar
  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  // Función simulada para eliminar
  const handleDelete = (code) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${code}?`)) {
      setProducts(products.filter(p => p.code !== code));
      alert('Producto eliminado (simulación local)');
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Inventario de Productos</h2>
        <Button variant="success">
          + Nuevo Producto
        </Button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <Table hover responsive className="mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">Producto</th>
                <th>Código</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.code}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      <Image 
                        src={`/${prod.img}`} 
                        rounded 
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                        className="me-3"
                      />
                      <span className="fw-bold">{prod.nombre}</span>
                    </div>
                  </td>
                  <td><Badge bg="secondary" className="fw-normal">{prod.code}</Badge></td>
                  <td>
                    {prod.code.startsWith('FR') && <Badge bg="success">Fruta</Badge>}
                    {prod.code.startsWith('VR') && <Badge bg="info">Verdura</Badge>}
                    {!prod.code.startsWith('FR') && !prod.code.startsWith('VR') && <Badge bg="warning" text="dark">Otro</Badge>}
                  </td>
                  <td>${prod.precio}</td>
                  <td>
                    {prod.stock > 20 ? (
                      <span className="text-success fw-bold">{prod.stock} u.</span>
                    ) : (
                      <span className="text-danger fw-bold">{prod.stock} u. (Bajo)</span>
                    )}
                  </td>
                  <td className="text-end pe-4">
                    <Button variant="link" className="text-primary p-0 me-3">✏️</Button>
                    <Button 
                      variant="link" 
                      className="text-danger p-0"
                      onClick={() => handleDelete(prod.code)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default AdminProducts;