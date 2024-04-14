import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { AppointmentController } from "./appointment.controller";
const router = express.Router();
router.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment
);
router.post(
  "/create-appointment",
  auth(UserRole.PATIENT),
  AppointmentController.createAppointment
);

export const AppointmentRoutes = router;
