const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const httpServer = createServer(app);

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('a user is connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', ({ room, msg }) => {
    io.to(room).emit('chat message', msg);
  });
});

httpServer.listen(port, () => {
  console.log(`> Server is running on http://localhost:${port}`);
});
