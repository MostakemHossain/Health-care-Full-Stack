import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../Shared/prisma";
import { paginationHelper } from "../../../healpers/paginationHelper";
import AppError from "../../errors/AppError";
import { IAuthUser } from "../../interface/common";
import { IPaginationOptions } from "../../interface/pagination";

const bookingADoctorSchedule = async (
  user: any,
  payload: {
    schedulesIds: string[];
  }
) => {
  const doctorInfo = await prisma.doctor.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });
  const doctorSchudulesData = payload.schedulesIds.map((scheduleId) => ({
    doctorId: doctorInfo.id,
    scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorSchudulesData,
  });
  return result;
};

const getMySchedule = async (
  filters: any,
  options: IPaginationOptions,
  user: IAuthUser
) => {
  const { startDate, endDate, ...filterData } = filters;
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const andConditions: Prisma.DoctorSchedulesWhereInput[] = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: startDate,
            },
          },
        },
        {
          schedule: {
            endDateTime: {
              lte: endDate,
            },
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "true"
    ) {
      filterData.isBooked = true;
    } else if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "false"
    ) {
      filterData.isBooked = false;
    }
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.DoctorSchedulesWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.doctorSchedules.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  const total = await prisma.doctorSchedules.count({
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

const deleteMySchedule = async (user: IAuthUser, scheduleId: string) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  const isBookedSchedule = await prisma.doctorSchedules.findUnique({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorData.id,
        scheduleId: scheduleId,
      },
      isBooked: true,
    },
  });
  if (isBookedSchedule) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot delete the schedule.Because this schedule is already Booked"
    );
  }
  const result = await prisma.doctorSchedules.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorData.id,
        scheduleId: scheduleId,
      },
    },
  });
  return result;
};
export const doctorScheduleService = {
  bookingADoctorSchedule,
  getMySchedule,
  deleteMySchedule,
};
