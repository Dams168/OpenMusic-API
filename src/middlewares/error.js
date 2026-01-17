import { ClientError } from '../exceptions/index.js';
import response from '../utils/response.js';

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error('Error : ', err);
  return response(res, status, message, null);
};

export default ErrorHandler;
