import React, { useState, useEffect } from "react";

function App() {
  const [targetDate, setTargetDate] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const calculateTimeLeft = () => {
    if (!targetDate) return null;

    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Countdown Timer
        </h1>
        <p className="text-slate-600 mb-6">
          Set your target date and time below
        </p>

        <div className="mb-6">
          <label className="block text-slate-700 font-medium mb-2">
            Target Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>

        {timeLeft && (
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <p className="text-2xl font-bold text-slate-800">{timeLeft.days}</p>
              <p className="text-slate-600 text-xs uppercase tracking-wide">Days</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <p className="text-2xl font-bold text-slate-800">{timeLeft.hours}</p>
              <p className="text-slate-600 text-xs uppercase tracking-wide">Hours</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <p className="text-2xl font-bold text-slate-800">{timeLeft.minutes}</p>
              <p className="text-slate-600 text-xs uppercase tracking-wide">Mins</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <p className="text-2xl font-bold text-slate-800">{timeLeft.seconds}</p>
              <p className="text-slate-600 text-xs uppercase tracking-wide">Secs</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
