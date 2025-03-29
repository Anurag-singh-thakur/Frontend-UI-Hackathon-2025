'use client';

import { motion } from 'framer-motion';
import { CameraIcon, PencilIcon } from '@heroicons/react/24/outline';
import { COLORS } from './ChatHeader';

export default function Profile() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
        {/* Cover Photo */}
        <div className="relative h-48 bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              absolute 
              bottom-4 
              right-4 
              rounded-full 
              bg-white 
              p-2 
              text-gray-600 
              shadow-lg 
              hover:text-gray-900 
              dark:bg-gray-700 
              dark:text-gray-300 
              dark:hover:text-white
            `}
          >
            <CameraIcon className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex items-end space-x-5">
            <div className="-mt-12">
              <div className="relative inline-block">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Profile"
                  className={`
                    h-24 
                    w-24 
                    rounded-full 
                    border-4 
                    border-white 
                    object-cover 
                    dark:border-gray-800
                  `}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    absolute 
                    bottom-0 
                    right-0 
                    rounded-full 
                    bg-white 
                    p-1 
                    text-gray-600 
                    shadow-lg 
                    hover:text-gray-900 
                    dark:bg-gray-700 
                    dark:text-gray-300 
                    dark:hover:text-white
                  `}
                >
                  <CameraIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            <div className="flex-1 space-y-1 pt-2">
              <div className="flex items-center justify-between">
                <h2 
                  className={`
                    text-2xl 
                    font-bold 
                    text-gray-900 
                    dark:text-white
                  `}
                >
                  John Doe
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex 
                    items-center 
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
                  <PencilIcon className="h-4 w-4" />
                  <span>Edit Profile</span>
                </motion.button>
              </div>
              <p 
                className={`
                  text-gray-500 
                  dark:text-gray-400
                `}
              >
                @johndoe
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {[
                { label: 'Email', value: 'john.doe@example.com' },
                { label: 'Phone', value: '+1 (555) 123-4567' },
                { label: 'Location', value: 'San Francisco, CA' }
              ].map(({ label, value }) => (
                <div key={label}>
                  <h3 
                    className={`
                      text-sm 
                      font-medium 
                      text-gray-500 
                      dark:text-gray-400
                    `}
                  >
                    {label}
                  </h3>
                  <p 
                    className={`
                      text-gray-900 
                      dark:text-white
                    `}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h3 
                  className={`
                    text-sm 
                    font-medium 
                    text-gray-500 
                    dark:text-gray-400
                  `}
                >
                  Status
                </h3>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                  <span 
                    className={`
                      text-gray-900 
                      dark:text-white
                    `}
                  >
                    Online
                  </span>
                </div>
              </div>
              {[
                { label: 'Member Since', value: 'March 2024' },
                { 
                  label: 'Bio', 
                  value: 'Frontend developer passionate about creating beautiful and functional user interfaces.' 
                }
              ].map(({ label, value }) => (
                <div key={label}>
                  <h3 
                    className={`
                      text-sm 
                      font-medium 
                      text-gray-500 
                      dark:text-gray-400
                    `}
                  >
                    {label}
                  </h3>
                  <p 
                    className={`
                      text-gray-900 
                      dark:text-white
                    `}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div 
            className={`
              mt-8 
              grid 
              grid-cols-3 
              gap-4 
              rounded-lg 
              bg-gray-100 
              p-4 
              dark:bg-gray-700
            `}
          >
            {[
              { label: 'Messages', value: '152' },
              { label: 'Groups', value: '8' },
              { label: 'Contacts', value: '47' }
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div 
                  className={`
                    text-2xl 
                    font-bold 
                    text-gray-800 
                    dark:text-white
                  `}
                >
                  {value}
                </div>
                <div 
                  className={`
                    text-sm 
                    text-gray-500 
                    dark:text-gray-400
                  `}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}