import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import userRepositories from '../repositories/user-repositories';

export const createUser = async (req, res, next) => {
  const { username, password, fullname } = req.validated;
  const isUsernameExist = await userRepositories.verifyNewUsername(username);

  if (isUsernameExist) {
    return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan.'));
  }

  const user = await userRepositories.createUser({
    username,
    password,
    fullname,
  });

  if (!user) {
    return next(new InvariantError('Gagal menambahkan user.'));
  }

  return response(res, 201, 'User berhasil ditambahkan', { userId: user.id });
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await userRepositories.getUserById(id);

  if (!user) {
    return next(new NotFoundError('User tidak ditemukan.'));
  }

  return response(res, 200, 'User berhasil ditemukan', { user });
};
