import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import prisma from "../../../Shared/prisma";
import config from "../../../config";
import { jwtHealpers } from "../../../healpers/jwtHealpers";
import AppError from "../../errors/AppError";
import { IUserLogin } from "./auth.interface";
import emailSender from "./emailSender";

const loginUser = async (payload: IUserLogin) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: UserStatus.ACTIVE },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("invalid credentials");
  }

  const accessToken = jwtHealpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
  },
    config.jwt.jwt_access_token_serect as string,
    config.jwt.jwt_access_token_expires_in as string
  );

  const refreshToken = jwtHealpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_refresh_token_serect as string,
    config.jwt.jwt_refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needsPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedToken;
  try {
    decodedToken = jwtHealpers.verifyToken(
      token,
      config.jwt.jwt_refresh_token_serect as string
    );
  } catch (err) {
    throw new Error("invalid credentials");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedToken.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHealpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_access_token_serect as string,
    config.jwt.jwt_access_token_expires_in as string
  );
  return {
    accessToken,
    needPasswordChange: userData.needsPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Incorrect Password");
  }
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
      needsPasswordChange: false,
    },
  });
  return {
    message: "Password change successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHealpers.generateToken(
    {
      email: payload.email,
      role: user.role,
    },
    config.jwt.reset_password_token as string,
    config.jwt.reset_password_token_expires_in as string
  );

  const resetPassword_link =
    config.reset_password_link +
    `?userId=${user.id}&token=${resetPasswordToken}`;
  await emailSender(
    user.email,
    `
    <div>
    <p>Dear user</p>
    <p>Your reset password link:</p>
    <a href=${resetPassword_link}>
    <button>Click here to Reset Password</button>
    </a>
    </div>
      `
  );
};

const resetPassword = async (
  token: string,
  payload: {
    id: string;
    password: string;
  }
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });
  const isValidToken = jwtHealpers.verifyToken(
    token,
    config.jwt.reset_password_token as string
  );
  if (!isValidToken) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid credentials");
  }
  // hashed password
  const hashedPassword: string = await bcrypt.hash(payload.password, 10);
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
      needsPasswordChange: false,
    },
  });
  return {
    message: "Password change successfully",
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
