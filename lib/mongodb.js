// lib/mongodb.js - VERSÃO CORRIGIDA
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor defina a variável MONGODB_URI no arquivo .env.local'
  );
}

/**
 * Global é usado aqui para manter uma conexão em cache durante
 * hot reloads em desenvolvimento. Isso previne que conexões cresçam
 * exponencialmente durante o uso de API routes.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Se já existe uma conexão, retorna ela
  if (cached.conn) {
    console.log('Usando conexão MongoDB em cache');
    return cached.conn;
  }

  // Se não existe uma promise de conexão, cria uma
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Configurações recomendadas para MongoDB Atlas
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('Criando nova conexão MongoDB...');

    mongoose.set('strictQuery', true);

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(mongoose => {
        console.log('MongoDB conectado com sucesso');
        return mongoose;
      })
      .catch(error => {
        console.error('Erro ao conectar MongoDB:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Event listeners para debug
if (process.env.NODE_ENV === 'development') {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose conectado ao MongoDB');
  });

  mongoose.connection.on('error', err => {
    console.error('Erro na conexão Mongoose:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose desconectado');
  });
}

export default dbConnect;
