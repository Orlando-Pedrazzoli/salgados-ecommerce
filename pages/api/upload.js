// pages/api/upload.js - VERSÃO CORRIGIDA
import cloudinary from '../../lib/cloudinary';
import multer from 'multer';
import { promisify } from 'util';

// Configurar multer para memória
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos'), false);
    }
  },
});

const uploadMiddleware = promisify(upload.single('image'));

// Desabilitar o parser padrão do Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Iniciando upload...');

    // Processar upload com multer
    await uploadMiddleware(req, res);

    const file = req.file;
    if (!file) {
      console.log('Nenhum arquivo encontrado');
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    console.log('Arquivo recebido:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    // Upload para Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'salgados-produtos',
            transformation: [
              { width: 800, height: 600, crop: 'fill', quality: 'auto' },
              { fetch_format: 'auto' },
            ],
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              console.error('Erro Cloudinary:', error);
              reject(error);
            } else {
              console.log('Upload success:', result.secure_url);
              resolve(result);
            }
          }
        )
        .end(file.buffer);
    });

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error('Erro no upload:', error);

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ error: 'Arquivo muito grande. Máximo 5MB.' });
    }

    if (error.message === 'Apenas arquivos de imagem são permitidos') {
      return res
        .status(400)
        .json({ error: 'Apenas arquivos de imagem são permitidos' });
    }

    res.status(500).json({
      error: 'Erro interno no upload',
      details:
        process.env.NODE_ENV === 'development' ? error.message : 'Erro interno',
    });
  }
}
