import { UserRole } from "@prisma/client";
import express from "express";
import { fileUploader } from "../../../healpers/fileUploader";
import auth from "../../middlewares/auth";
import { userControllers } from "./user.controllers";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  userControllers.createAdmin
);

export const UserRoutes = router;
