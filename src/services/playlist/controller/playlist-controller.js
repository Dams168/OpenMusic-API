import { AuthorizationError, InvariantError, NotFoundError } from '../../../exceptions/index.js';
import playlistRepositories from '../../../repositories/playlist-repositories.js';
import songRepositories from '../../../repositories/song-repositories.js';
import response from '../../../utils/response.js';

export const createPlaylist = async (req, res, next) => {
  const { name } = req.validated;
  const { userId: owner } = req.user;
  //   console.log('USER:', req.user);

  const playlist = await playlistRepositories.createPlaylist({ name, owner });

  if (!playlist) {
    return next(new InvariantError('Gagal membuat playlist'));
  }
  return response(res, 201, 'Playlist berhasil dibuat', { playlistId: playlist.id });
};

export const getPlaylists = async (req, res, next) => {
  const { userId: owner } = req.user;
  const playlists = await playlistRepositories.getPlaylists(owner);
  return response(res, 200, 'Daftar playlist berhasil ditemukan', { playlists: playlists });
};

export const deletePlaylistById = async (req, res, next) => {
  const { userId: owner } = req.user;
  const { playlistId } = req.params;

  const isOwner = await playlistRepositories.verifyPlaylistOwner(playlistId, owner);

  if (!isOwner) {
    return next(
      new AuthorizationError(
        'Gagal menghapus playlist. Playlist tidak ditemukan atau Anda bukan pemilik playlist',
      ),
    );
  }

  const playlist = await playlistRepositories.deletePlaylistById(playlistId);
  if (!playlist) {
    return next(new NotFoundError('Gagal menghapus playlist. Playlist tidak ditemukan'));
  }

  return response(res, 200, 'Playlist berhasil dihapus');
};

export const addSongToPlaylist = async (req, res, next) => {
  const { userId: owner } = req.user;
  const { playlistId } = req.params;
  const { songId } = req.validated;

  //   const isPlaylistExist = await playlistRepositories.getPlaylistById(playlistId);
  //   if (!isPlaylistExist) {
  //     return next(new NotFoundError('Gagal menambahkan lagu ke playlist. Playlist tidak ditemukan'));
  //   }

  const isSongExist = await songRepositories.getSongById(songId);
  if (!isSongExist) {
    return next(new NotFoundError('Gagal menambahkan lagu ke playlist. Lagu tidak ditemukan'));
  }

  //   console.log('Playlist ID:', playlistId, 'Owner:', owner, 'Song ID:', songId);

  const isOwner = await playlistRepositories.verifyPlaylistOwner(playlistId, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError(
        'Gagal menambahkan lagu ke playlist. Playlist tidak ditemukan atau Anda bukan pemilik playlist',
      ),
    );
  }

  const playlistSong = await playlistRepositories.addSongToPlaylist(songId, playlistId);

  if (!playlistSong) {
    return next(new InvariantError('Gagal menambahkan lagu ke playlist'));
  }
  return response(res, 201, 'Lagu berhasil ditambahkan ke playlist', {
    playlistSongId: playlistSong.id,
  });
};

export const getSongsFromPlaylist = async (req, res, next) => {
  const { userId: owner } = req.user;
  const { playlistId } = req.params;

  const isPlaylistExist = await playlistRepositories.getPlaylistById(playlistId);
  if (!isPlaylistExist) {
    return next(new NotFoundError('Gagal mengambil lagu dari playlist. Playlist tidak ditemukan'));
  }

  const isOwner = await playlistRepositories.verifyPlaylistOwner(playlistId, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError(
        'Gagal mengambil lagu dari playlist. Playlist tidak ditemukan atau Anda bukan pemilik playlist',
      ),
    );
  }

  const songs = await playlistRepositories.getSongsFromPlaylist(playlistId);
  if (songs.length === 0) {
    return next(new NotFoundError('Gagal mengambil lagu dari playlist. Playlist tidak ditemukan'));
  }
  //   console.log('Songs from playlist:', songs);
  const playlist = {
    id: songs[0]?.playlist_id,
    name: songs[0]?.playlist_name,
    username: songs[0]?.username,
    songs: [],
  };
  songs.forEach((song) => {
    if (song.song_id) {
      playlist.songs.push({
        id: song.song_id,
        title: song.title,
        performer: song.performer,
      });
    }
  });

  return response(res, 200, 'Lagu dari playlist berhasil ditemukan', { playlist: playlist });
};

export const removeSongFromPlaylistById = async (req, res, next) => {
  const { userId: owner } = req.user;
  const { playlistId } = req.params;
  const { songId } = req.validated;

  const isOwner = await playlistRepositories.verifyPlaylistOwner(playlistId, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError(
        'Gagal menghapus lagu dari playlist. Playlist tidak ditemukan atau Anda bukan pemilik playlist',
      ),
    );
  }

  const playlistSong = await playlistRepositories.removeSongFromPlaylistById(playlistId, songId);
  if (!playlistSong) {
    return next(
      new NotFoundError('Gagal menghapus lagu dari playlist. Lagu tidak ditemukan di playlist'),
    );
  }
  return response(res, 200, 'Lagu berhasil dihapus dari playlist');
};
