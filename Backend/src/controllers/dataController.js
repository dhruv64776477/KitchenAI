import CustomError from "../errors/customError.js";
import User from "../models/users.js";

// Get fridge items for the authenticated user
export const getFridgeItems = async (req, res) => {
   try {
      const userId = req.user.id; // Assuming user ID is available in req.user after authentication
      const user = await User.findById(userId);
      
      if (!user) {
         throw CustomError("User not found", 404);
      }
      
      res.status(200).json({ fridgeItems: user.fridgeItems });
   } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
   }
};

// Add or update fridge items for the authenticated user
export const addFridgeItems = async (req, res) => {
   try {
      const userId = req.user.id; // Assuming user ID is available in req.user after authentication
      const { itemName, quantity } = req.body;

      if (!itemName || quantity === undefined) {
         throw CustomError("Item name and quantity are required", 400);
      }
      
      const user = await User.findById(userId);
      if (!user) {
         throw CustomError("User not found", 404);
      }

      await user.fridgeItems(itemName, quantity);
      res.status(200).json({ message: "Fridge item updated successfully", fridgeItems: user.fridgeItems });
   } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
   }
};


export const aiSuggestions = async (req ,res) => {
   try {
      
   } catch (error) {
      
   }
}

export const mealSuggestions = async (req ,res) => {
   try {
      
   } catch (error) {
      
   }
}
