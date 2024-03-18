import express from "express";
import { adminControllers } from "./admin.controllers";

const router = express.Router();

router.get("/", adminControllers.getAllAdminFromDB);
router.get("/:id", adminControllers.getSingleAdminFromDb);

export const adminRoutes = router;
