import React, { useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import ProductCard from '../../components/products/ProductCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.slice(0, 6));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <section className="bg-success py-5 text-white text-center mb-5">
        <Container>
           {/* ... Banner content (puedes dejarlo como estaba o animarlo) ... */}
           <h1 className="display-4 fw-bold">Del Huerto a tu Hogar</h1>
           <p className="lead mb-4">Frutas, verduras y productos orgánicos frescos.</p>
           <Link to="/productos">
              <Button variant="warning" size="lg" className="fw-bold text-dark">Ver Catálogo</Button>
           </Link>
        </Container>
      </section>

      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold text-secondary">Productos Destacados</h2>
        
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : (
          <motion.div 
            className="row" // Bootstrap Row
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((prod) => (
              // ESTE DIV ES AHORA LA ÚNICA COLUMNA
              <motion.div 
                key={prod.code} 
                variants={itemVariants}
                className="col-12 col-sm-6 col-lg-4 mb-4" // Clases de grid aquí
              >
                <ProductCard product={prod} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default HomePage;