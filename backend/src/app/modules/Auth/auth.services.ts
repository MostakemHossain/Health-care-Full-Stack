import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import { jwtHealpers } from "../../../healpers/jwtHealpers";
import { IUserLogin } from "./auth.interface";

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
    process.env.ACCESS_SERECT_KEY as string,
    "5m"
  );

  const refreshToken = jwtHealpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.REFRESH_SERECT_KEY as string,
    "30d"
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
      process.env.REFRESH_SERECT_KEY as string
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
    process.env.ACCESS_SERECT_KEY as string,
    "5m"
  );
  return {
    accessToken,
    needPasswordChange: userData.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
