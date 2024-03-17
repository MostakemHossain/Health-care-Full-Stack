import express from "express";
import { adminControllers } from "./admin.controllers";

const router = express.Router();

router.get("/", adminControllers.getAddAdminFromDB);

export const adminRoutes = router;
