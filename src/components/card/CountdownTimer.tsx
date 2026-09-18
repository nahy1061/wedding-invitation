import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isComplete) {
    return (
      <div className="text-center py-4 px-6 rounded-lg bg-emerald-900/40 border border-gold-500/30">
        <p className="font-serif text-gold-300 text-sm sm:text-base tracking-widest uppercase font-semibold">
          ✦ The Auspicious Day Has Arrived ✦
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-sm mx-auto my-6">
      <p className="text-center text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-gold-400/80 mb-3">
        Counting Down To The Union
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-lg bg-emerald-950/80 border border-gold-500/30 shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm"
          >
            <span className="font-serif text-lg sm:text-2xl font-bold text-gold-300 drop-shadow">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[10px] font-sans tracking-widest text-gold-400/70 uppercase mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
