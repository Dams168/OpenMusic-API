import ClientError from './client-error.js';

export default class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}
