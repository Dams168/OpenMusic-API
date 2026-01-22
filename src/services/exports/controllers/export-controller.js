import { AuthorizationError, NotFoundError } from '../../../exceptions/index.js';
import playlistRepositories from '../../../repositories/playlist-repositories.js';
import response from '../../../utils/response.js';
import exportService from '../producers/export-service.js';

export const exportSongs = async (req, res, next) => {
  const { targetEmail } = req.validated;
  const { playlistId } = req.params;
  const { userId } = req.user;

  const playlist = await playlistRepositories.getPlaylistById(playlistId);
  if (!playlist) {
    return next(new NotFoundError('Playlist tidak ditemukan'));
  }

  const isOwner = await playlistRepositories.verifyPlaylistOwner(playlistId, userId);
  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses playlist ini'));
  }

  const message = {
    playlistId,
    targetEmail,
  };

  await exportService.sendMessage('export:songs', JSON.stringify(message));

  return response(res, 201, 'Permintaan Anda dalam antrean untuk diproses');
};
