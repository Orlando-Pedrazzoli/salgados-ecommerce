// components/cart/CheckoutModal.js
import { useState } from 'react';
import {
  X,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  getSubtotal,
  getDiscount,
  getTotal,
  onSuccess,
}) => {
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
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleSubmit = async e => {
    e.preventDefault();

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
        `https://wa.me/351912345678?text=${encodeURIComponent(message)}`,
        '_blank'
      );

      toast.success(`Pedido ${order.orderNumber} enviado com sucesso!`, {
        duration: 5000,
      });

      onSuccess();
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao enviar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative z-[10000]'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold flex items-center gap-2'>
            <CreditCard className='w-5 h-5 text-amber-600' />
            Finalizar Pedido
          </h3>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
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
              required
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
                  setCustomerData({ ...customerData, phone: e.target.value })
                }
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                required
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
                  setCustomerData({ ...customerData, email: e.target.value })
                }
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                required
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
                setCustomerData({ ...customerData, address: e.target.value })
              }
              className='w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
              required
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
                setCustomerData({ ...customerData, notes: e.target.value })
              }
              className='w-full p-3 border border-gray-300 rounded-lg h-16 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
            />
          </div>

          <div className='space-y-3'>
            <p className='font-medium text-gray-700'>Forma de Pagamento:</p>
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
            <p className='text-xs text-gray-600 mt-1'>* Campos obrigatórios</p>
          </div>

          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={isProcessing}
              className='flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
            >
              Voltar
            </button>
            <button
              type='submit'
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
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
