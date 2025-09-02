// pages/api/upload.js - VERSÃO CORRIGIDA
import cloudinary from '../../lib/cloudinary';
import formidable from 'formidable';
import fs from 'fs';

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

    // Usar formidable em vez de multer (melhor compatibilidade com Next.js)
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: ({ mimetype }) => {
        return mimetype && mimetype.includes('image');
      },
    });

    const [fields, files] = await form.parse(req);

    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    console.log('Arquivo recebido:', {
      originalFilename: file.originalFilename,
      mimetype: file.mimetype,
      size: file.size,
    });

    // Upload para Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'salgados-produtos',
      transformation: [
        { width: 800, height: 600, crop: 'fill', quality: 'auto' },
        { fetch_format: 'auto' },
      ],
      resource_type: 'image',
    });

    // Limpar arquivo temporário
    fs.unlinkSync(file.filepath);

    console.log('Upload success:', result.secure_url);

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

    if (error.message && error.message.includes('image')) {
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
