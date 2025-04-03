import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  List,
  AlertTriangle,
  Camera,
  PlusCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App.jsx";
import ReceiptUploader from "../Components/ReceiptUploader.jsx";
const HomePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate(); // For programmatic navigation
  const [showUploader, setShowUploader] = useState(false);
  const handleUploadSuccess = () => {
    setShowUploader(false);
  };
  const sampleData = {
    fridgeItems: [
      {
        id: 1,
        name: "Milk",
        category: "Dairy",
        quantity: "1L",
        expiryDate: "2025-04-02",
        image: "/api/placeholder/80/80",
        status: "expiring-soon",
      },
      {
        id: 2,
        name: "Eggs",
        category: "Dairy",
        quantity: "6 pcs",
        expiryDate: "2025-04-10",
        image: "/api/placeholder/80/80",
        status: "fresh",
      },
      {
        id: 3,
        name: "Chicken Breast",
        category: "Meat",
        quantity: "500g",
        expiryDate: "2025-03-30",
        image: "/api/placeholder/80/80",
        status: "expiring-soon",
      },
    ],
    mealSuggestions: [
      {
        id: 1,
        name: "Chicken Spinach Salad",
        ingredients: ["Chicken Breast", "Spinach", "Olive Oil"],
        image: "/api/placeholder/150/150",
        matchPercentage: 95,
      },
      {
        id: 2,
        name: "Apple Yogurt Parfait",
        ingredients: ["Yogurt", "Apples", "Honey"],
        image: "/api/placeholder/150/150",
        matchPercentage: 90,
      },
      {
        id: 3,
        name: "Scrambled Eggs",
        ingredients: ["Eggs", "Milk", "Salt"],
        image: "/api/placeholder/150/150",
        matchPercentage: 85,
      },
    ],
  };

  const expiringItems = sampleData.fridgeItems.filter(
    (item) => item.status === "expiring-soon"
  );

  return (
    <motion.div
      className="px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Expiring Soon & Meal Ideas Section */}
      <motion.div className="grid md:grid-cols-2 gap-6">
        {/* Expiring Soon */}
        <motion.div
          className={`${
            darkMode ? "bg-gray-700" : "bg-white"
          } p-4 rounded-lg shadow-md`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Expiring Soon</h2>
            <AlertTriangle className="text-yellow-500" />
          </div>
          <motion.div className="space-y-3">
            {expiringItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`flex items-center gap-3 p-2 ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                } border-b`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-yellow-600">
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <Link
            to="/fridge"
            className={`mt-4 block w-full ${
              darkMode
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-2 rounded-md text-center`}
          >
            View All Items
          </Link>
        </motion.div>

        {/* Meal Ideas */}
        <motion.div
          className={`${
            darkMode ? "bg-gray-700" : "bg-white"
          } p-4 rounded-lg shadow-md`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Meal Ideas</h2>
            <BarChart2
              className={darkMode ? "text-green-400" : "text-green-600"}
            />
          </div>
          <div className="space-y-3">
            {sampleData.mealSuggestions.slice(0, 2).map((meal, index) => (
              <motion.div
                key={meal.id}
                className={`flex items-center gap-3 p-2 ${
                  darkMode ? "border-gray-600" : "border-gray-200"
                } border-b`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-10 h-10 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{meal.name}</h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {meal.matchPercentage}% match with your fridge
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <Link
            to="/meals"
            className={`mt-4 block w-full ${
              darkMode
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-2 rounded-md text-center`}
          >
            See More Recipes
          </Link>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div className="grid grid-cols-3 gap-4 mt-6">
        {[
          {
            icon: <Camera size={24} />,
            text: "Scan Receipt",
            action: () => setShowUploader(true),
          },
          {
            icon: <PlusCircle size={24} />,
            text: "Add Manually",
            link: "/fridge",
          },
          { icon: <List size={24} />, text: "Grocery List", link: "/grocery" },
        ].map((button, index) =>
          button.link ? (
            <Link key={button.text} to={button.link} className="w-full">
              <motion.div
                className={`btn-filter w-full py-3 text-lg font-semibold ${
                  darkMode ? "dark-btn" : "light-btn"
                } text-white p-4 rounded-lg flex flex-col items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {button.icon}
                <span>{button.text}</span>
              </motion.div>
            </Link>
          ) : (
            <motion.button
              key={button.text}
              className={`btn-filter w-full py-3 text-lg font-semibold ${
                darkMode ? "dark-btn" : "light-btn"
              } text-white p-4 rounded-lg flex flex-col items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={button.action}
            >
              {button.icon}
              <span>{button.text}</span>
            </motion.button>
          )
        )}
      </motion.div>
      
        {showUploader && (
          <div className="fixed inset-0 flex items-center justify-center bg-transprent bg-opacity-50 min-h-[650px] ">
              
              <ReceiptUploader onUploadSuccess={handleUploadSuccess} />
            
          </div>
        )}
      
    </motion.div>
  );
};

export default HomePage;
