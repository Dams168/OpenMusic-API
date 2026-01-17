import ClientError from './client-error.js';

export default class NotFoundError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}
