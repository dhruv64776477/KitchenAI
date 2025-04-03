import jwt from "jsonwebtoken";
import { privateKey, publicKey, JWT_ALGORITHM, JWT_EXPIRATION } from "../constants.js";

export const createToken = async (username, id) => {
  return jwt.sign(
    { username, id },
    privateKey,
    {
      algorithm: JWT_ALGORITHM || "RS256",
      expiresIn: JWT_EXPIRATION || "1d"
    }
  );
};

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: [JWT_ALGORITHM || "RS256"] });
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};