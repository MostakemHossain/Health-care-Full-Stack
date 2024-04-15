import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { IAuthUser } from "../../interface/common";
import { appointmentFilterableFields } from "./appointment.constant";
import { AppointmentServices } from "./appointment.services";

const createAppointment = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user as IAuthUser;
    const result = await AppointmentServices.createAppointment(user, req.body);
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
    const result = await AppointmentServices.getMyAppointment(
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

const getAllAppointment = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AppointmentServices.getAllAppointment(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ALL Appointment retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});
const changeAppointmentStatus = CatchAsync(
  async (req: Request & {user?:IAuthUser}, res: Response) => {
    const { status } = req.body;
    const user= req.user as IAuthUser
    const result = await AppointmentServices.changeAppointmentStatus(
      req.params.id,
      status,
      user
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment Status Changed successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
  getAllAppointment,
  changeAppointmentStatus,
};
