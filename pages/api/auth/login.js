// 13. PAGES/API/AUTH/LOGIN.JS
// ==========================================
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { comparePassword, generateToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    await dbConnect();

    // Verificar se existe usuário admin no banco
    let user = await User.findOne({ email });

    // Se não existir, verificar credenciais do .env
    if (
      !user &&
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        token: generateToken({ email, role: 'admin' }),
        user: { email, role: 'admin', name: 'Admin' },
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
