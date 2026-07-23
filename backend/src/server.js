const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const transcribeRouter = require('./routes/transcribe');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use('/api/transcribe', transcribeRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;