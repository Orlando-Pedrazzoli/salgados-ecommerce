// 14. PAGES/API/UPLOAD.JS
// ==========================================
import cloudinary from '../../lib/cloudinary';
import multer from 'multer';
import { promisify } from 'util';

const upload = multer({ storage: multer.memoryStorage() });
const uploadMiddleware = promisify(upload.single('image'));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await uploadMiddleware(req, res);

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Upload para Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'salgados',
            transformation: [{ width: 400, height: 400, crop: 'fill' }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(file.buffer);
    });

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no upload da imagem' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
