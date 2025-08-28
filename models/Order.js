// 9. MODELS/ORDER.JS
// ==========================================
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    deliveryDate: String,
    deliveryTime: String,
    notes: String,
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        type: String,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    couponCode: String,
    paymentMethod: {
      type: String,
      enum: ['cash', 'mbway', 'multibanco'],
      default: 'cash',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
