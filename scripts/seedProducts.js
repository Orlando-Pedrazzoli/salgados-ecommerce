// 16. SCRIPTS/SEEDPRODUCTS.JS
// ==========================================
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    type: String,
    rating: Number,
    reviews: Number,
    active: Boolean,
  },
  { timestamps: true }
);

const products = [
  // Pacotes
  {
    name: '50 Unidades Miniatura',
    type: 'Congelados',
    price: 22.5,
    category: 'pacotes',
    rating: 4.8,
    reviews: 23,
  },
  {
    name: '50 Unidades Miniatura',
    type: 'Fritos',
    price: 25.0,
    category: 'pacotes',
    rating: 4.9,
    reviews: 45,
  },
  {
    name: '100 Unidades Miniatura',
    type: 'Congelados',
    price: 35.0,
    category: 'pacotes',
    rating: 4.7,
    reviews: 31,
  },
  {
    name: '100 Unidades Miniatura',
    type: 'Fritos',
    price: 40.0,
    category: 'pacotes',
    rating: 4.9,
    reviews: 67,
  },
  {
    name: '150 Unidades Miniatura',
    type: 'Congelados',
    price: 52.5,
    category: 'pacotes',
    rating: 4.8,
    reviews: 28,
  },
  {
    name: '150 Unidades Miniatura',
    type: 'Fritos',
    price: 60.0,
    category: 'pacotes',
    rating: 4.9,
    reviews: 52,
  },

  // Kits
  {
    name: 'Kit 1',
    price: 55.0,
    category: 'kits',
    rating: 4.7,
    reviews: 89,
    description:
      '50 Salgadinhos miniatura fritos, 20 Pães de queijo, 10 Brigadeiros MIX, 10 Beijinhos coco, 10 Pastéis de nata miniatura',
  },
  {
    name: 'Kit 2',
    price: 80.0,
    category: 'kits',
    rating: 4.8,
    reviews: 112,
    description:
      '100 Salgadinhos miniatura fritos, 50 Brigadeiros MIX, 30 Pães de queijo, Oferta de 01 Salame de chocolate',
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const Product =
      mongoose.models.Product || mongoose.model('Product', ProductSchema);

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('✅ Produtos criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    process.exit();
  }
}

require('dotenv').config({ path: '.env.local' });
seedProducts();
