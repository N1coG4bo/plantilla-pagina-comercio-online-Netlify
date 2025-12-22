
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// --- PÁGINAS PÚBLICAS (Clientes) ---
import HomePage from '../pages/public/HomePage';
import CatalogPage from '../pages/public/CatalogPage';
import ProductDetailPage from '../pages/public/ProductDetailPage';
import CartPage from '../pages/public/CartPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
import BlogPage from '../pages/public/BlogPage';
import BlogDetailPage from '../pages/public/BlogDetailPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';

// --- PÁGINAS DE ADMINISTRACIÓN (Privadas) ---
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts'; // <--- Nueva importación
import AdminUsers from '../pages/admin/AdminUsers'; // <--- Nuevo

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* =========================================
            ZONA PÚBLICA (Cualquiera puede entrar)
           ========================================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<CatalogPage />} />
          <Route path="/producto/:code" element={<ProductDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />
          
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Route>

        {/* =========================================
            ZONA PRIVADA (Solo Admins)
           ========================================= */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard (Se ve al entrar a /admin) */}
          <Route index element={<AdminDashboard />} />
          
          {/* Gestión de Inventario */}
          <Route path="productos" element={<AdminProducts />} />
          
          {/* Gestión de Usuarios (Aún pendiente) */}
          <Route path="usuarios" element={<AdminUsers />} />        </Route>
        
        {/* =========================================
            RUTAS NO ENCONTRADAS (404)
           ========================================= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
};