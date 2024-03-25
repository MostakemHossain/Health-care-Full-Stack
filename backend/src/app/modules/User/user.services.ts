import { Admin, Doctor, Patient, Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../Shared/prisma";
import { fileUploader } from "../../../healpers/fileUploader";
import { paginationHelper } from "../../../healpers/paginationHelper";
import { IFile } from "../../interface/file";
import { IPaginationOptions } from "../../interface/pagination";
import { userSearchAbleFields } from "./user.constant";

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

const getAllFromDb = async (params: any, options: IPaginationOptions) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.UserWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      role: true,
      email: true,
      needsPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      doctor: true,
      patient: true,
      admin: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeProfileStatus = async (id: string, status: UserRole) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUser = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });

  return updateUser;
};
export const userServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDb,
  changeProfileStatus,
};
