import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { IAuthUser } from "../../interface/common";
import { prescriptionFilterableFields } from "./prescription.constant";
import { PrescriptionService } from "./prescription.service";
const createPrescriptions = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user as IAuthUser;
    const result = await PrescriptionService.createPrescription(user, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Prescription created successfully",
      data: result,
    });
  }
);
const patientPrescription = CatchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const user = req.user as IAuthUser;
    const result = await PrescriptionService.patientPrescription(user, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Prescription retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getAllPrescriptions = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, prescriptionFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PrescriptionService.getAllPrescriptions(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescriptions retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const PrescriptionController = {
  createPrescriptions,
  patientPrescription,
  getAllPrescriptions
};
