// components/layout/Header.js
import { Package, ShoppingCart, Shield } from 'lucide-react';

const Header = ({ cartItems, setCartOpen }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className='bg-gradient-to-r from-gray-900 via-gray-800 to-amber-600 shadow-lg sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 h-20 flex justify-between items-center text-white'>
        <div className='flex items-center'>
          <Package className='w-9 h-9 text-amber-400 mr-3' />
          <div>
            <h1 className='text-2xl font-bold tracking-wide'>
              Salgados Premium
            </h1>
            <p className='text-xs text-amber-200'>Sabor artesanal desde 2020</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <a
            href='/admin/login'
            className='hidden md:flex items-center gap-2 text-sm hover:text-amber-400 transition-colors'
          >
            <Shield className='w-4 h-4' />
            Área Admin
          </a>

          <button
            onClick={() => setCartOpen(true)}
            className='relative p-3 hover:text-amber-400 transition-colors'
          >
            <ShoppingCart className='w-7 h-7' />
            {totalItems > 0 && (
              <span className='absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-bounce'>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
