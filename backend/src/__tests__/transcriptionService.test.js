const path = require('path');
const fs = require('fs');
const os = require('os');

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    audio: {
      transcriptions: {
        create: jest.fn(),
      },
    },
  }));
});

const app = require('../server');

describe('POST /api/transcribe', () => {
  let tempDir;
  let testAudioPath;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'transcribe-test-'));
    testAudioPath = path.join(tempDir, 'test.mp3');
    const minimalMp3 = Buffer.from([
      0xFF, 0xFB, 0x90, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]);
    fs.writeFileSync(testAudioPath, minimalMp3);
  });

  afterAll(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 with transcription for a valid audio file', async () => {
    const mockTranscriptionText = 'Hello, this is a test transcription.';
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    mockCreate.mockResolvedValueOnce({ text: mockTranscriptionText });

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('text', mockTranscriptionText);
  });

  it('should return 400 for invalid file type', async () => {
    const invalidPath = path.join(tempDir, 'test.txt');
    fs.writeFileSync(invalidPath, 'not an audio file');

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', invalidPath);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/invalid file type/i);

    fs.unlinkSync(invalidPath);
  });

  it('should return 413 for oversized file', async () => {
    const largePath = path.join(tempDir, 'large.mp3');
    const largeBuffer = Buffer.alloc(51 * 1024 * 1024);
    fs.writeFileSync(largePath, largeBuffer);

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', largePath);

    expect(response.status).toBe(413);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/file too large/i);

    fs.unlinkSync(largePath);
  });

  it('should return 400 when no file is provided', async () => {
    const response = await require('supertest')(app)
      .post('/api/transcribe');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'No file provided');
  });

  it('should return 400 for empty file', async () => {
    const emptyPath = path.join(tempDir, 'empty.mp3');
    fs.writeFileSync(emptyPath, '');

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', emptyPath);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');

    fs.unlinkSync(emptyPath);
  });

  it('should handle OpenAI API key error', async () => {
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    const apiError = new Error('Incorrect API key provided');
    apiError.status = 401;
    mockCreate.mockRejectedValueOnce(apiError);

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/invalid openai api key/i);
  });

  it('should handle rate limit error', async () => {
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    const rateLimitError = new Error('Rate limit exceeded');
    rateLimitError.status = 429;
    mockCreate.mockRejectedValueOnce(rateLimitError);

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(429);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/rate limit/i);
  });

  it('should handle file too large for API error', async () => {
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    const fileTooLargeError = new Error('File too large');
    fileTooLargeError.status = 413;
    mockCreate.mockRejectedValueOnce(fileTooLargeError);

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(413);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/file too large/i);
  });

  it('should handle generic transcription failure', async () => {
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    mockCreate.mockRejectedValueOnce(new Error('Network error'));

    const response = await require('supertest')(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/transcription failed/i);
  });
});