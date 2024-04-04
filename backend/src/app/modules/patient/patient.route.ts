import express from "express";
import { patientController } from "./patient.controller";
const router = express.Router();

router.get("/", patientController.getAllPatient);
router.get("/:id", patientController.getPatientById);
router.patch("/:id", patientController.patientDataUpdate);
router.delete("/:id", patientController.deletePatient);

export const patientRoutes = router;
