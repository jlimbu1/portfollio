const path = require('path');

const ALLOWED_EXTENSIONS = ['.mp3', '.wav', '.m4a'];
const ALLOWED_MIME_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/mp4',
  'audio/x-m4a',
  'audio/m4a',
];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function validateFile(file) {
  if (!file) {
    return 'No file provided.';
  }

  if (!file.originalname) {
    return 'File has no name.';
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return `Invalid file extension "${ext}". Allowed: ${ALLOWED_EXTENSIONS.join(', ')}.`;
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return `Invalid MIME type "${file.mimetype}". Allowed: MP3, WAV, M4A.`;
  }

  if (file.size > MAX_FILE_SIZE) {
    return `File size ${(file.size / (1024 * 1024)).toFixed(2)}MB exceeds the 50MB limit.`;
  }

  if (file.size === 0) {
    return 'File is empty.';
  }

  return null;
}

module.exports = { validateFile };