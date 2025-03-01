import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { signIn, signUp, resetPassword } from '../utils/firebase';
import toast from 'react-hot-toast';
import { BackButton } from './BackButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

type AuthMode = 'signin' | 'signup' | 'reset';

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    // Reset form when modal opens/closes
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setDisplayName('');
      setMode('signin');
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signin') {
        const user = await signIn(email, password);
        toast.success('Signed in successfully!');
        onSuccess(user);
        onClose();
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }
        
        if (password.length < 6) {
          toast.error('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        const user = await signUp(email, password, displayName);
        toast.success('Account created successfully!');
        onSuccess(user);
        onClose();
      } else if (mode === 'reset') {
        await resetPassword(email);
        toast.success('Password reset email sent!');
        setMode('signin');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <BackButton onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0a0b14] border border-purple-500/20 rounded-2xl p-8 w-full max-w-md mx-4 relative overflow-hidden"
          >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
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
                  <Sparkles className="h-12 w-12 text-purple-500" />
                </motion.div>
              </div>

              <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h2>
              
              <p className="text-gray-400 text-center mb-6">
                {mode === 'signin' 
                  ? 'Sign in to access your Cryptoverse account' 
                  : mode === 'signup' 
                    ? 'Join the future of crypto predictions' 
                    : 'We\'ll send you a link to reset your password'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required={mode === 'signup'}
                        className="pl-10 w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {mode !== 'reset' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={mode !== 'reset'}
                        className="pl-10 w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={mode === 'signup'}
                        className="pl-10 w-full bg-black/40 border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-3 font-medium flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all"
                  type="submit"
                  disabled={loading}
                >
                  <span>
                    {mode === 'signin' 
                      ? 'Sign In' 
                      : mode === 'signup' 
                        ? 'Create Account' 
                        : 'Send Reset Link'}
                  </span>
                  {!loading && <ArrowRight className="h-5 w-5" />}
                  {loading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                {mode === 'signin' && (
                  <>
                    <button
                      onClick={() => setMode('reset')}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                    <div className="mt-4">
                      <span className="text-gray-400">Don't have an account? </span>
                      <button
                        onClick={() => setMode('signup')}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Sign up
                      </button>
                    </div>
                  </>
                )}

                {mode === 'signup' && (
                  <div>
                    <span className="text-gray-400">Already have an account? </span>
                    <button
                      onClick={() => setMode('signin')}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Sign in
                    </button>
                  </div>
                )}

                {mode === 'reset' && (
                  <button
                    onClick={() => setMode('signin')}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Back to sign in
                  </button>
                )}
              </div>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-purple-500/30"
                  initial={{ 
                    x: Math.random() * 100 - 50 + "%", 
                    y: Math.random() * 100 - 50 + "%",
                    opacity: 0.3
                  }}
                  animate={{ 
                    x: [
                      Math.random() * 100 - 50 + "%", 
                      Math.random() * 100 - 50 + "%", 
                      Math.random() * 100 - 50 + "%"
                    ],
                    y: [
                      Math.random() * 100 - 50 + "%", 
                      Math.random() * 100 - 50 + "%", 
                      Math.random() * 100 - 50 + "%"
                    ],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}