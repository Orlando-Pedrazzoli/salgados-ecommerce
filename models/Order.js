// models/Order.js - VERSÃO CORRIGIDA
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: [true, 'Número do pedido é obrigatório'],
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Nome do cliente é obrigatório'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Email do cliente é obrigatório'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    customerPhone: {
      type: String,
      required: [true, 'Telefone do cliente é obrigatório'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Endereço de entrega é obrigatório'],
      trim: true,
    },
    deliveryDate: {
      type: String,
      default: null,
    },
    deliveryTime: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: '',
      maxlength: [500, 'Observações não podem exceder 500 caracteres'],
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Preço não pode ser negativo'],
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantidade mínima é 1'],
        },
        type: {
          type: String,
          default: '',
        },
      },
    ],
    subtotal: {
      type: Number,
      required: [true, 'Subtotal é obrigatório'],
      min: [0, 'Subtotal não pode ser negativo'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Desconto não pode ser negativo'],
    },
    total: {
      type: Number,
      required: [true, 'Total é obrigatório'],
      min: [0, 'Total não pode ser negativo'],
    },
    couponCode: {
      type: String,
      default: null,
      uppercase: true,
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['cash', 'mbway', 'multibanco'],
        message: 'Método de pagamento inválido',
      },
      default: 'cash',
    },
    status: {
      type: String,
      enum: {
        values: [
          'pending',
          'confirmed',
          'preparing',
          'ready',
          'delivered',
          'cancelled',
        ],
        message: 'Status inválido',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices para melhor performance
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ customerEmail: 1 });
OrderSchema.index({ customerPhone: 1 });

// Método virtual para verificar se o pedido está ativo
OrderSchema.virtual('isActive').get(function () {
  return this.status !== 'cancelled' && this.status !== 'delivered';
});

// Método para formatar o pedido para exibição
OrderSchema.methods.toDisplay = function () {
  return {
    ...this.toObject(),
    formattedDate: this.createdAt.toLocaleDateString('pt-PT'),
    formattedTime: this.createdAt.toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};

// Prevenir modificação do orderNumber após criação
OrderSchema.pre('save', function (next) {
  if (this.isModified('orderNumber') && !this.isNew) {
    return next(new Error('Número do pedido não pode ser alterado'));
  }
  next();
});

// Limpar o cache de modelos em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  delete mongoose.models.Order;
}

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
