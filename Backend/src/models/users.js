import mongoose from "mongoose";

const fridgeItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Only required for email/password auth
    googleId: { type: String }, // Only for Google OAuth
    isVerified: { type: Boolean, default: false }, // Email verification flag
    authProvider: { type: String, enum: ["email", "google"], required: true },
    fridgeItems: [fridgeItemSchema], // Array of items in fridge
  },
  { timestamps: true }
);

// Method to add/update fridge items
userSchema.methods.addFridgeItem = function (itemName, quantity = 1) {
  const existingItem = this.fridgeItems.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += quantity; // Add the specified quantity
  } else {
    this.fridgeItems.push({ name: itemName, quantity }); // Add new item
  }

  return this.save(); // Save the updated document
};

// Middleware to remove items with quantity 0 before saving
userSchema.pre("save", function (next) {
  this.fridgeItems = this.fridgeItems.filter((item) => item.quantity > 0);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
