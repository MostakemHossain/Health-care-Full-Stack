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

export const SpecialtiesService = {
  createSpecialties,
};
