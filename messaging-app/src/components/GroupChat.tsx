'use client';

import { motion } from 'framer-motion';
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';
import { COLORS } from './ChatHeader';

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'member';
  status: 'online' | 'offline';
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  lastActivity: Date;
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Design Team',
    description: 'Discuss design projects and share inspiration',
    members: [
      { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', role: 'admin', status: 'online' },
      { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', role: 'member', status: 'offline' },
    ],
    lastActivity: new Date(),
  },
  // Add more mock groups
];

export default function GroupChat() {
  return (
    <div className="flex h-full">
      {/* Group List */}
      <div 
        className={`
          w-80 
          border-r 
          border-gray-200 
          bg-white 
          dark:border-gray-700 
          dark:bg-gray-800
        `}
      >
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex 
              w-full 
              items-center 
              justify-center 
              space-x-2 
              rounded-lg 
              bg-gray-800 
              px-4 
              py-2 
              text-white 
              hover:bg-gray-700 
              dark:bg-gray-700 
              dark:hover:bg-gray-600
            `}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New Group</span>
          </motion.button>
        </div>
        <div className="overflow-y-auto">
          {mockGroups.map((group) => (
            <motion.div
              key={group.id}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              className={`
                cursor-pointer 
                p-4 
                transition-colors 
                hover:bg-gray-100 
                dark:hover:bg-gray-700
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <UserGroupIcon 
                    className={`
                      h-12 
                      w-12 
                      rounded-full 
                      bg-gray-100 
                      p-2 
                      text-gray-600 
                      dark:bg-gray-700 
                      dark:text-gray-300
                    `} 
                  />
                  <span 
                    className={`
                      absolute 
                      -bottom-1 
                      -right-1 
                      flex 
                      h-5 
                      w-5 
                      items-center 
                      justify-center 
                      rounded-full 
                      bg-gray-800 
                      text-xs 
                      text-white 
                      dark:bg-gray-700
                    `}
                  >
                    {group.members.length}
                  </span>
                </div>
                <div>
                  <h3 
                    className={`
                      font-medium 
                      text-gray-900 
                      dark:text-white
                    `}
                  >
                    {group.name}
                  </h3>
                  <p 
                    className={`
                      text-sm 
                      text-gray-500 
                      dark:text-gray-400
                    `}
                  >
                    {group.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Group Details */}
      <div 
        className={`
          flex-1 
          bg-gray-50 
          p-6 
          dark:bg-gray-900
        `}
      >
        <div 
          className={`
            rounded-lg 
            bg-white 
            p-6 
            shadow-sm 
            dark:bg-gray-800
          `}
        >
          <h2 
            className={`
              mb-4 
              text-xl 
              font-semibold 
              text-gray-900 
              dark:text-white
            `}
          >
            Design Team
          </h2>
          <div className="mb-6">
            <h3 
              className={`
                mb-2 
                text-sm 
                font-medium 
                text-gray-700 
                dark:text-gray-300
              `}
            >
              Description
            </h3>
            <p 
              className={`
                text-gray-600 
                dark:text-gray-400
              `}
            >
              Discuss design projects and share inspiration
            </p>
          </div>
          <div>
            <h3 
              className={`
                mb-3 
                text-sm 
                font-medium 
                text-gray-700 
                dark:text-gray-300
              `}
            >
              Members
            </h3>
            <div className="space-y-3">
              {mockGroups[0].members.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <p 
                        className={`
                          text-sm 
                          font-medium 
                          text-gray-900 
                          dark:text-white
                        `}
                      >
                        {member.name}
                      </p>
                      <p 
                        className={`
                          text-xs 
                          text-gray-500 
                          dark:text-gray-400
                        `}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <span 
                    className={`
                      h-2 
                      w-2 
                      rounded-full 
                      ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}
                    `} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}