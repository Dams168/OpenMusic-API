import { nanoid } from 'nanoid';
import { Pool } from 'pg';

class LikeRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addLike(userId, albumId) {
    const id = `like-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes (id, user_id, album_id) VALUES ($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async removeLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };
    const result = await this.pool.query(query);
    return result.rows[0].id;
  }

  async getCountLikes(albumId) {
    const query = {
      text: 'SELECT COUNT(*) AS like_count FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };
    const result = await this.pool.query(query);
    return parseInt(result.rows[0].like_count, 10);
  }

  async isAlbumLikedByUser(userId, albumId) {
    const query = {
      text: 'SELECT 1 FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const result = await this.pool.query(query);
    return result.rowCount > 0;
  }
}

export default new LikeRepositories();
