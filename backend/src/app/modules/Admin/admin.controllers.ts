import { Request, Response } from "express";
import pick from "../../../Shared/pick";
import { adminFilterableFields } from "./admin.constants";
import { adminServices } from "./admin.services";

const getAllAdminFromDB = async (req: Request, res: Response) => {
  try {
    pick(req.query, adminFilterableFields);

    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await adminServices.getAllAdminFromDb(filter, options);
    res.status(200).json({
      success: true,
      message: "Admins fetched Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Something went wrong",
      error: err,
    });
  }
};

const getSingleAdminFromDb = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminServices.getSingleAdminFromDb(id);

    res.status(200).json({
      success: true,
      message: "Admin fetched Successfully by Id",
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

const updateAdminIntoDb = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminServices.updateAdminIntoDb(id, req.body);

    res.status(200).json({
      success: true,
      message: "Admin updated Successfully",
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

export const adminControllers = {
  getAllAdminFromDB,
  getSingleAdminFromDb,
  updateAdminIntoDb,
};
