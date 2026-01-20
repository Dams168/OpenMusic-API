import { nanoid } from 'nanoid';
import { Pool } from 'pg';

class PlaylistRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists (id, name, owner) VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
  async getPlaylists(owner) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
      FROM playlists
      JOIN users ON playlists.owner = users.id
      WHERE playlists.owner = $1`,
      values: [owner],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }
  async deletePlaylistById(playlistId) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async verifyPlaylistOwner(playlistId, owner) {
    const query = {
      text: 'SELECT id FROM playlists WHERE id = $1 AND owner = $2',
      values: [playlistId, owner],
    };
    const result = await this.pool.query(query);
    return result.rows.length > 0;
    // const result = await this.pool.query(query);
    // if (!result.rows.length) {
    //   return null;
    // }
    // if (result.rows[0].owner !== owner) {
    //   return null;
    // }
    // return result.rows[0] ;
  }

  async addSongToPlaylist(songId, playlistId) {
    const id = `playlistsong-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_songs (id, playlist_id, song_id) VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `SELECT playlists.id AS playlist_id,playlists.name AS playlist_name, users.username,songs.id AS song_id, songs.title, songs.performer
      FROM playlists
      JOIN users ON playlists.owner = users.id
      LEFT JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
      LEFT JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }
  async removeSongFromPlaylistById(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: 'SELECT id, name, owner FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new PlaylistRepositories();
