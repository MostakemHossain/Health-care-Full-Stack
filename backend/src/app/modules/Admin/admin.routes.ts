import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminControllers } from "./admin.controllers";
import { adminValidationSchamas } from "./admin.validations";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminControllers.getAllAdminFromDB
);
router.get("/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminControllers.getSingleAdminFromDb);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(adminValidationSchamas.updateAdmin),
  adminControllers.updateAdminIntoDb
);
router.delete("/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminControllers.deleteAdminFromDb);
router.delete("/soft/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminControllers.softDeleteAdminFromDb);

export const AdminRoutes = router;
