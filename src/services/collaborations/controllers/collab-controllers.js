import playlistRepositories from '../../../repositories/playlist-repositories.js';
import { AuthorizationError, InvariantError, NotFoundError } from '../../../exceptions/index.js';
import collabRepositories from '../../../repositories/collab-repositories.js';
import response from '../../../utils/response.js';
import userRepositories from '../../users/repositories/user-repositories.js';

export const addCollaboration = async (req, res, next) => {
  const { userId: credentialId } = req.user;
  const { playlistId, userId } = req.validated;

  const user = await userRepositories.getUserById(userId);
  if (!user) {
    return next(new NotFoundError('Gagal menambahkan kolaborasi. User tidak ditemukan'));
  }

  const playlist = await playlistRepositories.getPlaylistById(playlistId);
  if (!playlist) {
    return next(new NotFoundError('Gagal menambahkan kolaborasi. Playlist tidak ditemukan'));
  }

  const isOwner = await playlistRepositories.verifyPlaylistOwner(playlistId, credentialId);
  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  const collab = await collabRepositories.addCollaboration(playlistId, userId);
  if (!collab) {
    return next(new InvariantError('Kolaborasi gagal ditambahkan'));
  }

  return response(res, 201, 'Kolaborasi berhasil ditambahkan', { collaborationId: collab });
};

export const deleteCollaboration = async (req, res, next) => {
  const { userId: credentialId } = req.user;
  const { playlistId, userId } = req.validated;

  const playlist = await playlistRepositories.getPlaylistById(playlistId);
  if (!playlist) {
    return next(new NotFoundError('Gagal menghapus kolaborasi. Playlist tidak ditemukan'));
  }

  const user = await userRepositories.getUserById(userId);
  if (!user) {
    return next(new NotFoundError('Gagal menghapus kolaborasi. User tidak ditemukan'));
  }

  const isOwner = await playlistRepositories.verifyPlaylistOwner(playlistId, credentialId);
  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  await collabRepositories.deleteCollaboration(playlistId, userId);

  return response(res, 200, 'Kolaborasi berhasil dihapus', null);
};
