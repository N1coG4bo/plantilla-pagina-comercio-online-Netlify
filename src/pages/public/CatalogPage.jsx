import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap'; // Asegúrate de importar Col
import { getProducts } from '../../services/productService';
import ProductCard from '../../components/products/ProductCard';

const CatalogPage = () => {
  // ... (Toda tu lógica de estados y useEffect se mantiene igual) ...
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ frutas: false, verduras: false, otros: false });

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  useEffect(() => {
    // ... (Tu lógica de filtrado existente) ...
    let result = products;
    if (searchTerm) result = result.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const activeCategories = [];
    if (filters.frutas) activeCategories.push('FR');
    if (filters.verduras) activeCategories.push('VR');
    if (filters.otros) activeCategories.push('PO', 'PL');

    if (activeCategories.length > 0) {
      result = result.filter(p => activeCategories.some(cat => p.code.startsWith(cat)));
    }
    setFilteredProducts(result);
  }, [searchTerm, filters, products]);

  const handleFilterChange = (e) => setFilters({...filters, [e.target.name]: e.target.checked});

  return (
    <Container className="my-5">
      <Row>
        {/* COLUMNA FILTROS (Sin cambios) */}
        <Col md={3} className="mb-4">
            {/* ... Contenido del sidebar ... */}
            <div className="p-3 bg-light rounded shadow-sm sticky-top" style={{ top: '90px' }}>
                <h5 className="fw-bold text-success mb-3">Filtrar Productos</h5>
                <Form.Group className="mb-4">
                  <Form.Label>Buscar</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>🔍</InputGroup.Text>
                    <Form.Control type="text" placeholder="Manzanas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                  </InputGroup>
                </Form.Group>
                <h6 className="fw-bold mb-2">Categorías</h6>
                <Form.Check type="checkbox" label="Frutas 🍎" name="frutas" checked={filters.frutas} onChange={handleFilterChange} className="mb-2"/>
                <Form.Check type="checkbox" label="Verduras 🥦" name="verduras" checked={filters.verduras} onChange={handleFilterChange} className="mb-2"/>
                <Form.Check type="checkbox" label="Almacén (Miel/Lácteos) 🍯" name="otros" checked={filters.otros} onChange={handleFilterChange}/>
            </div>
        </Col>

        {/* GRILLA DE PRODUCTOS (CAMBIO AQUÍ) */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-dark">Catálogo</h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h4>No encontramos productos que coincidan 😕</h4>
            </div>
          ) : (
            <Row>
              {filteredProducts.map((prod) => (
                // AHORA LA COLUMNA LA PONE LA PÁGINA, NO EL COMPONENTE
                <Col key={prod.code} xs={12} sm={6} lg={4} className="mb-4">
                   <ProductCard product={prod} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CatalogPage;