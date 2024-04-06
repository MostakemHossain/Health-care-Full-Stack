import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import sendResponse from "../../../healpers/sendResponse";
import { scheduleService } from "./scheduled.service";

const createSchedule = CatchAsync(async (req: Request, res: Response) => {
  const result = await scheduleService.createScheduleIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Schedule Created Successfully",
    data: result,
  });
  return result;
});

export const scheduleController = {
  createSchedule,
};
