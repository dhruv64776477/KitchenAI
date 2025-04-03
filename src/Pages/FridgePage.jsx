import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ThemeContext } from "../App.jsx";
import { motion } from "framer-motion";

const FridgePage = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const [filter, setFilter] = useState("all");

  const fridgeItems = [
    { id: 1, name: "Milk", quantity: "1L", expiryDate: "2025-04-02", image: "/api/placeholder/80/80", status: "expiring-soon" },
    { id: 2, name: "Eggs", quantity: "6 pcs", expiryDate: "2025-04-10", image: "/api/placeholder/80/80", status: "fresh" },
    { id: 3, name: "Chicken Breast", quantity: "500g", expiryDate: "2025-03-30", image: "/api/placeholder/80/80", status: "expiring-soon" },
    { id: 4, name: "Spinach", quantity: "200g", expiryDate: "2025-03-31", image: "/api/placeholder/80/80", status: "expiring-soon" },
    { id: 5, name: "Apples", quantity: "4 pcs", expiryDate: "2025-04-05", image: "/api/placeholder/80/80", status: "fresh" },
    { id: 6, name: "Yogurt", quantity: "500g", expiryDate: "2025-04-01", image: "/api/placeholder/80/80", status: "expiring-soon" },
  ];

  // Filter items based on selection
  const filteredItems = filter === "all" ? fridgeItems : fridgeItems.filter((item) => item.status === "expiring-soon");

  return (
    <motion.div 
      className="px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading + Sort Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <motion.h1 
          className="text-lg font-bold md:text-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Fridge Inventory
        </motion.h1>

        {/* Sort Buttons */}
        <div className="flex gap-2  py-2">
          <motion.button
            className={`btn-filter ${darkMode ? "dark-btn" : "light-btn"} ${filter === "all" ? "active-btn" : ""}`}
            onClick={() => setFilter("all")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          <motion.button
            className={`btn-filter ${darkMode ? "dark-btn" : "light-btn"} ${filter === "expiring-soon" ? "active-btn" : ""}`}
            onClick={() => setFilter("expiring-soon")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Expiring Soon
          </motion.button>
        </div>
      </div>

      {/* Grid Items */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            className={`${darkMode ? "bg-gray-700" : "bg-white"} p-3 rounded-lg shadow-md`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full" />
            </div>
            <h3 className="font-bold text-center">{item.name}</h3>
            <div className={`text-sm text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p>{item.quantity}</p>
              <p>Expires: {new Date(item.expiryDate).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
        <motion.div
          className={`${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-100 hover:bg-gray-200"} p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={32} className={darkMode ? "text-gray-300" : "text-gray-400"} />
          <p className="mt-2">Add Item</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FridgePage;
