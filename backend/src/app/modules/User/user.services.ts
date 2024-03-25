import { Admin, Doctor, Patient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../Shared/prisma";
import { fileUploader } from "../../../healpers/fileUploader";
import { IFile } from "../../interface/file";

const createAdmin = async (payload: Request): Promise<Admin> => {
  const file = payload.file as IFile;

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
const createDoctor = async (payload: Request): Promise<Doctor> => {
  const file = payload.file as IFile;

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
const createPatient = async (payload: Request): Promise<Patient> => {
  const file = payload.file as IFile;
  console.log(file);

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    payload.body.patient.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(payload.body.password, 10);
  const userData = {
    email: payload.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transitionClient) => {
    await transitionClient.user.create({
      data: userData,
    });
    const createPatientData = await transitionClient.patient.create({
      data: payload.body.patient,
    });

    return createPatientData;
  });

  return result;
};
export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
};
