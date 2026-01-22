import { Pool } from 'pg';

class UploadRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async updateCoverAlbum({ id, coverUrl }) {
    const query = {
      text: 'UPDATE albums SET cover = $1 WHERE id = $2 RETURNING id, cover',
      values: [coverUrl, id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new UploadRepositories();
