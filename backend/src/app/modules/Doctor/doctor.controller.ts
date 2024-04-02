import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import pick from "../../../Shared/pick";
import sendResponse from "../../../healpers/sendResponse";
import { DoctorService } from "./doctor.service";
import { doctorFilterableFields } from "./doctorConstant";

const getAllDoctorFromDb = CatchAsync(async (req, res) => {
  const filters = pick(req.query, doctorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await DoctorService.getAllDoctorFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "All Doctors Retrieved Successfully",
    data: result,
  });
});
const getASingleDoctor = CatchAsync(async (req, res) => {
  const result = await DoctorService.getASingleDoctor(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Retrieved Successfully",
    data: result,
  });
});
const deleteADoctor = CatchAsync(async (req, res) => {
  await DoctorService.deleteADoctor(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Deleted Successfully",
    data: null,
  });
});
const softDeleteDoctor = CatchAsync(async (req, res) => {
  await DoctorService.softDeleteDoctor(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Deleted Successfully",
    data: null,
  });
});
const updateADoctor = CatchAsync(async (req, res) => {
  const result = await DoctorService.updateADoctor(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor updated Successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllDoctorFromDb,
  getASingleDoctor,
  deleteADoctor,
  softDeleteDoctor,
  updateADoctor,
};
