"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-6 text-2xl font-semibold">
      <div>
        {timeLeft.days} <span className="block text-sm">Hari</span>
      </div>
      <div>
        {timeLeft.hours} <span className="block text-sm">Jam</span>
      </div>
      <div>
        {timeLeft.minutes} <span className="block text-sm">Menit</span>
      </div>
      <div>
        {timeLeft.seconds} <span className="block text-sm">Detik</span>
      </div>
    </div>
  );
}
