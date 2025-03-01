import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wallet, Bell, Briefcase, ArrowRight, TrendingUp, ChevronRight, Trophy, LogIn } from 'lucide-react';
import { PredictionModal } from './components/PredictionModal';
import { PredictionResult } from './components/PredictionResult';
import { NewsSection } from './components/NewsSection';
import { CryptoStats } from './components/CryptoStats';
import HallOfFame from './components/HallOfFame';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { CryptoPredictionModel } from './utils/ml';
import { MetaMaskService } from './utils/metamask';
import { CryptoData, PredictionInput } from './types';
import { useAuth } from './context/AuthContext';
import toast from 'react-hot-toast';

const predictionModel = new CryptoPredictionModel();
const metaMaskService = new MetaMaskService();

function App() {
  const { currentUser } = useAuth();
  const [prediction, setPrediction] = useState<CryptoData | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<boolean>(false);
  const predictionResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        await predictionModel.initialize();
      } catch (error) {
        console.error('Failed to initialize model:', error);
        toast.error('Failed to initialize prediction model');
      }
    };
    
    initModel();
    
    const notificationsEnabled = localStorage.getItem('notifications') === 'true';
    setNotifications(notificationsEnabled);
  }, []);

  const handleConnectWallet = async () => {
    try {
      const address = await metaMaskService.connect();
      setWalletAddress(address);
      const balance = await metaMaskService.getBalance(address);
      const network = await metaMaskService.getNetwork();
      toast.success(`Connected to ${network} network. Balance: ${parseFloat(balance).toFixed(4)} ETH`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet');
    }
  };

  const handleNotifications = async () => {
    try {
      if (!notifications) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotifications(true);
          localStorage.setItem('notifications', 'true');
          toast.success('Notifications enabled successfully!');
          new Notification('Cryptoverse Notifications Enabled', {
            body: 'You will now receive price alerts and important updates.',
            icon: '/vite.svg'
          });
        } else {
          toast.error('Please enable notifications in your browser settings');
        }
      } else {
        setNotifications(false);
        localStorage.setItem('notifications', 'false');
        toast.success('Notifications disabled');
      }
    } catch (error) {
      toast.error('Failed to manage notifications');
    }
  };

  const handlePrediction = async (input: PredictionInput) => {
    if (!currentUser) {
      toast.error('Please sign in to make predictions');
      setShowAuthModal(true);
      return;
    }
    
    setLoading(true);
    try {
      if (!predictionModel) {
        throw new Error('Prediction model not initialized');
      }

      const result = await predictionModel.predict(input.currency, input.amount, input.period);
      setPrediction(result);
      
      setTimeout(() => {
        predictionResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      toast.success('Prediction generated successfully!');
    } catch (error: any) {
      console.error('Prediction error:', error);
      toast.error(error.message || 'Failed to generate prediction');
    } finally {
      setLoading(false);
      setShowPredictionModal(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: any) => {
    toast.success(`Welcome ${user.displayName || 'to Cryptoverse'}!`);
  };

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center cursor-pointer group"
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(168, 85, 247, 0)",
                    "0 0 0 10px rgba(168, 85, 247, 0.2)",
                    "0 0 0 20px rgba(168, 85, 247, 0)",
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
                className="relative"
              >
                <Sparkles className="h-8 w-8 text-purple-500 transform group-hover:rotate-180 transition-transform duration-500" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Cryptoverse</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <motion.a
                href="https://www.binance.com/en/square"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md hover:from-orange-600 hover:to-red-600 transition-all"
              >
                <span className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Crypto Square
                </span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHallOfFame(true)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-md hover:from-yellow-600 hover:to-amber-600 transition-all"
              >
                <span className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Hall of Fame
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNotifications}
                className={`p-2 transition-colors ${
                  notifications ? 'text-purple-400 hover:text-purple-300' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Bell className="h-6 w-6" />
              </motion.button>
              
              {!currentUser ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <span className="flex items-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </span>
                </motion.button>
              ) : (
                <UserProfile />
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleConnectWallet}
                className="p-2 text-gray-300 hover:text-white transition-colors relative group"
              >
                <Wallet className="h-6 w-6" />
                {walletAddress && (
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                  </span>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Predict Your Crypto Returns
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Use our advanced AI to forecast potential returns on your crypto investments.
            Make informed decisions with data-driven predictions powered by machine learning.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0)",
                "0 0 10px 0 rgba(168, 85, 247, 0.3)",
                "0 0 0 0 rgba(168, 85, 247, 0)"
              ],
              y: [0, -10, 0]
            }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                duration: 2
              },
              y: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }
            }}
            onClick={() => setShowPredictionModal(true)}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center mx-auto space-x-2"
          >
            <span>Calculate Your Returns</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl backdrop-blur-sm"
          >
            <TrendingUp className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-300">Leverage machine learning and technical analysis for accurate predictions</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-xl backdrop-blur-sm"
          >
            <ChevronRight className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Data</h3>
            <p className="text-gray-300">Get instant access to market data and sentiment analysis</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-6 rounded-xl backdrop-blur-sm"
          >
            <Wallet className="h-8 w-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Web3 Integration</h3>
            <p className="text-gray-300">Connect your wallet and track your portfolio performance</p>
          </motion.div>
        </div>

        <CryptoStats />

        <div ref={predictionResultRef}>
          {prediction && <PredictionResult data={prediction} />}
        </div>

        <NewsSection />
      </main>

      <PredictionModal
        isOpen={showPredictionModal}
        onClose={() => setShowPredictionModal(false)}
        onSubmit={handlePrediction}
        loading={loading}
      />

      <HallOfFame
        isOpen={showHallOfFame}
        onClose={() => setShowHallOfFame(false)}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;