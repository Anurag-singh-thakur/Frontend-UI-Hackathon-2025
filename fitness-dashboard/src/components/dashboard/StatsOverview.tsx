'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ActivityIcon, FlameIcon, FootprintsIcon, TimerIcon } from 'lucide-react';

const stats = [
  {
    title: 'Daily Steps',
    value: '8,547',
    target: '10,000',
    icon: FootprintsIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Calories Burned',
    value: '2,345',
    target: '2,500',
    icon: FlameIcon,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Active Minutes',
    value: '45',
    target: '60',
    icon: TimerIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Workouts',
    value: '3',
    target: '4',
    icon: ActivityIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-gray-500">
                  {stat.value}/{stat.target}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {stat.value}
              </h3>
              <p className="text-gray-500">{stat.title}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}