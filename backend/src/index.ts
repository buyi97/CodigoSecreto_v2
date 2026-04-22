import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { env } from './config/env';
import { RoomManager } from './services/RoomManager';
import { handleSocket } from './sockets/socketHandlers';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: env.FRONTEND_URL,
}));

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

const roomManager = new RoomManager();

io.on('connection', (socket) => {
  handleSocket(socket, roomManager);
});

server.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});