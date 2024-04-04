import express from "express";
import { patientController } from "./patient.controller";
const router = express.Router();

router.get("/", patientController.getAllPatient);
router.get("/:id", patientController.getPatientById);

export const patientRoutes = router;
