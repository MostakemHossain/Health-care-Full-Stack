import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import sendResponse from "../../../healpers/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Log in successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});
const refreshToken = CatchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token generated successfully",
    data: result,
  });
});

const changePassword = CatchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await AuthServices.changePassword(user,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Change password successfully",
    data: result,
  });
});
export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
