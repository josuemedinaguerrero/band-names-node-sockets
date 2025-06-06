import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socket from './src/socket.js';

dotenv.config();

// App Express
const app = express();

// Node Server
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

socket(io);

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`Server running on port ${process.env.PORT}`);
});
