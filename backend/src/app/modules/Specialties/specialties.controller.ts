import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import sendResponse from "../../../healpers/sendResponse";
import { SpecialtiesService } from "./specialties.service";

const createSpecialties = CatchAsync(async (req, res) => {
  const result = await SpecialtiesService.createSpecialties(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Specialities created successfully",
    data: result,
  });
});
const getAllSpeciaities = CatchAsync(async (req, res) => {
  const result = await SpecialtiesService.getAllSpeciaities();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Specialities retrieved successfully",
    data: result,
  });
});
const getSingleSpeciaities = CatchAsync(async (req, res) => {
  const result = await SpecialtiesService.getSingleSpeciaities(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Specialities is retrieved successfully",
    data: result,
  });
});
const deleteSpeciaities = CatchAsync(async (req, res) => {
  const result = await SpecialtiesService.deleteSpeciaities(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Specialities is deleted successfully",
    data: result,
  });
});

export const SpecialtiesController = {
  createSpecialties,
  getAllSpeciaities,
  getSingleSpeciaities,
  deleteSpeciaities,
};
