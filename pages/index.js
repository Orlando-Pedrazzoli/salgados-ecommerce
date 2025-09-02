// pages/index.js - VERSÃO PROFISSIONAL CORRIGIDA
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
  Image as ImageIcon,
  Clock,
  Truck,
  Shield,
  ChefHat,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  CreditCard,
  Smartphone,
  Building,
  Loader2,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Componente do Header
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

// Card de Produto Melhorado
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

// Carrinho Melhorado
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
  const [isProcessing, setIsProcessing] = useState(false);

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

  const validateForm = () => {
    const errors = [];

    if (!customerData.name.trim()) errors.push('Nome é obrigatório');
    if (!customerData.phone.trim()) errors.push('Telefone é obrigatório');
    if (!customerData.email.trim()) errors.push('Email é obrigatório');
    if (!customerData.email.includes('@')) errors.push('Email inválido');
    if (!customerData.address.trim()) errors.push('Endereço é obrigatório');

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    const orderData = {
      customerName: customerData.name.trim(),
      customerPhone: customerData.phone.trim(),
      customerEmail: customerData.email.trim(),
      address: customerData.address.trim(),
      deliveryDate: customerData.deliveryDate || null,
      deliveryTime: customerData.deliveryTime || null,
      notes: customerData.notes || '',
      items: cartItems.map(item => ({
        productId: item.id || item._id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        type: item.type || '',
      })),
      subtotal: parseFloat(getSubtotal().toFixed(2)),
      discount: parseFloat(getDiscount().toFixed(2)),
      total: parseFloat(getTotal().toFixed(2)),
      couponCode: appliedCoupon?.code || null,
      paymentMethod: paymentMethod || 'cash',
    };

    console.log('Enviando pedido:', orderData);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Erro na resposta:', responseData);
        throw new Error(responseData.error || 'Erro ao processar pedido');
      }

      const order = responseData;

      console.log('Pedido criado com sucesso:', order);

      // Mensagem formatada para WhatsApp
      const message = `
🍴 *NOVO PEDIDO - ${order.orderNumber}*

👤 *Cliente:* ${orderData.customerName}
📱 *Telefone:* ${orderData.customerPhone}
📧 *Email:* ${orderData.customerEmail}
📍 *Endereço:* ${orderData.address}
${
  orderData.deliveryDate
    ? `📅 *Data Entrega:* ${new Date(orderData.deliveryDate).toLocaleDateString(
        'pt-PT'
      )}`
    : ''
}
${orderData.deliveryTime ? `⏰ *Hora Entrega:* ${orderData.deliveryTime}` : ''}

🛍️ *ITENS DO PEDIDO:*
${cartItems
  .map(
    item =>
      `• ${item.quantity}x ${item.name} ${
        item.type ? `(${item.type})` : ''
      } - €${(item.price * item.quantity).toFixed(2)}`
  )
  .join('\n')}

💰 *Subtotal:* €${getSubtotal().toFixed(2)}
${
  appliedCoupon
    ? `🎟️ *Desconto (${appliedCoupon.code}):* -€${getDiscount().toFixed(2)}`
    : ''
}
💳 *Total:* €${getTotal().toFixed(2)}

💳 *Forma de Pagamento:* ${
        paymentMethod === 'cash'
          ? '💵 Dinheiro'
          : paymentMethod === 'mbway'
          ? '📱 MBWay'
          : '🏧 Multibanco'
      }
${orderData.notes ? `\n📝 *Observações:* ${orderData.notes}` : ''}
      `.trim();

      // Abrir WhatsApp com mensagem
      window.open(
        `https://wa.me/351912164220?text=${encodeURIComponent(message)}`,
        '_blank'
      );

      toast.success(`Pedido ${order.orderNumber} enviado com sucesso!`, {
        duration: 5000,
      });

      // Limpar carrinho e fechar
      setCartItems([]);
      setShowCheckout(false);
      setAppliedCoupon(null);
      setCustomerData({
        name: '',
        phone: '',
        email: '',
        address: '',
        deliveryDate: '',
        deliveryTime: '',
        notes: '',
      });
      onClose();
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao enviar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
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
                      <h3 className='font-medium text-gray-800'>{item.name}</h3>
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

        {/* Modal de Checkout */}
        {showCheckout && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl'>
              <h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
                <CreditCard className='w-5 h-5 text-amber-600' />
                Finalizar Pedido
              </h3>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Nome Completo *
                  </label>
                  <input
                    type='text'
                    placeholder='João Silva'
                    value={customerData.name}
                    onChange={e =>
                      setCustomerData({ ...customerData, name: e.target.value })
                    }
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Telefone *
                    </label>
                    <input
                      type='tel'
                      placeholder='912 345 678'
                      value={customerData.phone}
                      onChange={e =>
                        setCustomerData({
                          ...customerData,
                          phone: e.target.value,
                        })
                      }
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Email *
                    </label>
                    <input
                      type='email'
                      placeholder='email@exemplo.pt'
                      value={customerData.email}
                      onChange={e =>
                        setCustomerData({
                          ...customerData,
                          email: e.target.value,
                        })
                      }
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Endereço de Entrega *
                  </label>
                  <textarea
                    placeholder='Rua, número, código postal, cidade'
                    value={customerData.address}
                    onChange={e =>
                      setCustomerData({
                        ...customerData,
                        address: e.target.value,
                      })
                    }
                    className='w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Data de Entrega
                    </label>
                    <input
                      type='date'
                      value={customerData.deliveryDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e =>
                        setCustomerData({
                          ...customerData,
                          deliveryDate: e.target.value,
                        })
                      }
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Hora de Entrega
                    </label>
                    <input
                      type='time'
                      value={customerData.deliveryTime}
                      onChange={e =>
                        setCustomerData({
                          ...customerData,
                          deliveryTime: e.target.value,
                        })
                      }
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Observações
                  </label>
                  <textarea
                    placeholder='Instruções especiais, referências...'
                    value={customerData.notes}
                    onChange={e =>
                      setCustomerData({
                        ...customerData,
                        notes: e.target.value,
                      })
                    }
                    className='w-full p-3 border border-gray-300 rounded-lg h-16 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </div>

                <div className='space-y-3'>
                  <p className='font-medium text-gray-700'>
                    Forma de Pagamento:
                  </p>
                  <div className='space-y-2'>
                    <label className='flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50'>
                      <input
                        type='radio'
                        name='payment'
                        value='cash'
                        checked={paymentMethod === 'cash'}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className='text-amber-600 focus:ring-amber-500'
                      />
                      <CreditCard className='w-5 h-5 text-gray-600' />
                      <span>Dinheiro na entrega</span>
                    </label>

                    <label className='flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50'>
                      <input
                        type='radio'
                        name='payment'
                        value='mbway'
                        checked={paymentMethod === 'mbway'}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className='text-amber-600 focus:ring-amber-500'
                      />
                      <Smartphone className='w-5 h-5 text-gray-600' />
                      <span>MBWay</span>
                    </label>

                    <label className='flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50'>
                      <input
                        type='radio'
                        name='payment'
                        value='multibanco'
                        checked={paymentMethod === 'multibanco'}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className='text-amber-600 focus:ring-amber-500'
                      />
                      <Building className='w-5 h-5 text-gray-600' />
                      <span>Multibanco</span>
                    </label>
                  </div>
                </div>

                <div className='bg-amber-50 p-4 rounded-lg'>
                  <p className='text-sm text-gray-700'>
                    <strong className='text-lg'>
                      Total a Pagar: €{getTotal().toFixed(2)}
                    </strong>
                  </p>
                  <p className='text-xs text-gray-600 mt-1'>
                    * Campos obrigatórios
                  </p>
                </div>
              </div>

              <div className='flex gap-3 mt-6'>
                <button
                  onClick={() => setShowCheckout(false)}
                  disabled={isProcessing}
                  className='flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
                >
                  Voltar
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className='flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2'
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className='w-4 h-4' />
                      Confirmar Pedido
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Seção de Features
const FeaturesSection = () => {
  const features = [
    {
      icon: <ChefHat className='w-8 h-8' />,
      title: 'Artesanal',
      description: 'Feito com carinho e receitas tradicionais',
    },
    {
      icon: <Truck className='w-8 h-8' />,
      title: 'Entrega Rápida',
      description: 'Produtos fritos em até 30 minutos',
    },
    {
      icon: <Shield className='w-8 h-8' />,
      title: 'Qualidade Garantida',
      description: 'Ingredientes selecionados e frescos',
    },
    {
      icon: <Clock className='w-8 h-8' />,
      title: 'Horário Flexível',
      description: 'Agende seu pedido para o melhor horário',
    },
  ];

  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-8'>
          Por que escolher a Salgados Premium?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='text-center'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4'>
                {feature.icon}
              </div>
              <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
              <p className='text-gray-600 text-sm'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente Principal
export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('pacotes');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    // Recuperar carrinho do localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Salvar carrinho no localStorage sempre que mudar
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
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

      <Header cartItems={cartItems} setCartOpen={setCartOpen} />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* Hero Section Melhorado */}
      <section className='relative text-white py-24 md:py-32 min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-500'></div>

        <div className='absolute inset-0 opacity-20'>
          <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] bg-repeat'></div>
        </div>

        <div className='relative max-w-7xl mx-auto px-4 text-center'>
          <div className='animate-bounce mb-6'>
            <ChefHat className='w-20 h-20 mx-auto text-white/90' />
          </div>
          <h2 className='text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg'>
            Salgados Artesanais Premium
          </h2>
          <p className='text-xl md:text-2xl mb-4 drop-shadow-md max-w-2xl mx-auto'>
            Os melhores salgados para seus eventos especiais
          </p>
          <p className='text-lg opacity-90 drop-shadow-md mb-8'>
            🥟 Coxinha • 🥐 Rissol • 🐟 Pastel de Bacalhau • 🧀 Pão de Queijo
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={() => {
                document
                  .getElementById('produtos')
                  .scrollIntoView({ behavior: 'smooth' });
              }}
              className='bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg'
            >
              Ver Cardápio
            </button>
            <a
              href='https://wa.me/351912345678'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2'
            >
              <MessageCircle className='w-5 h-5' />
              Fale Conosco
            </a>
          </div>
        </div>
      </section>

      {/* Seção de Cupons Melhorada */}
      <section className='py-8 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-inner'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <Gift className='w-8 h-8' />
            <h3 className='text-2xl font-bold'>Ofertas Especiais</h3>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto'>
            <div className='bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-bold text-lg'>PRIMEIRA10</p>
                  <p className='text-sm opacity-90'>10% na 1ª compra</p>
                </div>
                <span className='text-2xl'>🎁</span>
              </div>
            </div>
            <div className='bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-bold text-lg'>FESTAS15</p>
                  <p className='text-sm opacity-90'>15% para festas</p>
                </div>
                <span className='text-2xl'>🎉</span>
              </div>
            </div>
            <div className='bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-bold text-lg'>AMIGO5</p>
                  <p className='text-sm opacity-90'>5% indicação</p>
                </div>
                <span className='text-2xl'>👥</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Produtos */}
      <section id='produtos' className='max-w-7xl mx-auto px-4 py-12'>
        <h2 className='text-3xl font-bold text-center mb-8'>Nosso Cardápio</h2>

        <div className='flex justify-center mb-8'>
          <div className='inline-flex bg-white rounded-xl shadow-lg overflow-hidden'>
            <button
              onClick={() => setActiveCategory('pacotes')}
              className={`px-8 py-4 font-medium transition-all ${
                activeCategory === 'pacotes'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              🥟 Pacotes Salgados
            </button>
            <button
              onClick={() => setActiveCategory('kits')}
              className={`px-8 py-4 font-medium transition-all ${
                activeCategory === 'kits'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
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
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold mb-4'>Faça seu Pedido Agora!</h2>
          <p className='text-lg mb-8 opacity-90'>
            Entrega rápida para toda a região de Oeiras e Lisboa
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='https://wa.me/351912164220'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2'
            >
              <MessageCircle className='w-6 h-6' />
              Pedir pelo WhatsApp
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all shadow-lg'
            >
              Ver Cardápio Completo
            </button>
          </div>
        </div>
      </section>

      {/* Footer Melhorado */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <div className='flex items-center mb-4'>
                <Package className='w-8 h-8 text-amber-500 mr-2' />
                <h3 className='text-xl font-bold'>Salgados Premium</h3>
              </div>
              <p className='text-gray-400'>
                Os melhores salgados artesanais para seus eventos especiais.
                Qualidade e sabor garantidos desde 2020.
              </p>
            </div>

            <div>
              <h4 className='font-bold mb-4'>Contato</h4>
              <div className='space-y-2 text-gray-400'>
                <a
                  href='tel:+351912345678'
                  className='flex items-center gap-2 hover:text-amber-500 transition-colors'
                >
                  <Phone className='w-4 h-4' />
                  +351 912 345 678
                </a>
                <a
                  href='mailto:contato@salgadospremium.pt'
                  className='flex items-center gap-2 hover:text-amber-500 transition-colors'
                >
                  <Mail className='w-4 h-4' />
                  contato@salgadospremium.pt
                </a>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4' />
                  Oeiras, Lisboa
                </div>
              </div>
            </div>

            <div>
              <h4 className='font-bold mb-4'>Redes Sociais</h4>
              <div className='flex gap-4'>
                <a
                  href='#'
                  className='bg-gray-800 p-3 rounded-full hover:bg-amber-600 transition-colors'
                >
                  <Facebook className='w-5 h-5' />
                </a>
                <a
                  href='#'
                  className='bg-gray-800 p-3 rounded-full hover:bg-amber-600 transition-colors'
                >
                  <Instagram className='w-5 h-5' />
                </a>
                <a
                  href='https://wa.me/351912345678'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gray-800 p-3 rounded-full hover:bg-amber-600 transition-colors'
                >
                  <MessageCircle className='w-5 h-5' />
                </a>
              </div>
              <div className='mt-6'>
                <p className='text-sm text-gray-400'>Horário de Atendimento:</p>
                <p className='text-sm text-gray-400'>Seg-Sáb: 09h às 20h</p>
                <p className='text-sm text-gray-400'>Domingo: 10h às 18h</p>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
            <p>&copy; 2024 Salgados Premium. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
