import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PrescriptionController } from "./prescription.controller";
import { PrescriptionValidation } from "./prescription.validation";
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
  validateRequest(PrescriptionValidation.createPrescriptionValidationSchema),
  auth(UserRole.DOCTOR),
  PrescriptionController.createPrescriptions
);

export const PrescriptionRoutes = router;
