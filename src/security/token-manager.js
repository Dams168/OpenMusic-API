import jwt from 'jsonwebtoken';
import { InvariantError } from '../exceptions/index.js';

const tokenManager = {
  generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1h' });
  },
  generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' });
  },
  verifyAccessToken(token) {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      return payload;
    } catch (error) {
      throw new InvariantError('Access token tidak valid');
    }
  },
  verifyRefreshToken(token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

export default tokenManager;
