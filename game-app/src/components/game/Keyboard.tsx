'use client';
import { Delete } from 'lucide-react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

// Adjusted key sizes for better proportions
const KEY_SIZES: Record<string, number> = {
  'ENTER': 1.8,
  '⌫': 1.8,
};

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, 'correct' | 'present' | 'absent'>;
  disabled: boolean;
}

export default function Keyboard({ onKeyPress, usedLetters, disabled }: KeyboardProps) {
  const getKeyContent = (key: string) => {
    switch (key) {
      case '⌫': return (
        <div className="flex items-center justify-center gap-1.5">
          <Delete className="w-4 h-4" />
        </div>
      );
      case 'ENTER': return (
        <div className="flex items-center justify-center">
          <span className="text-sm">Enter</span>
        </div>
      );
      default: return key;
    }
  };

  const getKeyStatus = (key: string) => {
    // For game letters only (A-Z)
    if (key.length === 1 && key >= 'A' && key <= 'Z') {
      return usedLetters[key];
    }
    return null;
  };

  const getKeyClasses = (key: string) => {
    const status = getKeyStatus(key);
    const width = KEY_SIZES[key] || 1;
    
    // Base classes for all keys
    let classes = "relative flex items-center justify-center select-none ";
    
    // Height and width classes with adjusted sizing
    classes += "h-12 ";
    
    // Adjusted width calculation for better proportions
    if (width > 1) {
      classes += `min-w-[4.5rem] flex-[${width}] `;
    } else {
      classes += "min-w-[2.5rem] flex-1 ";
    }
    
    // Key cap effect with shadows and 3D appearance
    classes += "rounded-lg ";
    classes += "border border-slate-200 shadow-[2px_2px_2px_rgba(0,0,0,0.05)] ";
    classes += "active:shadow-[1px_1px_1px_rgba(0,0,0,0.05)] active:translate-y-0.5 ";
    
    // Content positioning
    classes += "group overflow-hidden ";
    
    // Status-specific colors and effects
    if (status === 'correct') {
      classes += "bg-green-500 text-white hover:bg-green-400 active:bg-green-600 ";
    } else if (status === 'present') {
      classes += "bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-600 ";
    } else if (status === 'absent') {
      classes += "bg-slate-200 text-slate-400 hover:bg-slate-100 active:bg-slate-300 ";
    } else {
      // Default mechanical key style - light theme
      classes += "bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 ";
      
      // Special keys get a slightly different style
      if (['ENTER', '⌫'].includes(key)) {
        classes += "bg-slate-50 text-slate-600 hover:bg-white active:bg-slate-100 ";
      }
    }
    
    // Transition effects
    classes += "transition-all duration-100 transform-gpu ";
    
    return classes;
  };

  // Handle key press with proper action mapping
  const handleKeyPress = (key: string) => {
    if (disabled) return;
    onKeyPress(key); // Simply pass the key directly, no need for special handling
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
      {/* Keyboard case with ambient light effect */}
      <div className="relative bg-white/40 p-4 rounded-lg shadow-inner overflow-hidden">
        {/* Subtle gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />
        
        {/* Keys */}
        <div className="relative space-y-2">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex gap-1.5 ${rowIndex === 1 ? 'px-4' : ''}`}
            >
              {row.map((key) => (
                <div
                  key={key}
                  className={getKeyClasses(key)}
                  onClick={() => handleKeyPress(key)}
                >
                  {/* Key content with better visibility */}
                  <div className="relative z-10 font-medium tracking-wide">
                    {getKeyContent(key)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}