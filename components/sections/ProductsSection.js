// components/sections/ProductsSection.js
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from '../products/ProductCard';

const ProductsSection = ({ products, isLoading, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('pacotes');

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <section id='produtos' className='max-w-7xl mx-auto px-4 py-12'>
      <h2 className='text-3xl font-bold text-center mb-8'>Nosso Cardápio</h2>

      <div className='flex justify-center mb-8'>
        <div className='inline-flex bg-gray-100 rounded-xl shadow-lg overflow-hidden'>
          <button
            onClick={() => setActiveCategory('pacotes')}
            className={`px-8 py-4 font-medium transition-all ${
              activeCategory === 'pacotes'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            🥟 Salgados
          </button>
          <button
            onClick={() => setActiveCategory('kits')}
            className={`px-8 py-4 font-medium transition-all ${
              activeCategory === 'kits'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎁 Kits Festa
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className='flex justify-center items-center py-12'>
          <Loader2 className='w-8 h-8 animate-spin text-amber-600' />
          <span className='ml-3 text-gray-600'>Carregando produtos...</span>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
