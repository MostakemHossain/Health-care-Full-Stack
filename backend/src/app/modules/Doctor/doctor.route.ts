import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { DoctorController } from "./doctor.controller";
const router = express.Router();

router.get("/", DoctorController.getAllDoctorFromDb);
router.get("/:id", DoctorController.getASingleDoctor);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DoctorController.deleteADoctor
);
router.delete(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DoctorController.softDeleteDoctor
);

export const DoctorRoutes = router;
