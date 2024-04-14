import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import sendResponse from "../../../healpers/sendResponse";
import { IAuthUser } from "../../interface/common";
import { AppointmentSchedule } from "./appointment.services";

const createAppointment = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user as IAuthUser;
    const result = await AppointmentSchedule.createAppointment(user, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Appointment Created Successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
};
