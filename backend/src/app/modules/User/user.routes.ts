import express, { NextFunction, Request, Response } from "express";
import config from "../../../config";
import { jwtHealpers } from "../../../healpers/jwtHealpers";
import { userControllers } from "./user.controllers";
const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized");
      }
      const verifyUser = jwtHealpers.verifyToken(
        token,
        config.jwt.jwt_access_token_serect as string
      );
      if (!roles.length && roles.includes(verifyUser.role)) {
        throw new Error("You are not authorized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post("/", auth("ADMIN", "SUPER_ADMIN"), userControllers.createAdmin);

export const UserRoutes = router;
