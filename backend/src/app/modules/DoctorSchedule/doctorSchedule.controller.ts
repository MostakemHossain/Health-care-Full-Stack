import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import sendResponse from "../../../healpers/sendResponse";
import { IAuthUser } from "../../interface/common";
import { doctorScheduleService } from "./doctorSchedule.service";

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

export const doctorScheduleController = {
  bookingADoctorSchedule,
};
