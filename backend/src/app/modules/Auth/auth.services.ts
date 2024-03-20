import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import { jwtHealpers } from "../../../healpers/jwtHealpers";
import { IUserLogin } from "./auth.interface";

const loginUser = async (payload: IUserLogin) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
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

export const AuthServices = {
  loginUser,
};
