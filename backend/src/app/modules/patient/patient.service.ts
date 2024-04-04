import { Patient, Prisma } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import { paginationHelper } from "../../../healpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { PatientSearchAbleFields } from "./patient.constant";
import { IPatientFilterRequest } from "./patient.interface";

const getAllPatient = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const andConditions: Prisma.PatientWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: PatientSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
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
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput = { AND: andConditions };
  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },

    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });
  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getPatientById = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });
  return result;
};
export const patientService = {
  getAllPatient,
  getPatientById,
};
