import { Prisma, Schedule } from "@prisma/client";
import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../Shared/prisma";
import { paginationHelper } from "../../../healpers/paginationHelper";
import { IAuthUser } from "../../interface/common";
import { IPaginationOptions } from "../../interface/pagination";
import { IFilterRequest, ISchedule } from "./schedule.interface";

const convertDateTime = async (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
};

const createScheduleIntoDB = async (
  payload: ISchedule
): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;

  const interverlTime = 30;

  const schedules = [];

  const currentDate = new Date(startDate); // start date
  const lastDate = new Date(endDate); // end date

  while (currentDate <= lastDate) {
    // 09:30  ---> ['09', '30']
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    while (startDateTime < endDateTime) {
      // const scheduleData = {
      //     startDateTime: startDateTime,
      //     endDateTime: addMinutes(startDateTime, interverlTime)
      // }

      const s = await convertDateTime(startDateTime);
      const e = await convertDateTime(addMinutes(startDateTime, interverlTime));

      const scheduleData = {
        startDate: s,
        endDate: e,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDate: scheduleData.startDate,
          endDate: scheduleData.endDate,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + interverlTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllBookingSchedule = async (
  filters: IFilterRequest,
  options: IPaginationOptions,
  user: IAuthUser
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters; // Extracting startDate and endDate from filters

  const andConditions = [];

  // Adding date filtering conditions if startDate and endDate are provided
  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          startDate: {
            gte: startDate, // Greater than or equal to startDate
          },
        },
        {
          endDate: {
            lte: endDate, // Less than or equal to endDate
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
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

  const whereConditions: Prisma.ScheduleWhereInput = { AND: andConditions };

  const doctorSchedule = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user?.email,
      },
    },
  });
  const doctorScheduleIds = doctorSchedule.map(
    (schedule) => schedule.scheduleId
  );

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: {
        notIn: doctorScheduleIds,
      },
    },
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

export const getSingleSchedule = async (id: string) => {
  const result = await prisma.schedule.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
export const deleteSchedule = async (id: string) => {
  const result = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  return result;
};
export const scheduleService = {
  createScheduleIntoDB,
  getAllBookingSchedule,
  getSingleSchedule,
  deleteSchedule,
};
