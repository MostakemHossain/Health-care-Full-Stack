import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";
import { fileUploader } from "../../../healpers/fileUploader";
import { IFile } from "../../interface/file";

const createAdmin = async (payload: any) => {
  const file: IFile = payload.file;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    payload.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(payload.body.password, 10);
  const userData = {
    email: payload.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transitionClient) => {
    await transitionClient.user.create({
      data: userData,
    });
    const createAdminData = await transitionClient.admin.create({
      data: payload.body.admin,
    });

    return createAdminData;
  });

  return result;
};
const createDoctor = async (payload: any) => {
  const file: IFile = payload.file;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    payload.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(payload.body.password, 10);
  const userData = {
    email: payload.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transitionClient) => {
    await transitionClient.user.create({
      data: userData,
    });
    const createDoctorData = await transitionClient.doctor.create({
      data: payload.body.doctor,
    });

    return createDoctorData;
  });

  return result;
};
export const userServices = {
  createAdmin,
  createDoctor,
};
