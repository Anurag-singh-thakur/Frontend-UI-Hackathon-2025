'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { COLORS } from './ChatHeader';
import { House } from 'lucide-react';
import { Users } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';
const navigation = [
  { name: 'Chats', href: '/', icon: MessageCircleMore },
  { name: 'Groups', href: '/groups', icon: Users },
  { name: 'Profile', href: '/profile', icon: House },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div 
      className={`
        flex 
        h-full 
        w-64 
        flex-col 
        bg-white 
        shadow-sm 
        dark:bg-gray-800
        border-r 
        border-gray-200 
        dark:border-gray-700
      `}
    >
      <div 
        className={`
          flex 
          h-16 
          items-center 
          justify-center 
          border-b 
          border-gray-200 
          dark:border-gray-700
        `}
      >
        <h1 
          className={`
            text-xl 
            font-bold 
            text-gray-900 
            dark:text-white
          `}
        >
          ChatApp
        </h1>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.href}
                className={`
                  group 
                  flex 
                  items-center 
                  rounded-md 
                  px-3 
                  py-2 
                  text-sm 
                  font-medium 
                  transition-all 
                  duration-200 
                  ease-in-out
                  ${
                    isActive
                      ? `
                        bg-gray-200 
                        text-gray-900 
                        dark:bg-gray-700 
                        dark:text-white
                      `
                      : `
                        text-gray-600 
                        hover:bg-gray-100 
                        hover:text-gray-900 
                        dark:text-gray-300 
                        dark:hover:bg-gray-700 
                        dark:hover:text-white
                      `
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 
                    h-6 
                    w-6 
                    flex-shrink-0 
                    transition-colors 
                    duration-200 
                    ease-in-out
                    ${
                      isActive
                        ? `
                          text-gray-700 
                          dark:text-gray-200
                        `
                        : `
                          text-gray-400 
                          group-hover:text-gray-600 
                          dark:text-gray-500 
                          dark:group-hover:text-gray-300
                        `
                    }
                  `}
                />
                {item.name}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </div>
  );
}