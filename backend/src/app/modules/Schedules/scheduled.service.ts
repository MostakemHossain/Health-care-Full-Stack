import { Schedule } from "@prisma/client";
import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../Shared/prisma";
import { ISchedule } from "./schedule.interface";

const createScheduleIntoDB = async (
  payload: ISchedule
): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;
  const IntervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate); //start date
  const lastDate = new Date(endDate); //end date

  while (currentDate <= lastDate) {
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
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, IntervalTime),
      };
      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });
      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + IntervalTime);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
};
export const scheduleService = {
  createScheduleIntoDB,
};