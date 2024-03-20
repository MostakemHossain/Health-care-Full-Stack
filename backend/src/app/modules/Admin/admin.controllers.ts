import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { adminFilterableFields } from "./admin.constants";
import { adminServices } from "./admin.services";

const getAllAdminFromDB = CatchAsync(async (req: Request, res: Response) => {
  pick(req.query, adminFilterableFields);

  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await adminServices.getAllAdminFromDb(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdminFromDb = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdminFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin fetched Successfully by Id",
    data: result,
  });
});

const updateAdminIntoDb = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminServices.updateAdminIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated Successfully",
    data: result,
  });
});

const deleteAdminFromDb = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminServices.deleteAdminFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted Successfully",
    data: result,
  });
});

const softDeleteAdminFromDb = CatchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await adminServices.softDeleteAdminFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted Successfully",
      data: result,
    });
  }
);

export const adminControllers = {
  getAllAdminFromDB,
  getSingleAdminFromDb,
  updateAdminIntoDb,
  deleteAdminFromDb,
  softDeleteAdminFromDb,
};
