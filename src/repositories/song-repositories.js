import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class SongRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createSong({ title, year, genre, performer, duration, album_id }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs (id, title, year, genre, performer, duration, album_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, album_id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getSongs({ title, performer }) {
    // const result = await this.pool.query('SELECT id, title, performer FROM songs');
    // return result.rows;

    let query = {
      text: 'SELECT id, title, performer FROM songs',
      values: [],
    };

    if (title && performer) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE $1 AND LOWER(performer) LIKE $2',
        values: [`%${title.toLowerCase()}%`, `%${performer.toLowerCase()}%`],
      };
    } else if (title) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE $1',
        values: [`%${title.toLowerCase()}%`],
      };
    } else if (performer) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE LOWER(performer) LIKE $1',
        values: [`%${performer.toLowerCase()}%`],
      };
    }

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async updateSongById({ id, title, year, genre, performer, duration, album_id }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, duration, album_id, id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new SongRepositories();
