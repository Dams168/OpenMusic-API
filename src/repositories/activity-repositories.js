import { nanoid } from 'nanoid';
import { Pool } from 'pg';

class ActivityRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addActivity({ playlistId, userId, action, songId }) {
    const id = nanoid(16);
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities (id, playlist_id, user_id, action, song_id, time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, userId, action, songId, time],
    };
    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getActivitiesByPlaylistId(playlistId) {
    const query = {
      text: `
        SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
        FROM playlist_song_activities
        JOIN users ON playlist_song_activities.user_id = users.id
        JOIN songs ON playlist_song_activities.song_id = songs.id
        WHERE playlist_song_activities.playlist_id = $1
      `,
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }
}

export default new ActivityRepositories();
