import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { CryptoData } from '../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: CryptoData;
}

export function PredictionResult({ data }: Props) {
  const chartData = {
    labels: ['Current', 'Predicted'],
    datasets: [
      {
        label: 'Price Trend',
        data: [data.currentPrice, data.predictedPrice],
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.1,
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Price Prediction Chart',
        color: 'white'
      }
    },
    scales: {
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const getRecommendationColor = () => {
    switch (data.recommendation) {
      case 'BUY': return 'text-green-500';
      case 'SELL': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1b23] p-8 rounded-xl backdrop-blur-sm space-y-8 mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-400">Current Price</h3>
            <p className="text-3xl font-bold text-white">${data.currentPrice.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-400">Predicted Price</h3>
            <p className="text-3xl font-bold text-purple-500">${data.predictedPrice.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-400">Confidence Score</h3>
            <p className="text-2xl font-semibold text-white">{data.confidenceScore.toFixed(2)}%</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-400">Recommendation</h3>
            <p className={`text-2xl font-semibold ${getRecommendationColor()}`}>{data.recommendation}</p>
          </div>
        </div>

        <div className="h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-400">Market Sentiment</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">News Sentiment</p>
              <p className="text-lg font-medium text-white">{data.newsSentiment.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Technical Score</p>
              <p className="text-lg font-medium text-white">{data.technicalScore.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-400">Risk Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400">Volatility</p>
              <p className="text-lg font-medium text-white">{data.riskMetrics.volatility.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Max Drawdown</p>
              <p className="text-lg font-medium text-white">{data.riskMetrics.maxDrawdown.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Sharpe Ratio</p>
              <p className="text-lg font-medium text-white">{data.riskMetrics.sharpeRatio.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}