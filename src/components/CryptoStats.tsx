import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Shield } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    title: '24h Trading Volume',
    value: '$48.2B',
    change: '+12.5%',
    isPositive: true
  },
  {
    icon: Users,
    title: 'Active Traders',
    value: '2.8M',
    change: '+5.2%',
    isPositive: true
  },
  {
    icon: Clock,
    title: 'Avg Transaction Time',
    value: '1.2s',
    change: '-15%',
    isPositive: true
  },
  {
    icon: Shield,
    title: 'Security Rating',
    value: 'A+',
    change: 'Verified',
    isPositive: true
  }
];

export function CryptoStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500/20 rounded-lg p-3">
              <stat.icon className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}