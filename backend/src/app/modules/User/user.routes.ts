import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../healpers/fileUploader";
import auth from "../../middlewares/auth";
import { userControllers } from "./user.controllers";
import { userValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userControllers.createAdmin(req, res);
  }
);

export const UserRoutes = router;
