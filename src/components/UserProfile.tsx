import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, ChevronDown, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export function UserProfile() {
  const { currentUser, logout, userProfile } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  if (!currentUser || !userProfile) return null;

  const displayName = userProfile.displayName || 'Crypto User';
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 rounded-full pr-3 pl-1 py-1 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
          {initials}
        </div>
        <span className="text-white text-sm hidden sm:inline">{displayName}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </motion.button>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-48 bg-[#1a1b23] border border-purple-500/20 rounded-lg shadow-xl z-50"
        >
          <div className="p-3 border-b border-gray-700">
            <p className="text-white font-medium">{displayName}</p>
            <p className="text-gray-400 text-sm truncate">{userProfile.email}</p>
          </div>
          <div className="p-1">
            <button
              className="flex items-center space-x-2 w-full px-3 py-2 text-left text-white hover:bg-white/5 rounded-md transition-colors"
              onClick={() => {
                setShowDropdown(false);
                toast.success('Profile settings will be available soon!');
              }}
            >
              <User className="h-4 w-4 text-gray-400" />
              <span>Profile</span>
            </button>
            <button
              className="flex items-center space-x-2 w-full px-3 py-2 text-left text-white hover:bg-white/5 rounded-md transition-colors"
              onClick={() => {
                setShowDropdown(false);
                toast.success('Security settings will be available soon!');
              }}
            >
              <Shield className="h-4 w-4 text-gray-400" />
              <span>Security</span>
            </button>
            <button
              className="flex items-center space-x-2 w-full px-3 py-2 text-left text-white hover:bg-white/5 rounded-md transition-colors"
              onClick={() => {
                setShowDropdown(false);
                toast.success('Settings will be available soon!');
              }}
            >
              <Settings className="h-4 w-4 text-gray-400" />
              <span>Settings</span>
            </button>
          </div>
          <div className="p-1 border-t border-gray-700">
            <button
              className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-400 hover:bg-white/5 rounded-md transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}