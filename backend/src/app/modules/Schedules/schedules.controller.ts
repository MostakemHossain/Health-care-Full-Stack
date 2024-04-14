import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { IAuthUser } from "../../interface/common";
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
const getAllBookingSchedule = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await scheduleService.getAllBookingSchedule(
      filters,
      options,
      user as IAuthUser
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Schedule fetched Successfully",
      data: result,
    });
    return result;
  }
);
const getSingleBookingSchedule = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await scheduleService.getSingleSchedule(
      req.params.scheduleId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Schedule is fetched Successfully",
      data: result,
    });
    return result;
  }
);
const deleteBookingSchedule = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await scheduleService.deleteSchedule(
      req.params.scheduleId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Schedule is deleted Successfully",
      data: result,
    });
    return result;
  }
);

export const scheduleController = {
  createSchedule,
  getAllBookingSchedule,
  getSingleBookingSchedule,
  deleteBookingSchedule
};
