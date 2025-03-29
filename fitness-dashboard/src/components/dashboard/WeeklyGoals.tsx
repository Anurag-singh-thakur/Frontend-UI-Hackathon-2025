'use client';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Activity, Flame, Footprints, Timer, Trophy, Target } from 'lucide-react';
import type { WeeklyGoal } from '@/types/fitness';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const mockGoals: WeeklyGoal[] = [
  {
    type: 'steps',
    target: 70000,
    current: 45000,
    unit: 'steps',
  },
  {
    type: 'calories',
    target: 14000,
    current: 8500,
    unit: 'cal',
  },
  {
    type: 'distance',
    target: 35,
    current: 22,
    unit: 'km',
  },
  {
    type: 'workouts',
    target: 5,
    current: 3,
    unit: 'workouts',
  },
];

const goalIcons = {
  steps: Footprints,
  calories: Flame,
  distance: Activity,
  workouts: Timer,
};

const getProgressColor = (progress: number) => {
  if (progress > 66) return 'text-green-500';
  if (progress > 33) return 'text-yellow-500';
  return 'text-red-500';
};

const getProgressMessage = (progress: number) => {
  if (progress > 66) return 'Excellent progress!';
  if (progress > 33) return 'Keep going!';
  return 'Need more effort';
};

export default function WeeklyGoals() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Weekly Goals</h2>
        <Badge variant="outline" className="flex items-center gap-1.5">
          <Target className="w-4 h-4" />
          <span>4 Goals</span>
        </Badge>
      </div>

      <div className="space-y-6">
        {mockGoals.map((goal, index) => {
          const Icon = goalIcons[goal.type];
          const progress = (goal.current / goal.target) * 100;
          const progressColor = getProgressColor(progress);
          const progressMessage = getProgressMessage(progress);

          return (
            <motion.div
              key={goal.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-primary/10 ${progressColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium capitalize">{goal.type}</h3>
                      <p className="text-sm text-muted-foreground">{progressMessage}</p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {goal.current.toLocaleString()}/{goal.target.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">{goal.unit}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Progress: {progress.toFixed(1)}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={progress}
                    className={`h-2 ${
                      progress > 66 ? '[&>div]:bg-green-500' :
                      progress > 33 ? '[&>div]:bg-yellow-500' :
                      '[&>div]:bg-red-500'
                    }`}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>

                {progress >= 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-3 flex items-center gap-2 text-green-500 text-sm"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>Goal achieved!</span>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}