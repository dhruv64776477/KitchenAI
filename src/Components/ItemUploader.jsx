import React, { useState } from "react";
import axios from "axios";

const ItemUploader = () => {
  const [items, setItems] = useState([
    { name: "", quantity: 1 },
    { name: "", quantity: 1 },
  ]);
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle input change
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = name === "quantity" ? Number(value) : value;
    setItems(newItems);
  };

  // Add two more fields
  const addMoreFields = () => {
    setItems([...items, { name: "", quantity: 1 }, { name: "", quantity: 1 }]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const filteredItems = items.filter((item) => item.name.trim() !== ""); // Remove empty entries

    if (filteredItems.length === 0) {
      setUploadStatus("Please add at least one valid item.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post("/upload-items", filteredItems, {
        headers: { "Content-Type": "application/json" },
      });

      setUploadStatus(` Upload successful: ${response.data.message}`);
    } catch (error) {
      setUploadStatus(" Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Upload Items</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Qty"
              value={item.quantity}
              min="1"
              onChange={(e) => handleInputChange(index, e)}
              className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addMoreFields}
          className="w-full py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
        >
       Add More
        </button>
        <button
          type="submit"
          className="w-full py-2 mt-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
        >
           Upload
        </button>
      </form>
      {uploadStatus && (
        <p className="mt-3 text-lg font-medium">{uploadStatus}</p>
      )}
    </div>
  );
};

export default ItemUploader;
