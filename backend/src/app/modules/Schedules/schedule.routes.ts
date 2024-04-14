import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { scheduleController } from "./schedules.controller";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.SUPER_ADMIN, UserRole.ADMIN),
  scheduleController.getAllBookingSchedule
);
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  scheduleController.createSchedule
);
router.get(
  "/:scheduleId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  scheduleController.getSingleBookingSchedule
);
router.delete(
  "/:scheduleId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  scheduleController.deleteBookingSchedule
);

export const scheduleRoutes = router;
