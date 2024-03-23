import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { AuthController } from "./auth.controllers";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN),
  AuthController.changePassword
);
export const AutRoutes = router;
