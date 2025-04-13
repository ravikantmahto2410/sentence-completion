import React, { useEffect } from 'react';

const Timer = ({ timeLeft, setTimeLeft, onTimeEnd }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEnd();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, setTimeLeft, onTimeEnd]);

  return (
    <div className="text-right text-sm text-gray-600 mb-4">
      Time left: <span className="font-bold text-red-600">{timeLeft}s</span>
    </div>
  );
};

export default Timer;