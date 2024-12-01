// import { useSocket } from '@/component/SocketProvider';
// import { useEffect, useState } from 'react';

// const AdminDashboard = () => {
//   const [absens, setAbsens] = useState<any[]>([]);
//   const socket = useSocket();

//   useEffect(() => {
//     if (socket) {
//       socket.on('absenCreated', (absen : any) => {
//         setAbsens((prevAbsens) => [absen, ...prevAbsens]);
//       });
//     }
//     return () => {
//       if (socket) {
//         socket.off('absenCreated');
//       }
//     };
//   }, [socket]);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Absensi Siswa</h1>
//       <ul>
//         {absens.map((absen) => (
//           <li key={absen.id} className="border p-2 mb-2 rounded">
//             Siswa ID: {absen.siswaId}, Waktu: {new Date(absen.waktu).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;
