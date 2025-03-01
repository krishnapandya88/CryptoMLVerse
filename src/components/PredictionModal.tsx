import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { PredictionInput } from '../types';
import { BackButton } from './BackButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: PredictionInput) => void;
  loading: boolean;
}

const PERIODS = [
  { value: 7, label: '7 days' },
  { value: 30, label: '30 days' },
  { value: 90, label: '90 days' },
  { value: 180, label: '180 days' },
  { value: 365, label: '1 year' }
];

const CURRENCIES = [
  { id: 'bitcoin', name: 'Bitcoin (BTC)', icon: '₿' },
  { id: 'ethereum', name: 'Ethereum (ETH)', icon: 'Ξ' },
  { id: 'binancecoin', name: 'Binance Coin (BNB)', icon: 'BNB' },
  { id: 'cardano', name: 'Cardano (ADA)', icon: '₳' },
  { id: 'solana', name: 'Solana (SOL)', icon: 'SOL' },
  { id: 'polkadot', name: 'Polkadot (DOT)', icon: '●' },
  { id: 'dogecoin', name: 'Dogecoin (DOGE)', icon: 'Ð' }
];

export function PredictionModal({ isOpen, onClose, onSubmit, loading }: Props) {
  const [input, setInput] = useState<PredictionInput>({
    currency: 'bitcoin',
    amount: 1000,
    period: 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <BackButton onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1a1b23] rounded-2xl p-8 w-full max-w-md mx-4 relative"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              AI-Powered Return Prediction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Cryptocurrency
                </label>
                <select
                  value={input.currency}
                  onChange={(e) => setInput({ ...input, currency: e.target.value })}
                  className="w-full bg-[#2a2b35] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.icon} {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Amount (USD)
                </label>
                <input
                  type="number"
                  min="100"
                  value={input.amount}
                  onChange={(e) => setInput({ ...input, amount: Number(e.target.value) })}
                  className="w-full bg-[#2a2b35] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Period
                </label>
                <select
                  value={input.period}
                  onChange={(e) => setInput({ ...input, period: Number(e.target.value) })}
                  className="w-full bg-[#2a2b35] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {PERIODS.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-4 font-medium flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all"
                type="submit"
              >
                <span>Calculate Prediction</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}