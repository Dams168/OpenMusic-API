import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import albumRepositories from '../../../repositories/album-repositories.js';
import response from '../../../utils/response.js';

export const createAlbum = async (req, res, next) => {
  const { name, year } = req.body;

  const album = await albumRepositories.createAlbum({ name, year });

  if (!album) {
    return next(new InvariantError('Album gagal ditambahkan'));
  }

  return response(res, 201, 'Album berhasil ditambahkan', { albumId: album.id });
};

export const getAlbumById = async (req, res, next) => {
  const { id } = req.params;

  const album = await albumRepositories.getAlbumById(id);

  if (!album) {
    return next(new NotFoundError('Album tidak ditemukan'));
  }

  return response(res, 200, 'Album berhasil ditemukan', { album: album });
};

export const updateAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const { name, year } = req.body;

  const album = await albumRepositories.updateAlbumById({ id, name, year });

  if (!album) {
    return next(new NotFoundError('Gagal memperbarui album. Id tidak ditemukan'));
  }

  return response(res, 200, 'Album berhasil diperbarui');
};

export const deleteAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const album = await albumRepositories.deleteAlbumById(id);
  if (!album) {
    return next(new NotFoundError('Gagal menghapus album. Id tidak ditemukan'));
  }
  return response(res, 200, 'Album berhasil dihapus');
};
