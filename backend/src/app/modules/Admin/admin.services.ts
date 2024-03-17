import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminFromDb = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

export const adminServices = {
  getAllAdminFromDb,
};
