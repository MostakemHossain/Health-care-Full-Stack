import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminControllers } from "./admin.controllers";
import { adminValidationSchamas } from "./admin.validations";

const router = express.Router();

router.get("/", adminControllers.getAllAdminFromDB);
router.get("/:id", adminControllers.getSingleAdminFromDb);
router.patch(
  "/:id",
  validateRequest(adminValidationSchamas.updateAdmin),
  adminControllers.updateAdminIntoDb
);
router.delete("/:id", adminControllers.deleteAdminFromDb);
router.delete("/soft/:id", adminControllers.softDeleteAdminFromDb);

export const AdminRoutes = router;
