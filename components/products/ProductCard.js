// components/products/ProductCard.js
import { useState } from 'react';
import { Plus, Star, ChefHat, Loader2 } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onAddToCart(product);
    setIsAdding(false);
  };

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
      <div className='h-48 relative overflow-hidden'>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        <div
          className={`w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center ${
            product.image ? 'hidden' : 'flex'
          }`}
        >
          <ChefHat className='w-16 h-16 text-amber-500' />
        </div>

        {product.rating >= 4.8 && (
          <div className='absolute top-2 right-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'>
            ⭐ Mais Vendido
          </div>
        )}

        {product.category === 'kits' && (
          <div className='absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'>
            🎁 KIT FESTA
          </div>
        )}

        {product.type === 'Fritos' && (
          <div className='absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium'>
            🔥 Pronto para Servir
          </div>
        )}
      </div>

      <div className='p-4'>
        <h3 className='text-lg font-bold text-gray-800 mb-1'>{product.name}</h3>
        {product.type && (
          <p className='text-sm text-gray-600 mb-2'>
            <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs'>
              {product.type === 'Fritos' ? '🍳' : '❄️'} {product.type}
            </span>
          </p>
        )}

        <div className='flex items-center gap-2 mb-2'>
          <div className='flex'>{renderStars(product.rating)}</div>
          <span className='text-sm text-gray-600'>
            ({product.reviews} avaliações)
          </span>
        </div>

        {product.description && (
          <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
            {product.description}
          </p>
        )}

        <div className='flex justify-between items-center pt-3 border-t'>
          <div>
            <span className='text-2xl font-bold text-amber-600'>
              €{product.price.toFixed(2)}
            </span>
            {product.type === 'Fritos' && (
              <p className='text-xs text-gray-500'>Entrega em 30min</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className='bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50'
          >
            {isAdding ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <Plus className='w-4 h-4' />
            )}
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
