export type GameMode = 'daily' | 'practice' | 'timed' | 'infinite';

export interface GameSettings {
  mode: GameMode;
  timeLimit?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: boolean;
} 