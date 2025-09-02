// pages/api/orders/index.js - ARQUIVO PRINCIPAL PARA ORDERS
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  // Log para debug em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${req.method} /api/orders`);
    if (req.body) {
      console.log('Body recebido:', JSON.stringify(req.body, null, 2));
    }
  }

  // Conectar ao banco
  try {
    await dbConnect();
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    return res.status(500).json({
      error: 'Erro de conexão com o banco de dados',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }

  switch (req.method) {
    case 'GET':
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.status(200).json(orders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return res.status(500).json({
          error: 'Erro ao buscar pedidos',
          details:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }

    case 'POST':
      try {
        // Validações
        const {
          customerName,
          customerEmail,
          customerPhone,
          address,
          items,
          subtotal,
          total,
        } = req.body;

        // Validar campos obrigatórios
        if (!customerName || !customerEmail || !customerPhone || !address) {
          return res.status(400).json({
            error:
              'Dados do cliente incompletos. Todos os campos são obrigatórios.',
          });
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
          return res.status(400).json({
            error: 'Email inválido',
          });
        }

        // Validar itens
        if (!items || !Array.isArray(items) || items.length === 0) {
          return res.status(400).json({
            error: 'Pedido deve conter pelo menos um item',
          });
        }

        // Validar valores numéricos
        const subtotalNum = Number(subtotal);
        const totalNum = Number(total);

        if (isNaN(subtotalNum) || subtotalNum < 0) {
          return res.status(400).json({
            error: 'Subtotal inválido',
          });
        }

        if (isNaN(totalNum) || totalNum < 0) {
          return res.status(400).json({
            error: 'Total inválido',
          });
        }

        // Gerar número único do pedido
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 100);
        const orderNumber = `PED${timestamp}${random}`.slice(-10);

        // Preparar dados do pedido
        const orderData = {
          orderNumber,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: customerPhone.trim(),
          address: address.trim(),
          deliveryDate: req.body.deliveryDate || null,
          deliveryTime: req.body.deliveryTime || null,
          notes: req.body.notes || '',
          items: items.map(item => ({
            productId: String(
              item.productId || item.id || `item_${Date.now()}`
            ),
            name: String(item.name || 'Produto sem nome'),
            price: Math.abs(Number(item.price) || 0),
            quantity: Math.abs(Math.floor(Number(item.quantity) || 1)),
            type: String(item.type || ''),
          })),
          subtotal: subtotalNum,
          discount: Math.abs(Number(req.body.discount) || 0),
          total: totalNum,
          couponCode: req.body.couponCode || null,
          paymentMethod: ['cash', 'mbway', 'multibanco'].includes(
            req.body.paymentMethod
          )
            ? req.body.paymentMethod
            : 'cash',
          status: 'pending',
        };

        console.log('Criando pedido:', orderNumber);

        // Criar o pedido
        const order = await Order.create(orderData);

        console.log('Pedido criado com sucesso:', order.orderNumber);

        return res.status(201).json(order);
      } catch (error) {
        console.error('Erro ao criar pedido:', error);

        // Erro de validação do Mongoose
        if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map(err => err.message);
          return res.status(400).json({
            error: 'Erro de validação',
            details: errors,
          });
        }

        // Erro de duplicação
        if (error.code === 11000) {
          return res.status(400).json({
            error:
              'Erro ao gerar número do pedido. Por favor, tente novamente.',
          });
        }

        // Erro genérico
        return res.status(500).json({
          error: 'Erro ao criar pedido',
          message:
            process.env.NODE_ENV === 'development'
              ? error.message
              : 'Erro interno do servidor',
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}
