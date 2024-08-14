import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (onUpdate: (data: any) => void) => {
  useEffect(() => {
    const socket = io('http://localhost:2009'); // URL backend NestJS Anda

    socket.on('absenSiswaUpdated', (data) => {
      onUpdate(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [onUpdate]);
};

export default useSocket;
