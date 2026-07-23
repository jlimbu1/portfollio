const express = require('express');
const upload = require('../middleware/upload');
const transcriptionService = require('../services/transcriptionService');
const { validateFile } = require('../utils/validators');

const router = express.Router();

router.post('/', (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          error: 'File too large',
          message: 'File size exceeds the 50MB limit.',
        });
      }
      if (err.code === 'INVALID_FILE_TYPE') {
        return res.status(400).json({
          error: 'Invalid file type',
          message: err.message,
        });
      }
      return res.status(400).json({
        error: 'Upload error',
        message: err.message,
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'No file provided',
          message: 'An audio file is required.',
        });
      }

      const validationError = validateFile(req.file);
      if (validationError) {
        return res.status(400).json({
          error: 'Invalid file',
          message: validationError,
        });
      }

      const result = await transcriptionService.transcribe(req.file);

      return res.status(201).json({
        id: result.id,
        text: result.text,
      });
    } catch (error) {
      return next(error);
    }
  });
});

module.exports = router;