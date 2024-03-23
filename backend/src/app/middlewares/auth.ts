import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { jwtHealpers } from "../../healpers/jwtHealpers";
import AppError from "../errors/AppError";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const verifyUser = jwtHealpers.verifyToken(
        token,
        config.jwt.jwt_access_token_serect as string
      );
      req.user = verifyUser;
      if (!roles.length && roles.includes(verifyUser.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;
