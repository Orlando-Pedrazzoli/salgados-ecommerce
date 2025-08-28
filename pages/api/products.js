// 11. PAGES/API/PRODUCTS.JS
// ==========================================
import dbConnect from '../../lib/mongodb';
import Product from '../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find({ active: true });
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
