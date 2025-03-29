'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { GamepadIcon, ClockIcon, InfinityIcon, CalendarDaysIcon, SparklesIcon } from 'lucide-react';
import { GameMode, GameSettings } from '@/types/game';

interface GameModeSelectorProps {   
  onSelect: (settings: GameSettings) => void; 
}

export default function GameModeSelector({ onSelect }: GameModeSelectorProps) {
  const modes: Array<{     
    id: GameMode;     
    title: string;     
    description: string;     
    icon: React.ReactNode;
    color: string;
    bgColor: string;
  }> = [     
    {       
      id: 'daily',       
      title: 'Daily Challenge',       
      description: 'One new word every day',       
      icon: <CalendarDaysIcon className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },     
    {       
      id: 'practice',       
      title: 'Practice Mode',       
      description: 'Unlimited words to practice',       
      icon: <GamepadIcon className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },     
    {       
      id: 'timed',       
      title: 'Time Attack',       
      description: 'Solve as many as you can in 5 minutes',       
      icon: <ClockIcon className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },     
    {       
      id: 'infinite',       
      title: 'Infinite Mode',       
      description: 'Play until you lose',       
      icon: <InfinityIcon className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }   
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
   
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-muted/30 flex items-center justify-center p-6">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="w-full max-w-6xl"
      >
        <motion.div variants={item} className="text-center space-y-6 mb-16">
          <div className="inline-block">
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Word Puzzle
              </h1>
              <SparklesIcon className="absolute -top-6 -right-8 w-12 h-12 text-yellow-400/30 animate-pulse" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your preferred game mode and challenge yourself to become a word master
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {modes.map((mode) => (
            <motion.div
              key={mode.id}
              variants={item}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Card className="relative h-full overflow-hidden bg-white/80 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity ${mode.bgColor}`} />
                
                <CardHeader className="flex-grow flex items-center justify-center flex-col text-center space-y-5 pt-8">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 rounded-2xl ${mode.bgColor} ${mode.color} shadow-sm`}
                  >
                    {mode.icon}
                  </motion.div>
                  <div className="space-y-2.5">
                    <CardTitle className={`text-2xl font-bold ${mode.color}`}>
                      {mode.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground/90">
                      {mode.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <Button 
                    onClick={() => onSelect({
                      mode: mode.id,
                      difficulty: 'medium',
                      hints: true
                    })}
                    className={`w-full group-hover:scale-105 transition-all duration-300 text-white shadow-lg
                               bg-gradient-to-r from-primary to-primary/80 hover:to-primary`}
                  >
                    Start Playing
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}