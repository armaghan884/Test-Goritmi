import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPasswordRequest,
  resetPassword,
} from "../controller/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/forgot-password", forgotPasswordRequest);
router.post("/reset-password/:token", resetPassword);
router.get("/logout", logout);

export default router;
