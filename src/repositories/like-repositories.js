import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import redisService from '../cache/redis-service.js';

class LikeRepositories {
  constructor() {
    this.pool = new Pool();
    this.redisService = redisService;
  }

  async addLike(userId, albumId) {
    const id = `like-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes (id, user_id, album_id) VALUES ($1, $2, $3)',
      values: [id, userId, albumId],
    };

    await this.pool.query(query);
    await this.redisService._client.del(`album_likes:${albumId}`);

    return id;
  }

  async removeLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this.pool.query(query);

    if (result.rowCount > 0) {
      await this.redisService._client.del(`album_likes:${albumId}`);
      return result.rows[0].id;
    }

    return null;
  }

  async getCountLikes(albumId) {
    const cacheKey = `album_likes:${albumId}`;

    try {
      const cached = await this.redisService._client.get(cacheKey);

      if (cached) {
        return { count: JSON.parse(cached), source: 'cache' };
      }

      throw new Error('Cache Error');
    } catch {
      const query = {
        text: 'SELECT COUNT(*) AS like_count FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };

      const result = await this.pool.query(query);
      const count = parseInt(result.rows[0].like_count, 10);

      await this.redisService._client.set(cacheKey, JSON.stringify(count));

      return {
        count: count,
        source: 'database',
      };
    }
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
