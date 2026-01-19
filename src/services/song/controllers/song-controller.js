import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import songRepositories from '../../../repositories/song-repositories.js';
import response from '../../../utils/response.js';

export const createSong = async (req, res, next) => {
  const { title, year, genre, performer, duration, albumId } = req.validated;
  const song = await songRepositories.createSong({
    title,
    year,
    genre,
    performer,
    duration,
    album_id: albumId,
  });

  if (!song) {
    return next(new InvariantError('Lagu gagal ditambahkan'));
  }

  return response(res, 201, 'Lagu berhasil ditambahkan', { songId: song.id });
};

export const getSongs = async (req, res, next) => {
  const songs = await songRepositories.getSongs();
  return response(res, 200, 'Lagu berhasil ditemukan', { songs });
};

export const getSongById = async (req, res, next) => {
  const { id } = req.params;
  const song = await songRepositories.getSongById(id);

  if (!song) {
    return next(new NotFoundError('Lagu tidak ditemukan'));
  }
  return response(res, 200, 'Lagu berhasil ditemukan', { song: song });
};

export const updateSongById = async (req, res, next) => {
  const { id } = req.params;
  const { title, year, genre, performer, duration, album_id } = req.validated;
  const song = await songRepositories.updateSongById({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    album_id,
  });

  if (!song) {
    return next(new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan'));
  }

  return response(res, 200, 'Lagu berhasil diperbarui');
};

export const deleteSongById = async (req, res, next) => {
  const { id } = req.params;
  const song = await songRepositories.deleteSongById(id);
  if (!song) {
    return next(new NotFoundError('Gagal menghapus lagu. Id tidak ditemukan'));
  }
  return response(res, 200, 'Lagu berhasil dihapus');
};
