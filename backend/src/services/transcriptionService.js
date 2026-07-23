const OpenAI = require('openai');
const crypto = require('crypto');
const fs = require('fs');

class TranscriptionService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async transcribe(file) {
    if (!file || !file.path) {
      throw new Error('File object with path is required');
    }

    let audioFile = null;
    try {
      audioFile = fs.createReadStream(file.path);

      const response = await this.openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: audioFile,
        response_format: 'json',
      });

      const id = crypto.randomUUID();

      return {
        id,
        text: response.text,
      };
    } catch (error) {
      if (error.status === 401) {
        throw new Error('Invalid OpenAI API key');
      }
      if (error.status === 413) {
        throw new Error('Audio file too large for transcription API');
      }
      if (error.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`Transcription failed: ${error.message}`);
    } finally {
      if (audioFile) {
        audioFile.destroy();
      }
      try {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (cleanupError) {
        console.error('Failed to clean up uploaded file:', cleanupError.message);
      }
    }
  }
}

module.exports = new TranscriptionService();