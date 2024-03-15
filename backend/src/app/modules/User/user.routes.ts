import express from "express";
import { userControllers } from "./user.controllers";
const router = express.Router();

router.post("/", userControllers.createAdmin);

export const UserRoutes = router;
