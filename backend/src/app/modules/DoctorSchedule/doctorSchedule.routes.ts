import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { doctorScheduleController } from "./doctorSchedule.controller";

const router = express.Router();
router.post(
  "/",
  auth(UserRole.DOCTOR),
  doctorScheduleController.bookingADoctorSchedule
);
export const DoctorSchedules = router;
