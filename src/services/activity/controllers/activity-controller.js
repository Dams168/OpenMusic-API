import response from '../../../utils/response.js';
import { AuthorizationError, NotFoundError } from '../../../exceptions/index.js';
import activityRepositories from '../../../repositories/activity-repositories.js';
import playlistRepositories from '../../../repositories/playlist-repositories.js';

export const getActivityPlaylist = async (req, res, next) => {
  const { userId: owner } = req.user;
  const { playlistId } = req.params;

  const isPlaylistExist = await playlistRepositories.getPlaylistById(playlistId);
  if (!isPlaylistExist) {
    return next(new NotFoundError('Playlist tidak ditemukan'));
  }

  const isOwner = await playlistRepositories.verifyPlaylistAccess(playlistId, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError(
        'Gagal mendapatkan aktivitas. Playlist tidak ditemukan atau Anda bukan pemilik playlist',
      ),
    );
  }

  const activities = await activityRepositories.getActivitiesByPlaylistId(playlistId);
  return response(res, 200, 'Aktivitas playlist berhasil ditemukan', { playlistId, activities });
};
