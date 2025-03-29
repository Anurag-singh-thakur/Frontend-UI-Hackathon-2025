'use client';
import { EllipsisHorizontalIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
// Color palette for consistent theming
export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  green: {
    500: '#10b981',
  },
  yellow: {
    500: '#eab308',
  }
};

interface ChatHeaderProps {
  name: string;
  status: 'online' | 'offline' | 'typing';
  avatar: string;
}

export default function ChatHeader({ name, status, avatar }: ChatHeaderProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return COLORS.green[500];
      case 'typing': return COLORS.yellow[500];
      default: return COLORS.gray[400];
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Online';
      case 'typing': return 'Typing...';
      default: return 'Offline';
    }
  };

  return (
    <div className={`
      flex h-16 items-center justify-between 
      border-b border-gray-200 bg-white 
      px-4 py-2 shadow-sm
      dark:border-gray-700 dark:bg-gray-800
      sm:px-6 md:px-8
    `}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Image
            src={avatar}
            alt={name}
            className="
              h-10 w-10 
              rounded-full 
              object-cover 
              ring-2 ring-white 
              dark:ring-gray-700
            "
          />
          <span
            className="
              absolute 
              bottom-0 right-0 
              h-3 w-3 
              rounded-full 
              border-2 border-white 
              dark:border-gray-800
            "
            style={{ backgroundColor: getStatusColor() }}
          />
        </div>
        <div>
          <h2 className={`
            text-sm font-semibold 
            text-gray-900 
            dark:text-white
          `}>
            {name}
          </h2>
          <p className={`
            text-xs 
            text-gray-500 
            dark:text-gray-400
          `}>
            {getStatusText()}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {[
          { Icon: VideoCameraIcon, label: 'Video Call' },
          { Icon: PhoneIcon, label: 'Voice Call' },
          { Icon: EllipsisHorizontalIcon, label: 'More Options' }
        ].map(({ Icon, label }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={label}
            className={`
              rounded-full 
              p-2 
              text-gray-500 
              hover:bg-gray-100 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:ring-opacity-50
              dark:text-gray-400 
              dark:hover:bg-gray-700
              transition-all 
              duration-200
            `}
          >
            <Icon className="h-5 w-5" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}