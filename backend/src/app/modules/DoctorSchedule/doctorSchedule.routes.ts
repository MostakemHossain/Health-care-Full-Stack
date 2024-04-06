import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { doctorScheduleController } from "./doctorSchedule.controller";

const router = express.Router();
router.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  doctorScheduleController.getMySchedule
);
router.post(
  "/",
  auth(UserRole.DOCTOR),
  doctorScheduleController.bookingADoctorSchedule
);
router.delete(
  "/:scheduleId",
  auth(UserRole.DOCTOR),
  doctorScheduleController.deleteMySchedule
);
export const DoctorSchedules = router;
