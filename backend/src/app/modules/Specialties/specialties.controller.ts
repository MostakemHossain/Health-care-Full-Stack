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

export const SpecialtiesController = {
  createSpecialties,
};
