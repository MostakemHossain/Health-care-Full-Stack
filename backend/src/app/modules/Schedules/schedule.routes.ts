import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { scheduleController } from "./schedules.controller";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  scheduleController.createSchedule
);

export const scheduleRoutes = router;
