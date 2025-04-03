import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { ShoppingCart, Utensils, AlertTriangle, List, Twitter, Facebook, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [animateSwipeUp, setAnimateSwipeUp] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken') || getCookie('authToken');
    if (token) {
      setAuthenticated(true);
      setTimeout(() => {
        setAnimateSwipeUp(true);
        setTimeout(() => navigate('/'), 1000);
      }, 500);
    }
  }, [navigate]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  };

  const handleGetStarted = () => navigate('/login');

  if (authenticated && animateSwipeUp) {
    return (
      <motion.div 
        className="fixed inset-0 bg-green-600 flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <div className="animate-spin h-12 w-12 border-4 border-green-500 rounded-full border-t-transparent"></div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`fixed inset-0 ${darkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-gray-900'} flex flex-col overflow-hidden`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    > 
      <header className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">KitchenAI</h1>
        
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 mt-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Your Smart Kitchen, Powered by AI</h2>
        <p className="text-xl opacity-80 max-w-2xl">Track groceries, prevent waste, and get meal ideas with ease.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mt-10">
          {[{ icon: ShoppingCart, text: "Smart Grocery Tracking" },
            { icon: Utensils, text: "AI Meal Suggestions" },
            { icon: AlertTriangle, text: "Expiry Alerts" },
            { icon: List, text: "Auto-Generated Lists" }].map((feature, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ delay : 0.1 ,scale: 1.2 }}
            >
              <feature.icon className="text-green-500 mx-auto mb-2" size={30} />
              <h3 className="font-semibold mb-1">{feature.text}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex gap-4 mt-10">
          <motion.button 
            onClick={handleGetStarted} 
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </main>

      <footer className="p-4 border-t border-gray-300 flex justify-between">
        <div className="flex gap-4">
          {[Twitter, Facebook, Instagram].map((Icon, index) => (
            <motion.div key={index} whileHover={{ scale: 1.2 }}>
              <Icon className="text-gray-500 hover:text-green-500 transition-colors" size={20} />
            </motion.div>
          ))}
        </div>
        <span className="text-sm text-gray-500">© 2025 KitchenAI</span>
      </footer>
    </motion.div>
  );
};

export default LandingPage;