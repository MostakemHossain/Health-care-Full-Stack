import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { PatientFilterAbleFields } from "./patient.constant";
import { patientService } from "./patient.service";

const getAllPatient = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PatientFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await patientService.getAllPatient(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Retrieved All  Patients Successfully",
    data: result,
  });
});

export const patientController = {
  getAllPatient,
};
