import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

const createAdmin = async (payload: any) => {
    const hashedPassword:string= await  bcrypt.hash(payload.password,10);
  const userData = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transitionClient) => {
    await transitionClient.user.create({
      data: userData,
    });

    const createAdminData = await transitionClient.admin.create({
      data: payload.admin,
    });

    return createAdminData;
  });

  return result;
};
export const userServices = {
  createAdmin,
};
