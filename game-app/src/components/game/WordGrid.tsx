'use client';

import { motion, AnimatePresence } from 'framer-motion';

const tileVariants = {
  initial: { 
    scale: 0.8, 
    rotateX: -90,
    opacity: 0 
  },
  animate: (i: number) => ({
    scale: 1,
    rotateX: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }),
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
};

interface WordGridProps {
  word: string;
  guesses: string[];
  currentGuess: string;
  gameWon: boolean;
  gameLost: boolean;
}

export default function WordGrid({ word, guesses, currentGuess }: WordGridProps) {
  const emptyRows = 6 - guesses.length - 1;
  
  return (
    <div className="grid gap-2">
      <AnimatePresence>
        {guesses.map((guess, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-5 gap-2"
          >
            {guess.split('').map((letter, j) => (
              <motion.div
                key={j}
                variants={tileVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={j}
                style={{ perspective: 1000 }}
              >
                <div className={`relative h-16 w-16 transform-gpu transition-all duration-500
                  ${letter === word[j] 
                    ? 'text-white' 
                    : word.includes(letter) 
                    ? 'text-white' 
                    : 'text-white'}`}
                >
                  {/* 3D Tile with lighting effect */}
                  <div className={`absolute inset-0 rounded-xl shadow-lg transform-gpu transition-all duration-500
                    ${letter === word[j]
                      ? 'bg-green-600 shadow-green-500/30'
                      : word.includes(letter)
                      ? 'bg-yellow-500 shadow-yellow-500/30'
                      : 'bg-gray-700 shadow-gray-900/30'}
                    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/20 before:to-transparent
                    after:absolute after:inset-x-1 after:top-0.5 after:h-2 after:rounded-full after:bg-gradient-to-r after:from-white/20 after:via-white/40 after:to-white/20`}
                  />
                  
                  {/* Letter with 3D effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold transform-gpu transition-transform duration-300">
                      {letter}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Current guess */}
      {currentGuess && (
        <div className="grid grid-cols-5 gap-2">
          {currentGuess.padEnd(5, ' ').split('').map((letter, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <div className="relative h-16 w-16">
                {/* Empty tile with subtle animation */}
                <div className={`absolute inset-0 rounded-xl bg-gray-200 dark:bg-gray-800 
                  shadow-lg transform-gpu transition-all duration-300 hover:shadow-xl
                  before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/10 before:to-transparent
                  ${letter !== ' ' ? 'border-2 border-primary' : 'border border-gray-300 dark:border-gray-700'}`}
                />
                
                {/* Letter */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {letter !== ' ' ? letter : ''}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty rows */}
      {Array.from({ length: emptyRows }).map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="relative h-16 w-16">
              {/* Empty tile with subtle hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gray-100 dark:bg-gray-800/50 
                shadow-sm transform-gpu transition-all duration-300 hover:shadow-md
                before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/5 before:to-transparent
                border border-gray-200 dark:border-gray-800"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}