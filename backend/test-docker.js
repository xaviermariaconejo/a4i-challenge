/**
 * test-docker.js  (Node 18+; fetch is native)
 */

import { io } from 'socket.io-client';    // ES‑module style
// ‑‑ or ‑‑
// const { io } = require('socket.io-client');   // CommonJS

const API_KEY = 'your-secure-api-key';
const BASE    = 'http://localhost:3000';

async function testDocker() {
  try {
    /* 1. /health ----------------------------------------------------------------- */
    const healthRes = await fetch(`${BASE}/health`, {
      headers: { 'x-api-key': API_KEY }
    });
    if (!healthRes.ok) throw new Error(`Health check failed: ${healthRes.status}`);
    console.log('Health check response:', await healthRes.json());

    /* 2. /messages (GET) ---------------------------------------------------------- */
    const messagesRes = await fetch(`${BASE}/messages`, {
      headers: { 'x-api-key': API_KEY }
    });
    if (!messagesRes.ok) throw new Error(`Messages endpoint failed: ${messagesRes.status}`);
    console.log('Messages response:', await messagesRes.json());

    /* 3. /messages (POST) --------------------------------------------------------- */
    const createRes = await fetch(`${BASE}/messages`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body:    JSON.stringify({ content: 'Test message from script' })
    });
    if (!createRes.ok) throw new Error(`Create message failed: ${createRes.status}`);
    console.log('New message created:', await createRes.json());

    /* 4. Socket.IO streaming ------------------------------------------------------ */
    const socket = io(BASE, {
      path: '/stream',                 // must match server
      extraHeaders: { 'x-api-key': API_KEY }
    });

    socket.on('connect', () => {
      console.log('Socket.IO connected. Sending messages …');
      socket.emit('userMessage', { content: 'Hello from Node script' });
      socket.emit('userMessage', { content: 'Prepare a quote' });
    });

    socket.on('message', (msg) => {
      switch (msg.type) {
        case 'streamToken':
          console.log('Partial token:', msg.content);
          break;
        case 'action':
          console.log('Received action:', msg.action, msg.payload);
          break;
        case 'done':
          console.log('Streaming done.');
          break;
        default:
          console.log('Unknown message:', msg);
      }
    });

    socket.on('disconnect', (reason) => console.log('Socket.IO disconnected:', reason));
    socket.on('connect_error', (err)  => console.error('Socket.IO error:', err));

  } catch (err) {
    console.error('Error testing Docker container:', err);
  }
}

testDocker();
