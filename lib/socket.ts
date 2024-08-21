import { io, Socket } from 'socket.io-client';

const socket: Socket = io(process.env.BACKEND_URL as string, {
  transports: ['websocket'],
});

export default socket;