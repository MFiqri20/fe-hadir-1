// hooks/useCountdown.ts
import { useState, useEffect } from "react";

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (startTime: string, endTime: string) => {
  const [countdown, setCountdown] = useState<Countdown>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute
      );
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        endHour,
        endMinute
      );

      // Adjust start time if it has passed
      if (now > start && now < end) {
        setCountdown({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const timeDiffStart = start.getTime() - now.getTime();
        const totalSecondsStart = Math.floor(timeDiffStart / 1000);
        const hoursStart = Math.floor(totalSecondsStart / 3600);
        const minutesStart = Math.floor((totalSecondsStart % 3600) / 60);
        const secondsStart = totalSecondsStart % 60;

        setCountdown({
          hours: hoursStart,
          minutes: minutesStart,
          seconds: secondsStart,
        });
      }
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000); // Update countdown every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [startTime, endTime]);

  return countdown;
};

export default useCountdown;
