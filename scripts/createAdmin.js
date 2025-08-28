// 15. SCRIPTS/CREATEADMIN.JS
// ==========================================
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    active: Boolean,
  },
  { timestamps: true }
);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('❌ Admin já existe!');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin123!', 12);

    await User.create({
      name: 'Administrador',
      email: 'admin@salgadospremium.pt',
      password: hashedPassword,
      role: 'admin',
      active: true,
    });

    console.log('✅ Admin criado com sucesso!');
    console.log('Email: admin@salgadospremium.pt');
    console.log('Senha: Admin123!');
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    process.exit();
  }
}

// Verificar se tem .env
require('dotenv').config({ path: '.env.local' });
createAdmin();
