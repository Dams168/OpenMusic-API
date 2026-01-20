import authRepositories from '../repositories/auth-repositories.js';
import userRepositories from '../../users/repositories/user-repositories.js';
import { AuthenticationError, InvariantError } from '../../../exceptions/index.js';
import tokenManager from '../../../security/token-manager.js';
import response from '../../../utils/response.js';

export const login = async (req, res, next) => {
  const { username, password } = req.validated;

  const userId = await userRepositories.verifyUserCredential(username, password);

  if (!userId) {
    return next(new AuthenticationError('Kredensial yang Anda berikan salah'));
  }

  const accessToken = tokenManager.generateAccessToken({ userId });
  const refreshToken = tokenManager.generateRefreshToken({ userId });

  await authRepositories.addRefreshToken(refreshToken);

  return response(res, 201, 'Login berhasil', { accessToken, refreshToken });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result = await authRepositories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Refresh token tidak valid'));
  }

  const { id } = tokenManager.verifyRefreshToken(refreshToken);
  const accessToken = tokenManager.generateAccessToken({ id });
  return response(res, 200, 'Access token berhasil diperbarui', { accessToken });
};

export const logout = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result = await authRepositories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Refresh token tidak valid'));
  }

  await authRepositories.deleteRefreshToken(refreshToken);

  return response(res, 200, 'Logout berhasil');
};
