'use client';
import { useEffect, useState } from 'react';
import { WEDDING_TIMESTAMP } from '@/lib/constants';

const weddingDate = WEDDING_TIMESTAMP

function Counter({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-white">
      <strong className="text-lg font-bold lg:text-3xl xl:text-5xl">
        {value}
      </strong>
      <span className="text-xs lg:text-sm xl:text-base">{label}</span>
    </div>
  );
}

const startValues = { years: 0, months: 0, days: 0 };

export default function Countdown() {
  const [countdown, setCountdown] = useState(startValues);
  const [hasHappened, setHasHappened] = useState(false);

  const calculateDiff = (from: Date, to: Date) => {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      months--;
      const daysInLastMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
      days += daysInLastMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const getTimeInfo = () => {
    const now = new Date();
    const wedding = new Date(weddingDate);

    if (now.getTime() < wedding.getTime()) {
      // Countdown TO wedding
      const timeLeft = calculateDiff(now, wedding);
      setCountdown(timeLeft);
      setHasHappened(false);
    } else {
      // Time SINCE wedding
      const timePassed = calculateDiff(wedding, now);
      setCountdown(timePassed);
      setHasHappened(true);
    }
  };

  useEffect(() => {
    getTimeInfo();
    const interval = setInterval(getTimeInfo, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 bg-white/30 backdrop-blur-md px-4 py-1 rounded-full text-xs text-white lg:text-sm">
        {hasHappened ? 'Married for:' : 'Countdown to our wedding:'}
      </div>
      <div className="flex items-center justify-center gap-4 lg:gap-10">
        <Counter label="Years" value={countdown.years} />
        <Counter label="Months" value={countdown.months} />
        <Counter label="Days" value={countdown.days} />
      </div>
    </div>
  );
}