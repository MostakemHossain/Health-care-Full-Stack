import { Patient, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import { paginationHelper } from "../../../healpers/paginationHelper";
import { IPaginationOptions } from "../../interface/pagination";
import { PatientSearchAbleFields } from "./patient.constant";
import { IPatientFilterRequest, IPatientUpdate } from "./patient.interface";

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

const patientDataUpdate = async (
  id: string,
  payload: Partial<IPatientUpdate>
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;

  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    //updated patient data
    await transactionClient.patient.update({
      where: {
        id,
      },
      data: patientData,
      include: {
        patientHealthData: true,
        medicalReport: true,
      },
    });

    // create or update patient health data
    if (patientHealthData) {
      await transactionClient.patientHealthData.upsert({
        where: {
          patientId: patientInfo.id,
        },
        update: patientHealthData,
        create: { ...patientHealthData, patientId: patientInfo.id },
      });
    }
    //  create or update medical report
    if (medicalReport) {
      await transactionClient.medicalReport.create({
        data: { ...medicalReport, patientId: patientInfo.id },
      });
    }
  });
  const responseData = await prisma.patient.findUnique({
    where: {
      id: patientInfo.id,
    },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });

  return responseData;
};

const deletePatient = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    {
      await transactionClient.patientHealthData.delete({
        where: {
          patientId: id,
        },
      });
      await transactionClient.medicalReport.deleteMany({
        where: {
          patientId: id,
        },
      });

      const deletedPatient = await transactionClient.patient.delete({
        where: {
          id: id,
        },
      });

      await transactionClient.user.delete({
        where: {
          email: deletedPatient.email,
        },
      });
      return deletedPatient;
    }
  });
  return result;
};
const softDeletePatient = async (id: string) => {
  console.log(id);
  return await prisma.$transaction(async (transactionClient) => {
    {
      const deletedPatient = await transactionClient.patient.update({
        where: {
          id: id,
        },
        data: {
          isDeleted: true,
        },
      });

      await transactionClient.user.update({
        where: {
          email: deletedPatient.email,
        },
        data: {
          status: UserStatus.BLOCKED,
        },
      });
      return deletedPatient;
    }
  });
};

export const patientService = {
  getAllPatient,
  getPatientById,
  patientDataUpdate,
  deletePatient,
  softDeletePatient,
};
