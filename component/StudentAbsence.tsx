import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // URL backend NestJS Anda

const StudentAbsence: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleAbsence = async () => {
    setIsSubmitting(true);
    const absenceData = {
      studentId: '123', // Ganti dengan ID siswa yang sesuai
      classCode: 'ABC123', // Ganti dengan kode kelas yang sesuai
      timestamp: new Date().toISOString(),
    };

    try {
      socket.emit('createAbsenSiswa', absenceData);
      setMessage('Absensi berhasil dilakukan!');
    } catch (error) {
      console.error('Error saat mengabsen:', error);
      setMessage('Gagal melakukan absensi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Absensi Siswa</h1>
      <button
        onClick={handleAbsence}
        disabled={isSubmitting}
        className="btn"
      >
        {isSubmitting ? 'Mengirim...' : 'Absen'}
      </button>
      {message && <p>{message}</p>}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
        }
        .btn {
          background-color: #0070f3;
          color: #fff;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
        }
        .btn:disabled {
          background-color: #e0e0e0;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default StudentAbsence;
