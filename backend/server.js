// server.js
const express = require('express');
const http    = require('http');
const { exit } = require('process');
const { Server } = require('socket.io');   // ← socket.io instead of ws

const app = express();

/*────────────────────────  REST PART  ────────────────────────*/

// API‑key middleware (shared by REST & socket.io)
const apiKeyMiddleware = (req, res, next) => {
  const apiKey      = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;      // set in env
  if (apiKey !== validApiKey) {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }
  next();
};
app.use(apiKeyMiddleware);

// health endpoint
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// simple in‑memory message store
const messages = [
  { id: 1, content: 'Hello, how can I help you today?', type: 'agentMessage' },
  { id: 2, content: 'I need assistance with my account.', type: 'userMessage' },
  { id: 3, content: 'Sure, can you please provide more details?', type: 'agentMessage' },
  { id: 4, content: 'I am unable to log in to my account.', type: 'userMessage' },
  { id: 5, content: 'Let me check that for you. One moment, please.', type: 'agentMessage' }
];

app.get('/messages', (_, res) => res.json(messages));

app.post('/messages', express.json(), (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content is required' });

  const newMessage = { id: messages.length + 1, content, type: 'userMessage' };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

/*────────────────────────  SOCKET.IO PART  ────────────────────────*/

// Create HTTP server first, then attach socket.io
const server = http.createServer(app);

const io = new Server(server, {
  path: '/stream',     // same path clients used with ws
  cors: { origin: '*' }
});

/* handshake auth */
io.use((socket, next) => {
  const apiKey      = socket.handshake.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;
  if (apiKey !== validApiKey) {
    return next(new Error('Forbidden: Invalid API key'));
  }
  next();
});

/* helper that “streams” tokens to the client */
function simulateLLMResponse(socket, userMessage) {
  const tokens = [
    'Sure,', 'let’s', 'calculate', 'a', 'quote', 'for', 'you.',
    'First,', 'we’ll', 'need', 'your', 'age', 'and', 'driving', 'record.',
    'Then,', 'we’ll', 'find', 'the', 'best', 'rate.'
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i < tokens.length) {
      socket.emit('message', { type: 'streamToken', content: tokens[i] });
      i += 1;
    } else {
      clearInterval(interval);

      // save full message to history
      messages.push({
        id: messages.length + 1,
        content: tokens.join(' '),
        type: 'agentMessage'
      });

      // optional “action”
      if (userMessage && userMessage.includes('quote')) {
        socket.emit('message', {
          type:   'action',
          action: 'fillFormAndQuote',
          payload: {
            name: 'Marc',
            age: 30,
            hasAccidents: false,
            quote: '1200',
            currency: 'EUR'
          }
        });
      }

      socket.emit('message', { type: 'done' }); // round finished
    }
  }, 100);
}

/* socket.io events */
io.on('connection', (socket) => {
  console.log('Client connected');

  // client sends a user message
  socket.on('userMessage', ({ content }) => {
    console.log('User asked:', content);
    simulateLLMResponse(socket, content);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

/*────────────────────────  START  ────────────────────────*/

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  if (!process.env.API_KEY) {
    console.error('API key is not set. Please set the API_KEY environment variable.');
    exit(1);
  }
  console.log(`Mock LLM backend (socket.io) running on port ${PORT}`);
});
