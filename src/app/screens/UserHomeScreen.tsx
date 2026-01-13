import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';
import { motion } from 'framer-motion';

import workerIcon from '@/assets/images/icon-worker.png';
import homeNeedsIcon from '@/assets/images/icon-service-painting.png';
import dailyHelpIcon from '@/assets/images/icon-service-cook.png';
import agricultureIcon from '@/assets/images/icon-worker.png';
import partTimeIcon from '@/assets/images/icon-parttime.png';

interface UserHomeScreenProps {
  village: string;
  onSelectCategory: (category: string) => void;
}

export function UserHomeScreen({ village, onSelectCategory }: UserHomeScreenProps) {
  const categories = [
    {
      id: 'worker-needs',
      title: 'Worker Needs',
      icon: workerIcon,
      description: 'Electrician, Plumber, Carpenter',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 'home-needs',
      title: 'Home Needs',
      icon: homeNeedsIcon,
      description: 'Cleaning, Painting, Repairs',
      gradient: 'from-green-500 to-green-600',
    },
    {
      id: 'daily-help',
      title: 'Daily Help',
      icon: dailyHelpIcon,
      description: 'Cook, Maid, Caretaker',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      id: 'agriculture',
      title: 'Agriculture Needs',
      icon: agricultureIcon,
      description: 'Farm Labor, Tractor, Harvesting',
      gradient: 'from-yellow-500 to-amber-600',
    },
    {
      id: 'part-time',
      title: 'Part-time / On-spot Work',
      icon: partTimeIcon,
      description: 'Temporary help, Delivery',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <MobileFrame>
      <div className="min-h-[607px] bg-[#F7F8FC]">
        {/* Header with gradient animation */}
        <motion.div
          className="bg-gradient-to-br from-[#1A2238] via-[#2A3248] to-[#1A2238] text-white p-6 rounded-b-3xl relative overflow-hidden"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Animated accent */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A3D] rounded-full opacity-20 blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="flex items-center justify-between mb-2 relative z-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[#9DAAF2] mb-1">Welcome to</p>
              <h2 className="text-white">vserveu</h2>
            </motion.div>
            <motion.div
              className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </motion.div>
          </div>
          <motion.div
            className="flex items-center gap-2 relative z-10"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </motion.svg>
            <span className="text-sm">{village}</span>
          </motion.div>
        </motion.div>

        {/* Categories */}
        <div className="p-6 space-y-4">
          <motion.h3
            className="text-[#2E2E2E]"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Select Service Category
          </motion.h3>

          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card onClick={() => onSelectCategory(category.id)} className="p-5 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className="text-5xl"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={category.icon} alt={category.title} className="w-12 h-12 object-contain" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-[#1A2238] mb-1">{category.title}</h4>
                    <p className="text-sm text-[#2E2E2E] opacity-70">{category.description}</p>
                  </div>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </motion.svg>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
}