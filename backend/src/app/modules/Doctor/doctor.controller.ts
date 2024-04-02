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

export const DoctorController = {
  getAllDoctorFromDb,
};
