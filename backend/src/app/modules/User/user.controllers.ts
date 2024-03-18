import { Request, Response } from "express";
import sendResponse from "../../../healpers/sendResponse";
import { userServices } from "./user.services";
const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createAdmin(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Admin Created Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Something went wrong",
      error: err,
    });
  }
};

export const userControllers = {
  createAdmin,
};
