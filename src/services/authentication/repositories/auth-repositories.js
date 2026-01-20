import { Pool } from 'pg';

class authenticationRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications (token) VALUES ($1)',
      values: [token],
    };
    await this.pool.query(query);
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };
    await this.pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };
    const result = await this.pool.query(query);
    return result.rows.length > 0;
  }
}

export default new authenticationRepositories();
