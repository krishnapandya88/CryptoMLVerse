export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidenceScore: number;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  newsSentiment: number;
  technicalScore: number;
  riskMetrics: {
    volatility: number;
    maxDrawdown: number;
    sharpeRatio: number;
  };
}

export interface PredictionInput {
  currency: string;
  amount: number;
  period: number;
}