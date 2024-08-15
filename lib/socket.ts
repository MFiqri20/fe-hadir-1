// utils/socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://172.16.40.12:2009', {
  transports: ['websocket'],
});

export default socket;
