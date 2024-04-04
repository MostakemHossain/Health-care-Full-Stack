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
    statusCode: httpStatus.OK,
    message: "Retrieved All  Patients Successfully",
    data: result,
  });
});
const getPatientById = CatchAsync(async (req: Request, res: Response) => {
  const result = await patientService.getPatientById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Retrieved   Patient Successfully",
    data: result,
  });
});
const patientDataUpdate = CatchAsync(async (req: Request, res: Response) => {
  const result = await patientService.patientDataUpdate(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Patient data updated Successfully",
    data: result,
  });
});
const deletePatient = CatchAsync(async (req: Request, res: Response) => {
  const result = await patientService.deletePatient(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Patient deleted Successfully",
    data: result,
  });
});

export const patientController = {
  getAllPatient,
  getPatientById,
  patientDataUpdate,
  deletePatient,
};
