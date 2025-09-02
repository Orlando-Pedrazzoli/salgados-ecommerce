// scripts/testConnection.js - Script para testar a conexão com MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testando conexão com MongoDB...\n');

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI não encontrada no .env.local');
    process.exit(1);
  }

  console.log(
    '📍 URI:',
    MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//<user>:<pass>@')
  );

  try {
    console.log('🔌 Conectando...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conexão estabelecida com sucesso!\n');

    // Testar operações básicas
    console.log('📊 Informações do banco:');
    const admin = mongoose.connection.db.admin();
    const info = await admin.serverStatus();
    console.log('- Host:', info.host);
    console.log('- Versão:', info.version);
    console.log('- Uptime:', Math.floor(info.uptime / 60), 'minutos\n');

    // Listar coleções
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log('📁 Coleções existentes:');
    if (collections.length === 0) {
      console.log('- Nenhuma coleção encontrada (banco vazio)');
    } else {
      collections.forEach(col => {
        console.log(`- ${col.name}`);
      });
    }

    // Criar um pedido de teste
    console.log('\n🧪 Criando pedido de teste...');

    const OrderSchema = new mongoose.Schema({
      orderNumber: String,
      customerName: String,
      customerEmail: String,
      customerPhone: String,
      address: String,
      items: Array,
      total: Number,
      status: String,
    });

    const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

    const testOrder = {
      orderNumber: 'TEST' + Date.now(),
      customerName: 'Teste Cliente',
      customerEmail: 'teste@example.com',
      customerPhone: '912345678',
      address: 'Rua Teste, 123',
      items: [
        {
          productId: 'test123',
          name: 'Produto Teste',
          price: 10,
          quantity: 1,
        },
      ],
      subtotal: 10,
      total: 10,
      status: 'pending',
    };

    const created = await Order.create(testOrder);
    console.log('✅ Pedido teste criado:', created.orderNumber);

    // Deletar pedido de teste
    await Order.deleteOne({ _id: created._id });
    console.log('🗑️ Pedido teste removido');

    console.log(
      '\n✅ Todos os testes passaram! MongoDB está funcionando corretamente.'
    );
  } catch (error) {
    console.error('\n❌ Erro na conexão:', error.message);
    console.error('\nDetalhes do erro:');
    console.error(error);

    if (error.message.includes('ECONNREFUSED')) {
      console.log(
        '\n💡 Sugestão: Verifique se o MongoDB Atlas está acessível e o IP está na whitelist.'
      );
    } else if (error.message.includes('authentication failed')) {
      console.log('\n💡 Sugestão: Verifique as credenciais no .env.local');
    }
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Conexão fechada');
    process.exit(0);
  }
}

testConnection();
