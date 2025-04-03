import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, List, AlertTriangle, Camera, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App.jsx";
import ReceiptUploader from "../Components/ReceiptUploader.jsx";
const HomePage = () => {
const { darkMode } = useContext(ThemeContext);
const [showUploader, setShowUploader] = useState(false);
const handleUploadSuccess = () => {
setShowUploader(false);
};
return (
<motion.div className="px-4 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
{/* Action Buttons */}
<motion.div className="grid grid-cols-3 gap-4 mt-6">
<motion.button
className="btn-filter w-full py-3 text-lg font-semibold bg-blue-600 text-white p-4 rounded-lg flex flex-col items-center gap-2"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={() => setShowUploader(true)}
>

Scan Receipt
</motion.button>
</motion.div>
  {showUploader && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ReceiptUploader onUploadSuccess={handleUploadSuccess} />
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setShowUploader(false)}>
          Close
        </button>
      </div>
    </div>
  )}
</motion.div>

);
};
export default HomePage;
