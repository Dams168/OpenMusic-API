import response from '../../../utils/response.js';
import { ClientError } from '../../../exceptions/index.js';

export const uploadImage = (req, res, next) => {
  const { id } = req.params;

  if (!req.file) {
    return next(new ClientError('No file uploaded'));
  }

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || '3000';

  const encodedFilename = encodeURIComponent(req.file.filename);
  const fileLocation = `http://${host}:${port}/uploads/${encodedFilename}`;

  return response(res, 201, 'Sampul Berhasil diunggah', { coverUrl: fileLocation });
};
