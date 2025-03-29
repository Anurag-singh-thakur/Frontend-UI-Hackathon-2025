'use client';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { COLORS } from './ChatHeader';

interface MessageBubbleProps {
  content: string;
  timestamp: Date;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export default function MessageBubble({
  content,
  timestamp,
  isOwn,
  status,
}: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        flex 
        ${isOwn ? 'justify-end' : 'justify-start'}
        my-2
      `}
    >
      <div
        className={`
          relative 
          max-w-[70%] 
          rounded-2xl 
          px-4 
          py-2 
          shadow-sm
          ${
            isOwn
              ? `
                  bg-gray-800 
                  text-white 
                  dark:bg-gray-700
                `
              : `
                  bg-gray-100 
                  text-gray-900 
                  dark:bg-gray-700 
                  dark:text-white
                `
          }
        `}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        <div 
          className={`
            mt-1 
            flex 
            items-center 
            justify-end 
            space-x-2
          `}
        >
          <span 
            className={`
              text-xs 
              ${isOwn ? 'text-gray-300' : 'text-gray-500'}
              dark:text-gray-400
            `}
          >
            {format(timestamp, 'h:mm a')}
          </span>
          {isOwn && status && (
            <span 
              className={`
                text-xs 
                ${
                  isOwn
                    ? 'text-gray-300 dark:text-gray-400'
                    : 'text-gray-500 dark:text-gray-300'
                }
              `}
            >
              {status === 'read' 
                ? '✓✓' 
                : status === 'delivered' 
                  ? '✓' 
                  : '⏱️'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}