import React from 'react';
import { Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard'; // Asegura la ruta correcta

// Mueve las variantes de animación aquí
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <motion.div 
      className="row"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((prod) => (
        <motion.div 
          key={prod.code} 
          variants={itemVariants}
          className="col-12 col-sm-6 col-lg-4 mb-4"
        >
          <ProductCard product={prod} />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default ProductGrid;