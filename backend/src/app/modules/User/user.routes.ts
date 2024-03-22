import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { userControllers } from "./user.controllers";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.ADMIN),
  userControllers.createAdmin
);

export const UserRoutes = router;
