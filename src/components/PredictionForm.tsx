import React, { useState } from 'react';
import { CoinsIcon as CoinIcon, Timer, DollarSign } from 'lucide-react';
import { PredictionInput } from '../types';

const SUPPORTED_CURRENCIES = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' }
];

interface Props {
  onSubmit: (input: PredictionInput) => void;
}

export function PredictionForm({ onSubmit }: Props) {
  const [input, setInput] = useState<PredictionInput>({
    currency: 'bitcoin',
    amount: 1000,
    period: 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-xl backdrop-blur-sm">
      <div>
        <label className="block text-sm font-medium text-gray-200">Select Currency</label>
        <div className="mt-1 relative">
          <CoinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={input.currency}
            onChange={(e) => setInput({ ...input, currency: e.target.value })}
            className="pl-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
          >
            {SUPPORTED_CURRENCIES.map(currency => (
              <option key={currency.id} value={currency.id}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Investment Amount (USD)</label>
        <div className="mt-1 relative">
          <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="number"
            min="100"
            value={input.amount}
            onChange={(e) => setInput({ ...input, amount: Number(e.target.value) })}
            className="pl-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Investment Period (Days)</label>
        <div className="mt-1 relative">
          <Timer className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="number"
            min="1"
            max="365"
            value={input.period}
            onChange={(e) => setInput({ ...input, period: Number(e.target.value) })}
            className="pl-10 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Calculate Prediction
      </button>
    </form>
  );
}