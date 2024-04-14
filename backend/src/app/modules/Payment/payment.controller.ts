import { Request, Response } from "express";
import httpStatus from "http-status";
import CatchAsync from "../../../Shared/CatchAsync";
import sendResponse from "../../../healpers/sendResponse";
import { paymentService } from "./payment.service";

const initPayment = CatchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const result = await paymentService.intiPayment(appointmentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment created Successfully",
    data: result,
  });
});
const validatePayment = CatchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const result = await paymentService.validatePayment(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Validate Payment Successfully",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
  validatePayment,
};
