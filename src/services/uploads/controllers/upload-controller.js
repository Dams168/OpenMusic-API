import response from '../../../utils/response.js';
import { ClientError } from '../../../exceptions/index.js';
import uploadRepositories from '../repositories/upload-repositories.js';

export const uploadImage = async (req, res, next) => {
  const { id } = req.params;

  if (!req.file) {
    return next(new ClientError('No file uploaded'));
  }

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || '3000';

  const encodedFilename = encodeURIComponent(req.file.filename);
  const coverUrl = `http://${host}:${port}/uploads/${encodedFilename}`;

  const cover = await uploadRepositories.updateCoverAlbum({
    id,
    coverUrl,
  });

  return response(res, 201, 'Sampul Berhasil diunggah');
};
