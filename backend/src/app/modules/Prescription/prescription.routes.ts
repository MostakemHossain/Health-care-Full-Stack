import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { PrescriptionController } from "./prescription.controller";
const router = express.Router();

router.get(
  '/',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PrescriptionController.getAllPrescriptions
);
router.get(
  "/my-prescription",
  auth(UserRole.PATIENT),
  PrescriptionController.patientPrescription
);

router.post(
  "/create-prescription",
  auth(UserRole.DOCTOR),
  PrescriptionController.createPrescriptions
);

export const PrescriptionRoutes = router;
