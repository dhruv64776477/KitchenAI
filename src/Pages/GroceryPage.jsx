import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { ThemeContext } from "../App.jsx";

const GroceryPage = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const [groceryList, setGroceryList] = useState([
    { id: 1, name: "Bread", category: "Bakery", quantity: "1 loaf", checked: false },
    { id: 2, name: "Tomatoes", category: "Vegetables", quantity: "500g", checked: false },
    { id: 3, name: "Orange Juice", category: "Beverages", quantity: "1L", checked: true },
  ]);

  const aiSuggestions = [
    { name: "Butter", category: "Dairy", quantity: "250g" },
    { name: "Pasta", category: "Grains", quantity: "500g" },
    { name: "Onions", category: "Vegetables", quantity: "1kg" },
  ];

  // Toggle checked status
  const toggleGroceryItem = (id) => {
    setGroceryList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Add suggested item to grocery list
  const addSuggestedItem = (item) => {
    setGroceryList((prevList) => {
      // Check if item already exists
      const itemExists = prevList.some((grocery) => grocery.name === item.name);
      if (itemExists) return prevList;

      // Add new item with a unique ID
      return [...prevList, { ...item, id: Date.now(), checked: false }];
    });
  };

  return (
    <motion.div
      className="px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header & Add Item Button */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-3xl md:text-5xl font-bold tracking-wide">
          Smart Grocery List
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={`btn-filter flex justify-between gap-2 ${darkMode ? "dark-btn" : "light-btn"}`}
        >
          <PlusCircle size={20} />
          Add Item
        </motion.button>
      </div>

      {/* AI Suggestions */}
      <motion.div
        className={`${
          darkMode ? "bg-gray-700/80" : "bg-white/90"
        } rounded-lg shadow-lg p-5 backdrop-blur-md border border-gray-200`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className={`font-bold ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>
          AI Suggestions
        </h3>
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Click to add items to your grocery list
        </p>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-8">
          {aiSuggestions.map((item, index) => (
            <motion.div
              key={index}
              className="bg-green-100 p-2 rounded text-sm text-green-800 shadow-sm cursor-pointer hover:bg-green-200 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => addSuggestedItem(item)}
            >
              {item.name}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Grocery List */}
      <h3 className="font-bold text-xl mt-6 mb-3">Your List</h3>
      <div className="space-y-3">
        {groceryList.map((item, index) => (
          <motion.div
            key={item.id}
            className={`p-4 rounded-lg flex items-center gap-3 cursor-pointer shadow-md transition-all ${
              darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
            } ${item.checked ? "opacity-70" : ""}`}
            onClick={() => toggleGroceryItem(item.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="checkbox"
              checked={item.checked}
              className="w-5 h-5 cursor-pointer"
              readOnly
            />
            <div className="flex-1">
              <p className={`font-medium ${item.checked ? "line-through text-gray-500" : ""}`}>
                {item.name}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.category}</span>
                <span>{item.quantity}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Export Button */}
      <motion.button
        className={`btn-filter w-full py-3 mt-4 text-lg font-semibold ${darkMode ? "dark-btn" : "light-btn"}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        Export List
      </motion.button>
    </motion.div>
  );
};

export default GroceryPage;
