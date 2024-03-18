import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { adminFilterableFields } from "./admin.constants";
import { adminServices } from "./admin.services";

const getAllAdminFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (err: any) {
    next(err);
  }
};

const getSingleAdminFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminServices.getSingleAdminFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin fetched Successfully by Id",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateAdminIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminServices.updateAdminIntoDb(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin updated Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteAdminFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminServices.deleteAdminFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const softDeleteAdminFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminServices.softDeleteAdminFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin deleted Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const adminControllers = {
  getAllAdminFromDB,
  getSingleAdminFromDb,
  updateAdminIntoDb,
  deleteAdminFromDb,
  softDeleteAdminFromDb,
};
