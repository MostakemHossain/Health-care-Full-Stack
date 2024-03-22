import express from "express";
import auth from "../../middlewares/auth";
import { userControllers } from "./user.controllers";
const router = express.Router();

router.post("/", auth("ADMIN", "SUPER_ADMIN"), userControllers.createAdmin);

export const UserRoutes = router;
