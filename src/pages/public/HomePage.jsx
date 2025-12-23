import React, { useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap'; //
import { Link } from 'react-router-dom'; //
import { getProducts } from '../../services/productService'; //
import ProductCard from '../../components/products/ProductCard'; //
import { motion } from 'framer-motion';

// Configuración de las animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 // Retraso entre la aparición de cada tarjeta
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Empieza 20px abajo y transparente
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.slice(0, 6)); // Mostramos solo 6 destacados
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* HERO SECTION (Banner Verde) */}
      <section className="bg-success py-5 text-white text-center mb-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="display-4 fw-bold">Del Huerto a tu Hogar</h1>
            <p className="lead mb-4">Frutas, verduras y productos orgánicos frescos de la mejor calidad.</p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/productos">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-warning btn-lg fw-bold text-dark"
                  >
                    Ver Catálogo
                  </motion.button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* LISTA DE PRODUCTOS */}
      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold text-secondary">Productos Destacados</h2>
        
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2 text-muted">Cargando frescura...</p>
          </div>
        ) : (
          /* Reemplazamos Row por motion.div con clase 'row' para animar el grupo */
          <motion.div 
            className="row"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((prod) => (
              /* Envolvemos cada tarjeta en un motion.div que actúa como la columna de Bootstrap */
              <motion.div 
                key={prod.code} 
                variants={itemVariants}
                className="col-12 col-sm-6 col-lg-4 mb-4" // Clases de grid movidas aquí
              >
                {/* Renderizamos la tarjeta sin sus clases de columna internas, 
                    ya que ahora el motion.div maneja el grid */}
                <div className="h-100"> 
                  <ProductCard product={prod} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default HomePage;