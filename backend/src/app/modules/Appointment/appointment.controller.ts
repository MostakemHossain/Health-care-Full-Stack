import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
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
const getMyAppointment = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["status", "paymentStatus"]);
    const options = pick(req.query, ["limit", "page", "sortOrder", "sortBy"]);
    const user = req.user as IAuthUser;
    const result = await AppointmentSchedule.getMyAppointment(
      user,
      filters,
      options
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "My Appointment retrieved Successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
};
