// 12. PAGES/API/ORDERS.JS
// ==========================================
import dbConnect from '../../lib/mongodb';
import Order from '../../models/Order';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
      }
      break;

    case 'POST':
      try {
        const orderNumber = 'PED' + Date.now().toString().slice(-6);
        const orderData = {
          ...req.body,
          orderNumber,
        };

        const order = await Order.create(orderData);
        res.status(201).json(order);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao criar pedido' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
