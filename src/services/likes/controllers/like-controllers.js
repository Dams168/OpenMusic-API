import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import userRepositories from '../../users/repositories/user-repositories.js';
import albumRepositories from '../../../repositories/album-repositories.js';
import likeRepositories from '../../../repositories/like-repositories.js';
import response from '../../../utils/response.js';

export const addLike = async (req, res, next) => {
  const { albumId } = req.params;
  const { userId } = req.user;

  const user = await userRepositories.getUserById(userId);
  if (!user) {
    return next(new NotFoundError('Gagal menambahkan like. User tidak ditemukan'));
  }

  const album = await albumRepositories.getAlbumById(albumId);
  if (album.length === 0) {
    return next(new NotFoundError('Gagal menambahkan like. Album tidak ditemukan'));
  }

  const isLiked = await likeRepositories.isAlbumLikedByUser(userId, albumId);
  if (isLiked) {
    return next(
      new InvariantError('Gagal menambahkan like. Album sudah pernah di-like oleh user ini'),
    );
  }
  await likeRepositories.addLike(userId, albumId);
  return response(res, 201, 'Like berhasil ditambahkan', null);
};

export const deleteLike = async (req, res, next) => {
  const { albumId } = req.params;
  const { userId } = req.user;

  const album = await albumRepositories.getAlbumById(albumId);
  if (album.length === 0) {
    return next(new NotFoundError('Gagal menghapus like. Album tidak ditemukan'));
  }

  await likeRepositories.removeLike(userId, albumId);
  return response(res, 200, 'Like berhasil dihapus', null);
};

export const getCountLikes = async (req, res, next) => {
  const { albumId } = req.params;
  const album = await albumRepositories.getAlbumById(albumId);
  if (album.length === 0) {
    return next(new NotFoundError('Gagal mendapatkan jumlah like. Album tidak ditemukan'));
  }
  const likeCount = await likeRepositories.getCountLikes(albumId);
  return response(res, 200, 'Jumlah like berhasil didapatkan', { likes: likeCount });
};
