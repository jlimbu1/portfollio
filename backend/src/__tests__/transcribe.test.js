const request = require('supertest');
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

    const response = await request(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('text');
    expect(response.body.text).toBe(mockTranscriptionText);
  });

  it('should return 400 for missing file', async () => {
    const response = await request(app)
      .post('/api/transcribe');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('No file provided');
  });

  it('should return 400 for invalid file type', async () => {
    const invalidFilePath = path.join(tempDir, 'test.txt');
    fs.writeFileSync(invalidFilePath, 'not an audio file');

    const response = await request(app)
      .post('/api/transcribe')
      .attach('audio', invalidFilePath);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid file type');

    fs.unlinkSync(invalidFilePath);
  });

  it('should return 413 for file exceeding size limit', async () => {
    const largeFilePath = path.join(tempDir, 'large.mp3');
    const largeBuffer = Buffer.alloc(51 * 1024 * 1024);
    fs.writeFileSync(largeFilePath, largeBuffer);

    const response = await request(app)
      .post('/api/transcribe')
      .attach('audio', largeFilePath);

    expect(response.status).toBe(413);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('File too large');

    fs.unlinkSync(largeFilePath);
  });

  it('should return 500 when OpenAI API key is invalid', async () => {
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    mockCreate.mockRejectedValueOnce({ status: 401, message: 'Invalid API key' });

    const response = await request(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid OpenAI API key');
  });

  it('should return 500 when rate limit is exceeded', async () => {
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    mockCreate.mockRejectedValueOnce({ status: 429, message: 'Rate limit exceeded' });

    const response = await request(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Rate limit exceeded. Please try again later.');
  });

  it('should return 500 when transcription fails', async () => {
    const OpenAI = require('openai');
    const mockCreate = OpenAI.mock.results[0].value.audio.transcriptions.create;
    mockCreate.mockRejectedValueOnce(new Error('Transcription failed'));

    const response = await request(app)
      .post('/api/transcribe')
      .attach('audio', testAudioPath);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Transcription failed');
  });

  it('should return 400 for empty file', async () => {
    const emptyFilePath = path.join(tempDir, 'empty.mp3');
    fs.writeFileSync(emptyFilePath, '');

    const response = await request(app)
      .post('/api/transcribe')
      .attach('audio', emptyFilePath);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid file');

    fs.unlinkSync(emptyFilePath);
  });
});