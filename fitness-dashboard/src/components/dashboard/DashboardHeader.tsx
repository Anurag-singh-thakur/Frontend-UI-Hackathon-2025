'use client';

import { motion } from 'framer-motion';
import { BellIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fitness Dashboard</h1>
        <p className="text-gray-500">Welcome back, Sarah!</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <BellIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SettingsIcon className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatar.jpg" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
}