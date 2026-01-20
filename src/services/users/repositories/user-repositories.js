import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createUser({ username, password, fullname }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this.pool.query(query);
    return result.rows.length > 0;
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [userId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new UserRepositories();
