// components/cart/Cart.js
import { useState } from 'react';
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Gift,
  Percent,
  Shield,
  Truck,
  ChefHat,
  Image as ImageIcon,
} from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import toast from 'react-hot-toast';

const Cart = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
      toast.success('Produto removido do carrinho');
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getDiscount = () =>
    appliedCoupon ? getSubtotal() * (appliedCoupon.discount / 100) : 0;

  const getTotal = () => getSubtotal() - getDiscount();

  const applyCoupon = () => {
    const coupons = {
      PRIMEIRA10: {
        discount: 10,
        description: '10% de desconto na primeira compra',
      },
      FESTAS15: { discount: 15, description: '15% de desconto para festas' },
      AMIGO5: {
        discount: 5,
        description: '5% de desconto indicação de amigos',
      },
    };

    if (coupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        ...coupons[couponCode.toUpperCase()],
      });
      toast.success('Cupom aplicado com sucesso!');
      setCouponCode('');
    } else {
      toast.error('Cupom inválido!');
    }
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setShowCheckout(false);
    setAppliedCoupon(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end'>
        <div className='bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl'>
          <div className='sticky top-0 bg-white p-4 border-b flex justify-between items-center shadow-sm'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
              <ShoppingCart className='w-5 h-5' />
              Carrinho de Compras
            </h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <div className='p-4'>
            {cartItems.length === 0 ? (
              <div className='text-center py-12'>
                <ShoppingCart className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <p className='text-gray-500'>Seu carrinho está vazio</p>
                <button
                  onClick={onClose}
                  className='mt-4 text-amber-600 hover:text-amber-700 font-medium'
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                <div className='space-y-3'>
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className='flex gap-3 p-3 bg-gray-50 rounded-lg'
                    >
                      <div className='w-20 h-20 flex-shrink-0'>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className='w-full h-full object-cover rounded-lg'
                          />
                        ) : (
                          <div className='w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center'>
                            <ChefHat className='w-8 h-8 text-amber-500' />
                          </div>
                        )}
                      </div>

                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-800'>
                          {item.name}
                        </h3>
                        {item.type && (
                          <p className='text-sm text-gray-600'>{item.type}</p>
                        )}
                        <p className='text-amber-600 font-bold'>
                          €{item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className='flex items-center gap-1'>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className='w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
                        >
                          <Minus className='w-4 h-4' />
                        </button>
                        <span className='w-10 text-center font-medium'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className='w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-colors'
                        >
                          <Plus className='w-4 h-4' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cupom de Desconto */}
                <div className='mt-6 p-4 bg-amber-50 rounded-lg'>
                  <h3 className='font-medium mb-3 flex items-center gap-2'>
                    <Gift className='w-4 h-4 text-amber-600' />
                    Cupom de Desconto
                  </h3>
                  {appliedCoupon ? (
                    <div className='bg-green-50 border border-green-200 p-3 rounded-lg flex justify-between items-center'>
                      <div>
                        <p className='text-green-800 font-medium'>
                          {appliedCoupon.code}
                        </p>
                        <p className='text-green-600 text-sm'>
                          {appliedCoupon.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        className='text-red-500 hover:text-red-600'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  ) : (
                    <div className='flex gap-2'>
                      <input
                        type='text'
                        placeholder='Digite o código'
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                      />
                      <button
                        onClick={applyCoupon}
                        className='bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2'
                      >
                        <Percent className='w-4 h-4' />
                        Aplicar
                      </button>
                    </div>
                  )}
                </div>

                {/* Resumo do Pedido */}
                <div className='mt-6 p-4 bg-gray-50 rounded-lg space-y-2'>
                  <div className='flex justify-between text-gray-600'>
                    <span>Subtotal:</span>
                    <span>€{getSubtotal().toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className='flex justify-between text-green-600'>
                      <span>Desconto ({appliedCoupon.discount}%):</span>
                      <span>-€{getDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className='flex justify-between text-xl font-bold border-t pt-2'>
                    <span>Total:</span>
                    <span className='text-amber-600'>
                      €{getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className='w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-lg font-bold shadow-lg transition-all'
                >
                  Finalizar Pedido
                </button>

                {/* Garantias */}
                <div className='mt-4 flex justify-around text-xs text-gray-600'>
                  <div className='flex items-center gap-1'>
                    <Shield className='w-4 h-4' />
                    Pagamento Seguro
                  </div>
                  <div className='flex items-center gap-1'>
                    <Truck className='w-4 h-4' />
                    Entrega Rápida
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Checkout */}
      {showCheckout && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          cartItems={cartItems}
          appliedCoupon={appliedCoupon}
          getSubtotal={getSubtotal}
          getDiscount={getDiscount}
          getTotal={getTotal}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </>
  );
};

export default Cart;
