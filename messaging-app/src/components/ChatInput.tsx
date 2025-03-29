'use client';
import { PaperAirplaneIcon, PaperClipIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {toast} from 'sonner';
import { COLORS } from './ChatHeader'; // Reusing the color palette

export default function ChatInput() {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      toast("Message Sent Successfully");
      setMessage('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`
        border-t border-gray-200 
        p-4 
        dark:border-gray-700
      `}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        {[
          { Icon: PaperClipIcon, label: 'Attach File' },
          { Icon: FaceSmileIcon, label: 'Emoji' }
        ].map(({ Icon, label }) => (
          <motion.button
            key={label}
            type="button"
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
              focus:ring-gray-300 
              dark:text-gray-400 
              dark:hover:bg-gray-700
              transition-all 
              duration-200
            `}
          >
            <Icon className="h-5 w-5" />
          </motion.button>
        ))}
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={`
            flex-1 
            rounded-full 
            border 
            border-gray-300 
            bg-white 
            px-4 
            py-2 
            text-sm 
            focus:border-gray-500 
            focus:outline-none 
            focus:ring-2 
            focus:ring-gray-200 
            dark:border-gray-600 
            dark:bg-gray-700 
            dark:text-white
            dark:focus:ring-gray-600
          `}
        />
        
        <motion.button
          type="submit"
          disabled={!message.trim()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Send Message"
          className={`
            rounded-full 
            bg-gray-800 
            p-2 
            text-white 
            hover:bg-gray-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-gray-600 
            focus:ring-opacity-50
            disabled:opacity-50 
            disabled:cursor-not-allowed
            transition-all 
            duration-200
            dark:bg-gray-700 
            dark:hover:bg-gray-600
          `}
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </motion.button>
      </div>
    </form>
  );
}