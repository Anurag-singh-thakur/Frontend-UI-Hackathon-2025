'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Activity, Flame, Footprints } from 'lucide-react';

const mockWorkouts = [
  {
    type: 'Running',
    duration: '45 min',
    distance: '5.2 km',
    calories: '420',
    date: 'Today',
    intensity: 'high',
  },
  {
    type: 'Cycling',
    duration: '60 min',
    distance: '20 km',
    calories: '600',
    date: 'Yesterday',
    intensity: 'medium',
  },
  {
    type: 'Walking',
    duration: '30 min',
    distance: '2.5 km',
    calories: '150',
    date: '2 days ago',
    intensity: 'low',
  },
];

const workoutIcons = {
  Running: Activity,
  Cycling: Activity,
  Walking: Footprints,
};

const intensityColors = {
  high: 'bg-red-500/10 text-red-500',
  medium: 'bg-yellow-500/10 text-yellow-500',
  low: 'bg-green-500/10 text-green-500',
};

export default function WorkoutList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Recent Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWorkouts.map((workout, index) => {
              const Icon = workoutIcons[workout.type as keyof typeof workoutIcons];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{workout.type}</h3>
                      <p className="text-sm text-muted-foreground">{workout.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{workout.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{workout.calories}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={intensityColors[workout.intensity as keyof typeof intensityColors]}
                    >
                      {workout.intensity}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}