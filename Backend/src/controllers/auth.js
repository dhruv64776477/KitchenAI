import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/customError.js";
import User from "../models/users.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw CustomError("Email already in use", StatusCodes.CONFLICT);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    authProvider: "email"
  });

  // Generate JWT token
  const token = await createToken(user.name, user._id);

  // Set cookie with token
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  // Send response
  res.status(StatusCodes.CREATED).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

export const login = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: info.message || "Invalid credentials"
      });
    }

    // Generate JWT token
    const token = await createToken(user.name, user._id);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Send response
    res.status(StatusCodes.OK).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  })(req, res, next);
};

export const logout = async (req, res) => {
  // Clear auth cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logged out successfully"
  });
};

export const googleCallback = async (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.redirect("/auth/login?error=Google+authentication+failed");
    }

    // Generate JWT token
    const token = await createToken(user.name || user.username, user._id);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Less strict for redirects from external sites
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Redirect to home or dashboard
    res.redirect("/");
  })(req, res, next);
};