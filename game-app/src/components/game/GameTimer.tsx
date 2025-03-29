// components/game/GameTimer.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GameTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

export default function GameTimer({ duration, onTimeUp }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = (timeLeft / duration) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-muted-foreground">Time Remaining</span>
        <motion.span
          key={timeLeft}
          initial={{ scale: 1.2, color: timeLeft < 10 ? '#ef4444' : 'inherit' }}
          animate={{ scale: 1 }}
          className="font-mono font-semibold"
        >
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </motion.span>
      </div>
      <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "linear" }}
          className={`absolute inset-y-0 left-0 rounded-full transition-colors duration-300 ${
            progress > 66 ? 'bg-green-500' :
            progress > 33 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}