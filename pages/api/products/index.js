// pages/api/products/index.js - ARQUIVO PRINCIPAL PARA PRODUCTS
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        // Buscar apenas produtos ativos por padrão
        const { all } = req.query;
        const filter = all === 'true' ? {} : { active: true };

        const products = await Product.find(filter).sort({ createdAt: -1 });
        return res.status(200).json(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return res.status(500).json({ error: 'Erro ao buscar produtos' });
      }

    case 'POST':
      try {
        // Validar dados obrigatórios
        const { name, price, category } = req.body;

        if (!name || !price || !category) {
          return res.status(400).json({
            error: 'Nome, preço e categoria são obrigatórios',
          });
        }

        // Validar preço
        const priceNum = Number(price);
        if (isNaN(priceNum) || priceNum < 0) {
          return res.status(400).json({
            error: 'Preço inválido',
          });
        }

        // Validar categoria
        if (!['pacotes', 'kits'].includes(category)) {
          return res.status(400).json({
            error: 'Categoria deve ser "pacotes" ou "kits"',
          });
        }

        // Preparar dados do produto
        const productData = {
          name: name.trim(),
          description: req.body.description || '',
          price: priceNum,
          category,
          type: req.body.type || '',
          image: req.body.image || null,
          rating: Number(req.body.rating) || 4.5,
          reviews: Number(req.body.reviews) || 0,
          active: req.body.active !== false, // true por padrão
        };

        console.log('Criando produto:', productData.name);

        const product = await Product.create(productData);

        console.log('Produto criado com sucesso:', product._id);

        return res.status(201).json(product);
      } catch (error) {
        console.error('Erro ao criar produto:', error);

        if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map(err => err.message);
          return res.status(400).json({
            error: 'Erro de validação',
            details: errors,
          });
        }

        return res.status(500).json({
          error: 'Erro ao criar produto',
          message:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}
