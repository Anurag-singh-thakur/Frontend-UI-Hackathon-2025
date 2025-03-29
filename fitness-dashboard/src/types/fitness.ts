// types/fitness.ts
export interface Workout {
    id: string;
    name: string;
    type: 'cardio' | 'strength' | 'flexibility' | 'sports';
    duration: number;
    calories: number;
    date: string;
    intensity: 'low' | 'medium' | 'high';
  }
  
  export interface DailyStats {
    date: string;
    steps: number;
    calories: number;
    distance: number;
    activeMinutes: number;
    workouts: Workout[];
  }
  
  export interface WeeklyGoal {
    type: 'steps' | 'calories' | 'distance' | 'workouts';
    target: number;
    current: number;
    unit: string;
  }
  
  export interface UserProfile {
    name: string;
    weight: number;
    height: number;
    goal: 'lose' | 'maintain' | 'gain';
    weeklyGoals: WeeklyGoal[];
  }