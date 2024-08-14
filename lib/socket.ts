// utils/socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:2009', {
  transports: ['websocket'],
});

export default socket;
