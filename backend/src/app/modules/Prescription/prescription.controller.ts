import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import sendResponse from "../../../healpers/sendResponse";
import { IAuthUser } from "../../interface/common";
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

export const PrescriptionController = {
  createPrescriptions,
};
