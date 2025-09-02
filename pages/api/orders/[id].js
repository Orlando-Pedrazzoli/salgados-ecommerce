// pages/api/orders/[id].js
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  switch (req.method) {
    case 'PUT':
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!order) {
          return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        res.status(200).json(order);
      } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ error: 'Erro ao atualizar pedido' });
      }
      break;

    case 'GET':
      try {
        const order = await Order.findById(id);

        if (!order) {
          return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        res.status(200).json(order);
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ error: 'Erro ao buscar pedido' });
      }
      break;

    case 'DELETE':
      try {
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
          return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        res.status(200).json({ message: 'Pedido excluído com sucesso' });
      } catch (error) {
        console.error('Erro ao excluir pedido:', error);
        res.status(500).json({ error: 'Erro ao excluir pedido' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
