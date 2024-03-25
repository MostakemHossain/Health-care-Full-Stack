import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { userFilterableFields } from "./user.constant";
import { userServices } from "./user.services";
const createAdmin = CatchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin Created Successfully",
    data: result,
  });
});
const createDoctor = CatchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createDoctor(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor Created Successfully",
    data: result,
  });
});
const createPatient = CatchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createPatient(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient Created Successfully",
    data: result,
  });
});

const getAllFromDB = CatchAsync(async (req: Request, res: Response) => {
  pick(req.query, userFilterableFields);

  const filter = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await userServices.getAllFromDb(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users fetched Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user profile status changed successfully",
    data: result,
  });
});

export const userControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
};
