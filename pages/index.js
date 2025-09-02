// pages/index.js - VERSÃO LIMPA E ORGANIZADA
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

// Layout Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Section Components
import HeroSection from '../components/sections/HeroSection';
import CouponsSection from '../components/sections/CouponsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import ProductsSection from '../components/sections/ProductsSection';
import CTASection from '../components/sections/CTASection';

// Cart Component
import Cart from '../components/cart/Cart';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar produtos e recuperar carrinho do localStorage
  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    saveCartToStorage();
  }, [cartItems]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Erro ao carregar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  };

  const saveCartToStorage = () => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  };

  const addToCart = product => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product._id);
      if (existing) {
        toast.success(`+1 ${product.name} adicionado!`);
        return prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} adicionado ao carrinho!`);
      return [...prev, { ...product, id: product._id, quantity: 1 }];
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      {/* Sistema de Notificações */}
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Header */}
      <Header cartItems={cartItems} setCartOpen={setCartOpen} />

      {/* Carrinho */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* Conteúdo Principal */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Cupons */}
        <CouponsSection />

        {/* Features */}
        <FeaturesSection />

        {/* Produtos */}
        <ProductsSection
          products={products}
          isLoading={isLoading}
          onAddToCart={addToCart}
        />

        {/* Call to Action */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
