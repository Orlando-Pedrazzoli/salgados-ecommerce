// 17. PAGES/INDEX.JS (PÁGINA PRINCIPAL)
// ==========================================
import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Package,
  Star,
  Gift,
  Percent,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

// Context do Carrinho (simplificado)
let cartState = {
  items: [],
  isOpen: false,
  coupon: null,
};

// Componente de Notificação
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className='w-5 h-5' />
      ) : (
        <AlertCircle className='w-5 h-5' />
      )}
      <span>{message}</span>
      <button onClick={onClose}>
        <X className='w-4 h-4' />
      </button>
    </div>
  );
};

// Componente do Header
const Header = ({ cartItems, setCartOpen }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className='bg-white shadow-md sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex justify-between items-center'>
        <div className='flex items-center'>
          <Package className='w-8 h-8 text-amber-500 mr-2' />
          <h1 className='text-xl font-bold'>Salgados Premium</h1>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className='relative p-2 text-gray-700 hover:text-amber-500'
        >
          <ShoppingCart className='w-6 h-6' />
          {totalItems > 0 && (
            <span className='absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

// Componente do Card de Produto
const ProductCard = ({ product, onAddToCart }) => {
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

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
      <div className='h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center'>
        <Package className='w-16 h-16 text-amber-500' />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-bold'>{product.name}</h3>
        {product.type && (
          <p className='text-sm text-gray-600'>{product.type}</p>
        )}
        <div className='flex items-center gap-2 mb-2'>
          <div className='flex'>{renderStars(product.rating)}</div>
          <span className='text-sm text-gray-600'>({product.reviews})</span>
        </div>
        {product.description && (
          <p className='text-sm text-gray-600 mb-3'>
            {product.description.slice(0, 100)}...
          </p>
        )}
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold text-amber-600'>
            €{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className='bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 flex items-center gap-2'
          >
            <Plus className='w-4 h-4' />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente do Carrinho
const Cart = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [notification, setNotification] = useState(null);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
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
      PRIMEIRA10: { discount: 10, description: '10% primeira compra' },
      FESTAS15: { discount: 15, description: '15% para festas' },
      AMIGO5: { discount: 5, description: '5% para amigos' },
    };

    if (coupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        ...coupons[couponCode.toUpperCase()],
      });
      setNotification({ message: 'Cupom aplicado!', type: 'success' });
      setCouponCode('');
    } else {
      setNotification({ message: 'Cupom inválido!', type: 'error' });
    }
  };

  const handleCheckout = async () => {
    if (
      !customerData.name ||
      !customerData.phone ||
      !customerData.email ||
      !customerData.address
    ) {
      setNotification({
        message: 'Preencha todos os campos obrigatórios',
        type: 'error',
      });
      return;
    }

    const orderData = {
      ...customerData,
      items: cartItems,
      subtotal: getSubtotal(),
      discount: getDiscount(),
      total: getTotal(),
      couponCode: appliedCoupon?.code,
      paymentMethod,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();

        // Enviar WhatsApp
        const message =
          `🍴 NOVO PEDIDO - ${order.orderNumber}\n\n` +
          `👤 ${orderData.name}\n📱 ${orderData.phone}\n📧 ${orderData.email}\n` +
          `📍 ${orderData.address}\n\n` +
          `🛍️ ITENS:\n${cartItems
            .map(
              item =>
                `• ${item.quantity}x ${item.name} - €${(
                  item.price * item.quantity
                ).toFixed(2)}`
            )
            .join('\n')}\n\n` +
          `💰 Total: €${getTotal().toFixed(2)}\n💳 ${
            paymentMethod === 'cash'
              ? 'Dinheiro'
              : paymentMethod === 'mbway'
              ? 'MBWay'
              : 'Multibanco'
          }`;

        window.open(
          `https://wa.me/351912345678?text=${encodeURIComponent(message)}`,
          '_blank'
        );

        setNotification({
          message: `Pedido ${order.orderNumber} enviado!`,
          type: 'success',
        });
        setCartItems([]);
        setShowCheckout(false);
        onClose();
      }
    } catch (error) {
      setNotification({ message: 'Erro ao enviar pedido', type: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end'>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className='bg-white w-full max-w-md h-full overflow-y-auto'>
        <div className='p-4 border-b flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Carrinho</h2>
          <button onClick={onClose}>
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='p-4'>
          {cartItems.length === 0 ? (
            <p className='text-center text-gray-500'>Carrinho vazio</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className='flex justify-between items-center border-b py-3'
                >
                  <div className='flex-1'>
                    <h3 className='font-medium'>{item.name}</h3>
                    {item.type && (
                      <p className='text-sm text-gray-600'>{item.type}</p>
                    )}
                    <p className='text-amber-600 font-bold'>
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'
                    >
                      <Minus className='w-4 h-4' />
                    </button>
                    <span className='w-8 text-center'>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center'
                    >
                      <Plus className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              ))}

              {/* Cupom */}
              <div className='border-t pt-4 mt-4'>
                {appliedCoupon ? (
                  <div className='bg-green-50 p-3 rounded-lg flex justify-between items-center'>
                    <div>
                      <p className='text-green-800 font-medium flex items-center gap-2'>
                        <Gift className='w-4 h-4' />
                        {appliedCoupon.code}
                      </p>
                      <p className='text-green-600 text-sm'>
                        {appliedCoupon.description}
                      </p>
                    </div>
                    <button onClick={() => setAppliedCoupon(null)}>
                      <X className='w-4 h-4 text-red-500' />
                    </button>
                  </div>
                ) : (
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      placeholder='Código do cupom'
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className='flex-1 px-3 py-2 border rounded-lg'
                    />
                    <button
                      onClick={applyCoupon}
                      className='bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 flex items-center gap-2'
                    >
                      <Percent className='w-4 h-4' />
                      Aplicar
                    </button>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className='mt-4 pt-4 border-t space-y-2'>
                <div className='flex justify-between'>
                  <span>Subtotal:</span>
                  <span>€{getSubtotal().toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className='flex justify-between text-green-600'>
                    <span>Desconto ({appliedCoupon.code}):</span>
                    <span>-€{getDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className='flex justify-between text-xl font-bold border-t pt-2'>
                  <span>Total:</span>
                  <span className='text-amber-600'>
                    €{getTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className='w-full mt-4 bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600'
                >
                  Finalizar Pedido
                </button>
              </div>
            </>
          )}
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto'>
              <h3 className='text-xl font-bold mb-4'>Finalizar Pedido</h3>
              <div className='space-y-4'>
                <input
                  type='text'
                  placeholder='Nome completo *'
                  value={customerData.name}
                  onChange={e =>
                    setCustomerData({ ...customerData, name: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg'
                />
                <input
                  type='tel'
                  placeholder='Telefone *'
                  value={customerData.phone}
                  onChange={e =>
                    setCustomerData({ ...customerData, phone: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg'
                />
                <input
                  type='email'
                  placeholder='Email *'
                  value={customerData.email}
                  onChange={e =>
                    setCustomerData({ ...customerData, email: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg'
                />
                <textarea
                  placeholder='Endereço de entrega *'
                  value={customerData.address}
                  onChange={e =>
                    setCustomerData({
                      ...customerData,
                      address: e.target.value,
                    })
                  }
                  className='w-full p-3 border rounded-lg h-20'
                />
                <input
                  type='date'
                  value={customerData.deliveryDate}
                  onChange={e =>
                    setCustomerData({
                      ...customerData,
                      deliveryDate: e.target.value,
                    })
                  }
                  className='w-full p-3 border rounded-lg'
                />
                <input
                  type='time'
                  value={customerData.deliveryTime}
                  onChange={e =>
                    setCustomerData({
                      ...customerData,
                      deliveryTime: e.target.value,
                    })
                  }
                  className='w-full p-3 border rounded-lg'
                />
                <textarea
                  placeholder='Observações'
                  value={customerData.notes}
                  onChange={e =>
                    setCustomerData({ ...customerData, notes: e.target.value })
                  }
                  className='w-full p-3 border rounded-lg h-16'
                />

                <div className='space-y-3'>
                  <p className='font-medium'>Pagamento:</p>
                  <label className='flex items-center gap-2'>
                    <input
                      type='radio'
                      name='payment'
                      value='cash'
                      checked={paymentMethod === 'cash'}
                      onChange={e => setPaymentMethod(e.target.value)}
                    />
                    <span>💵 Dinheiro na entrega</span>
                  </label>
                  <label className='flex items-center gap-2'>
                    <input
                      type='radio'
                      name='payment'
                      value='mbway'
                      checked={paymentMethod === 'mbway'}
                      onChange={e => setPaymentMethod(e.target.value)}
                    />
                    <span>📱 MBWay</span>
                  </label>
                  <label className='flex items-center gap-2'>
                    <input
                      type='radio'
                      name='payment'
                      value='multibanco'
                      checked={paymentMethod === 'multibanco'}
                      onChange={e => setPaymentMethod(e.target.value)}
                    />
                    <span>🏧 Multibanco</span>
                  </label>
                </div>

                <div className='bg-amber-50 p-3 rounded-lg'>
                  <p className='text-sm'>
                    <strong>Total: €{getTotal().toFixed(2)}</strong>
                  </p>
                </div>
              </div>

              <div className='flex gap-3 mt-6'>
                <button
                  onClick={() => setShowCheckout(false)}
                  className='flex-1 py-3 border border-gray-300 rounded-lg'
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCheckout}
                  className='flex-1 py-3 bg-amber-500 text-white rounded-lg font-bold'
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente Principal
export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('pacotes');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const addToCart = product => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product._id);
      if (existing) {
        return prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, id: product._id, quantity: 1 }];
    });
    setNotification({ message: 'Produto adicionado!', type: 'success' });
  };

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <div className='min-h-screen bg-gray-50'>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <Header cartItems={cartItems} setCartOpen={setCartOpen} />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* Hero */}
      <section className='bg-gradient-to-r from-amber-500 to-orange-500 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-6xl font-bold mb-6'>
            Salgados Artesanais
          </h2>
          <p className='text-xl md:text-2xl mb-8'>
            Os melhores salgados para seus eventos
          </p>
          <p className='text-lg opacity-90'>
            Coxinha, Rissol, Pastel de Bacalhau e muito mais!
          </p>
        </div>
      </section>

      {/* Cupons */}
      <section className='py-8 bg-gradient-to-r from-green-500 to-teal-500 text-white'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <h3 className='text-2xl font-bold mb-4'>🎉 Cupons Disponíveis!</h3>
          <div className='flex justify-center gap-4 flex-wrap'>
            <div className='bg-white bg-opacity-20 px-4 py-2 rounded-lg'>
              <strong>PRIMEIRA10</strong> - 10% primeira compra
            </div>
            <div className='bg-white bg-opacity-20 px-4 py-2 rounded-lg'>
              <strong>FESTAS15</strong> - 15% para festas
            </div>
            <div className='bg-white bg-opacity-20 px-4 py-2 rounded-lg'>
              <strong>AMIGO5</strong> - 5% para amigos
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex justify-center mb-8'>
          <div className='flex bg-white rounded-lg shadow-md overflow-hidden'>
            <button
              onClick={() => setActiveCategory('pacotes')}
              className={`px-6 py-3 font-medium ${
                activeCategory === 'pacotes'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pacotes Salgados
            </button>
            <button
              onClick={() => setActiveCategory('kits')}
              className={`px-6 py-3 font-medium ${
                activeCategory === 'kits'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Kits Doces e Salgados
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <div className='flex justify-center items-center mb-4'>
            <Package className='w-8 h-8 text-amber-500 mr-2' />
            <h3 className='text-xl font-bold'>Salgados Premium</h3>
          </div>
          <p className='text-gray-400'>
            Os melhores salgados artesanais para seus eventos
          </p>
          <div className='mt-4 flex justify-center gap-4'>
            <span>📱 WhatsApp: +351 912 345 678</span>
            <span>📧 contato@salgadospremium.pt</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
