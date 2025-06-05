import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

// App Express
const app = express();

// Node Server
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Mensajería por sockets
io.on('connection', (client) => {
  console.log('Cliente conectado');

  client.on('disconnect', (client) => {
    console.log('Cliente se ha desconectado');
  });

  client.on('msg', (data) => {
    console.log('Mensaje recibido:', data);
    client.emit('respuesta', 'Mensaje recibido en el servidor');
  });
});

io.on('connection_error', (err) => {
  console.log('Error de conexión:', err);
});

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`Server running on port ${process.env.PORT}`);
});
