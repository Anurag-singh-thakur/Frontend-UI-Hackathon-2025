'use client';
import { Button } from "@/components/ui/button";
import {   
  HoverCard,   
  HoverCardContent,   
  HoverCardTrigger, 
} from "@/components/ui/hover-card";
import { motion } from 'framer-motion';
import { LightBulbIcon } from '@heroicons/react/24/outline';

interface HintSystemProps {   
  word: string;   
  hintsRemaining: number;   
  onUseHint: () => void; 
}

export default function HintSystem({ word, hintsRemaining, onUseHint }: HintSystemProps) {
  // Advanced hint generation function
  const getHint = () => {
    const hintTypes = [
      // Structural hints
      () => `The word has ${word.length} letters`,
      () => `First letter is "${word[0]}"`,
      
      // Letter composition hints
      () => {
        const uniqueLetters = new Set(word.split(''));
        return `Contains ${uniqueLetters.size} unique letters`;
      },
      
      () => {
        const lettersWithPosition = word.split('').map((letter, index) => 
          `${letter} is in position ${index + 1}`
        );
        return lettersWithPosition[hintsRemaining - 1];
      },
      
      () => {
        const contextHints = [
          "It's a popular JavaScript library",
          "Used for building user interfaces",
          "Developed by Facebook",
          "Enables component-based UI development"
        ];
        return contextHints[4 - hintsRemaining];
      }
    ];

    const hintIndex = 5 - hintsRemaining;
    return hintTypes[hintIndex]();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <HoverCard>
        <HoverCardTrigger>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onUseHint}
              disabled={hintsRemaining === 0}
              className="flex items-center gap-2 bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <LightBulbIcon className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Hint ({hintsRemaining})</span>
            </Button>
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-auto">
          <p className="text-sm">{hintsRemaining > 0 
            ? "Click to reveal a strategic hint!" 
            : "No more hints available"
          }</p>
        </HoverCardContent>
      </HoverCard>

      {hintsRemaining > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground bg-muted/20 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          {getHint()}
        </motion.div>
      )}
    </div>
  );
}