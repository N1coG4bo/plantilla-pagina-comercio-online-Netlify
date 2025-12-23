import React from 'react';
import HeroSection from '../../components/common/HeroSection';
import FeaturedProductsSection from '../../components/home/FeaturedProductsSection'; // O la ruta donde lo creaste

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
    </>
  );
};

export default HomePage;