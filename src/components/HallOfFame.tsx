import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Star, Award, TrendingUp, Users, Gem, Shield } from 'lucide-react';
import { BackButton } from './BackButton';
import toast from 'react-hot-toast';

interface EliteTrader {
  rank: number;
  name: string;
  title: string;
  roi: number;
  trades: number;
  accuracy: number;
  avatar: string;
  testimonial: string;
  specialties: string[];
  achievements: string[];
}

const eliteTraders: EliteTrader[] = [
  {
    rank: 1,
    name: "Alex Quantum",
    title: "Crypto Oracle",
    roi: 487.32,
    trades: 1243,
    accuracy: 92.5,
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=150&h=150",
    testimonial: "Using advanced quantum algorithms and AI, I've developed strategies that consistently outperform the market.",
    specialties: ["Quantum Trading", "AI Integration", "Risk Management"],
    achievements: ["Highest ROI 2024", "Most Accurate Predictions", "Innovation Award"]
  },
  {
    rank: 2,
    name: "Sarah Chen",
    title: "Pattern Master",
    roi: 392.18,
    trades: 856,
    accuracy: 89.7,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    testimonial: "Technical analysis combined with sentiment tracking has been my key to success in volatile markets.",
    specialties: ["Technical Analysis", "Market Psychology", "Trend Prediction"],
    achievements: ["Best Technical Analyst", "Community Leader", "Risk-Adjusted Returns"]
  },
  {
    rank: 3,
    name: "Marcus Wolf",
    title: "DeFi Pioneer",
    roi: 298.45,
    trades: 1567,
    accuracy: 87.3,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    testimonial: "Focusing on DeFi protocols and cross-chain arbitrage has opened up new possibilities in crypto trading.",
    specialties: ["DeFi Strategy", "Cross-chain Trading", "Yield Optimization"],
    achievements: ["DeFi Innovator", "Highest Volume Trader", "Strategy Award"]
  }
];

const benefits = [
  {
    icon: Crown,
    title: "AI-Powered Insights",
    description: "Access to our most advanced prediction algorithms"
  },
  {
    icon: Star,
    title: "Premium Analytics",
    description: "Real-time market analysis and custom indicators"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Advanced portfolio protection strategies"
  },
  {
    icon: Gem,
    title: "Elite Network",
    description: "Connect with top traders and investors"
  }
];

export default function HallOfFame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedTrader, setSelectedTrader] = useState<EliteTrader | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');

  const handleRequestAccess = () => {
    if (!showEmailForm) {
      setShowEmailForm(true);
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    window.location.href = `mailto:alphabusiness0601@gmail.com?subject=Elite Access Request&body=I'm interested in joining Cryptoverse Elite.`;
    setShowEmailForm(false);
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <BackButton onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      >
        <div className="max-w-6xl w-full space-y-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <motion.div 
              className="flex justify-center mb-4"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(234, 179, 8, 0)",
                  "0 0 20px 10px rgba(234, 179, 8, 0.3)",
                  "0 0 0 0 rgba(234, 179, 8, 0)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                <Trophy className="h-16 w-16 text-yellow-500" />
              </motion.div>
            </motion.div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
              Cryptoverse Elite
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              The most exclusive crypto trading club powered by quantum AI
            </p>
          </motion.div>

          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Crown className="h-6 w-6 text-yellow-500 mr-2" />
              Elite Traders Leaderboard
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eliteTraders.map((trader, index) => (
                <motion.div
                  key={trader.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-black/40 rounded-xl p-6 border border-yellow-500/10 cursor-pointer transform transition-all duration-300 hover:border-yellow-500/30"
                  onClick={() => setSelectedTrader(trader)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={trader.avatar}
                      alt={trader.name}
                      className="w-16 h-16 rounded-full border-2 border-yellow-500"
                    />
                    <div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 font-bold">#{trader.rank}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-purple-400">{trader.title}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">{trader.name}</h4>
                      <div className="flex items-center space-x-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">+{trader.roi}% ROI</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Trades</p>
                      <p className="text-white font-semibold">{trader.trades}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Accuracy</p>
                      <p className="text-white font-semibold">{trader.accuracy}%</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="h-6 w-6 text-yellow-500 mr-2" />
              Elite Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="bg-black/40 rounded-xl p-6 border border-yellow-500/10 transform transition-all duration-300 hover:border-yellow-500/30"
                >
                  <benefit.icon className="h-8 w-8 text-yellow-500 mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <AnimatePresence mode="wait">
              {showEmailForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-md mx-auto"
                >
                  <div className="flex space-x-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-black/40 border border-yellow-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRequestAccess}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all"
                    >
                      Submit
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRequestAccess}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl text-lg font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all inline-flex items-center space-x-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Request Elite Access</span>
                </motion.button>
              )}
            </AnimatePresence>
            <p className="mt-4 text-sm text-gray-400">
              Only top 5% of traders qualify for elite membership
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedTrader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && setSelectedTrader(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1b23] rounded-2xl p-8 w-full max-w-2xl mx-4"
            >
              <div className="flex items-center space-x-6 mb-8">
                <img
                  src={selectedTrader.avatar}
                  alt={selectedTrader.name}
                  className="w-24 h-24 rounded-full border-2 border-yellow-500"
                />
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedTrader.name}</h3>
                  <p className="text-xl text-purple-400">{selectedTrader.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-gray-400 mb-1">Total ROI</p>
                  <p className="text-3xl font-bold text-green-500">+{selectedTrader.roi}%</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-gray-400 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-yellow-500">{selectedTrader.accuracy}%</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Specialties</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedTrader.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Achievements</h4>
                <div className="grid grid-cols-1 gap-3">
                  {selectedTrader.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-6 mb-8">
                <h4 className="text-xl font-semibold text-white mb-3">Trading Philosophy</h4>
                <p className="text-gray-300 italic">"{selectedTrader.testimonial}"</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTrader(null)}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all"
              >
                Close Profile
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}