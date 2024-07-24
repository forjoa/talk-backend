import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import userRoutes from './routes/userRoutes';
import './config/database';

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.NEXT_PUBLIC_HOSTNAME || 'localhost';

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer);
import socketHandlers from './socket';
socketHandlers(io);

httpServer.listen(port, () => {
    console.log(`> Server running on http://${hostname}:${port}`);
});
