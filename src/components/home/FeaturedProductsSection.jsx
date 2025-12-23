import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getProducts } from '../../services/productService'; // Ajusta la ruta según donde lo guardes
import ProductGrid from '../products/ProductGrid';

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lógica encapsulada: Esta sección "sabe" que debe mostrar solo los primeros 6
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProducts();
        // Validamos y cortamos a 6 productos aquí mismo
        setProducts(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (error) {
        console.error("Error cargando destacados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="my-5">
      <Container>
        <h2 className="text-center mb-4 fw-bold text-secondary">
          Productos Destacados
        </h2>
        
        {/* Reutilizamos el Grid tonto que ya creamos */}
        <ProductGrid products={products} loading={loading} />
      </Container>
    </section>
  );
};

export default FeaturedProductsSection;