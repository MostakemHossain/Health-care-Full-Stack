import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { IAuthUser } from "../../interface/common";
import { doctorScheduleService } from "./doctorSchedule.service";
import { scheduleFilterableFields } from "./doctorSchedule.constant";

const bookingADoctorSchedule = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await doctorScheduleService.bookingADoctorSchedule(
      user,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Doctor Schedule Booked successfully",
      data: result,
    });
  }
);

const getMySchedule = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await doctorScheduleService.getMySchedule(
      filters,
      options,
      user as IAuthUser
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "my Schedule fetched Successfully",
      data: result,
    });
    return result;
  }
);
const deleteMySchedule = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const { scheduleId } = req.params;

    const result = await doctorScheduleService.deleteMySchedule(
      user as IAuthUser,
      scheduleId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "my Schedule deleted Successfully",
      data: result,
    });
    return result;
  }
);

const getAllFromDB = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, scheduleFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await doctorScheduleService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor Schedule retrieval successfully',
      meta: result.meta,
      data: result.data,
  });
});

export const doctorScheduleController = {
  bookingADoctorSchedule,
  getMySchedule,
  deleteMySchedule,
  getAllFromDB
};
