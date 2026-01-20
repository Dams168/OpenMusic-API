import tokenManager from '../security/token-manager';
import response from '../utils/response';

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const user = await tokenManager.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_KEY);
      req.user = user;
      return next();
    } catch (error) {
      return response(res, 401, error.message, null);
    }
  }
  return response(res, 401, 'Unauthorized', null);
}

export default authenticateToken;
