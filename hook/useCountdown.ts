import { useState, useEffect } from "react";

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (jamMulai: string | undefined, jamSelesai: string | undefined): Countdown => {
  const [countdown, setCountdown] = useState<Countdown>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!jamMulai || !jamSelesai) return;

    const calculateCountdown = () => {
      const now = new Date();
      const [startHour, startMinute] = jamMulai.split(":").map(Number);
      const [endHour, endMinute] = jamSelesai.split(":").map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);

      let remainingTime = startTime.getTime() - now.getTime();
      if (now > startTime) {
        remainingTime = endTime.getTime() - now.getTime();
      }

      if (remainingTime <= 0) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        setCountdown({ hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const intervalId = setInterval(calculateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [jamMulai, jamSelesai]);

  return countdown;
};

export default useCountdown;
