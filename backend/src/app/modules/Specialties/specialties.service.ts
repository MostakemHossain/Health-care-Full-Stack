import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { fileUploader } from "../../../healpers/fileUploader";
import { IFile } from "../../interface/file";
const prisma = new PrismaClient();

const createSpecialties = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }
  const result = await prisma.specialties.create({
    data: req.body,
  });
  return result;
};
const getAllSpeciaities = async () => {
  const result = await prisma.specialties.findMany();
  return result;
};
const getSingleSpeciaities = async (id: string) => {
  const result = await prisma.specialties.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const deleteSpeciaities = async (id: string) => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SpecialtiesService = {
  createSpecialties,
  getAllSpeciaities,
  getSingleSpeciaities,
  deleteSpeciaities,
};
