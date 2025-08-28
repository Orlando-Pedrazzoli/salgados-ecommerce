// 7. LIB/AUTH.JS
// ==========================================
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashPassword = async password => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = token => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
