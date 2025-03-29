// components/ChatList.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '2:30 PM',
    unread: 2,
  },
  // Add more mock chats as needed
];

export default function ChatList() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => (
          <motion.div
            key={chat.id}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            className={`cursor-pointer p-4 ${
              selectedChat === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
            onClick={() => setSelectedChat(chat.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {chat.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {chat.time}
                </span>
                {chat.unread > 0 && (
                  <span className="mt-1 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}