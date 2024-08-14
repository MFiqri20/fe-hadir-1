import { useSocket } from '@/component/SocketProvider';
import { useState } from 'react';

const SiswaPage = () => {
  const [siswaId, setSiswaId] = useState<number>(1); // Ganti sesuai dengan ID siswa yang aktif
  const socket = useSocket();

  const handleAbsen = () => {
    if (socket) {
      socket.emit('createAbsen', { siswaId });
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleAbsen} className="bg-blue-500 text-white p-2 rounded">
        Absen
      </button>
    </div>
  );
};

export default SiswaPage;
