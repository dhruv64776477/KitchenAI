import express from "express";
const router = express.Router();
import { register, login, logout, googleCallback } from "../controllers/auth.js";
import { CustomError } from "../errors/customError.js";
import passport from "passport";
import { validateLogin, validateRegistration } from "../middlewares/auth/validationMiddleware.js";

router
  .route("/register")
  .post(validateRegistration, register);

router
  .route("/login")
  .post(validateLogin, login);

router.route("/logout").get(logout);

router.get("/google", passport.authenticate("google", {
  scope: ['profile', 'email']
}));

router.get("/google/callback", googleCallback);

export default router;