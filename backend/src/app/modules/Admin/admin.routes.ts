import express from "express";
import { adminControllers } from "./admin.controllers";

const router = express.Router();

router.get("/", adminControllers.getAllAdminFromDB);
router.get("/:id", adminControllers.getSingleAdminFromDb);
router.patch("/:id", adminControllers.updateAdminIntoDb);
router.delete("/:id", adminControllers.deleteAdminFromDb);

export const adminRoutes = router;
