import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../App.jsx";

const MealsPage = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const mealSuggestions = [
    { id: 1, name: "Chicken Spinach Salad", ingredients: ["Chicken Breast", "Spinach", "Olive Oil"], image: "/api/placeholder/150/150", matchPercentage: 95 },
    { id: 2, name: "Apple Yogurt Parfait", ingredients: ["Yogurt", "Apples", "Honey"], image: "/api/placeholder/150/150", matchPercentage: 90 },
    { id: 3, name: "Scrambled Eggs", ingredients: ["Eggs", "Milk", "Salt"], image: "/api/placeholder/150/150", matchPercentage: 85 },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p className="text-3xl md:text-5xl font-bold mb-4" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        Meal Suggestions
      </motion.p>
      <motion.p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-6`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        AI-powered meal recommendations based on your fridge items
      </motion.p>

      {/* Meal Cards */}
      <motion.div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6`}>
        {mealSuggestions.map((meal, index) => (
          <motion.div
            key={meal.id}
            className={`${darkMode ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{meal.name}</h3>
                <motion.span
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {meal.matchPercentage}% match
                </motion.span>
              </div>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm mb-4`}>Ingredients you have:</p>
              <ul className="text-sm">
                {meal.ingredients.map((ingredient, idx) => (
                  <motion.li key={idx} className="mb-1 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + idx * 0.1 }}>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                      className={`btn-filter w-full py-3 mt-4 text-lg font-semibold ${darkMode ? "dark-btn" : "light-btn"}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cook This
                    </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Weekly Planner */}
      {!isMobile && (
        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
          <h2 className="text-xl font-bold mb-4">Weekly Meal Planner</h2>
          <motion.div
            className={`${darkMode ? "bg-gray-700" : "bg-white"} rounded-lg shadow-md p-4`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <motion.div
                  key={day}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <p className="font-bold">{day}</p>
                  <motion.div
                    className={`h-24 border-2 border-dashed ${darkMode ? "border-gray-600" : "border-gray-300"} rounded-md mt-2 flex items-center justify-center`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-400"} text-sm`}>Drag meal here</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MealsPage;
