// 8. MODELS/PRODUCT.JS
// ==========================================
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['pacotes', 'kits'],
      required: true,
    },
    type: String, // fritos, congelados
    image: String,
    rating: {
      type: Number,
      default: 4.5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
