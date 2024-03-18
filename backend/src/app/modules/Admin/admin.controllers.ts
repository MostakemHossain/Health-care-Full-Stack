import { Request, Response } from "express";
import pick from "../../../Shared/pick";
import { adminFilterableFields } from "./admin.constants";
import { adminServices } from "./admin.services";

const getAddAdminFromDB = async (req: Request, res: Response) => {
  try {
    pick(req.query, adminFilterableFields);

    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await adminServices.getAllAdminFromDb(filter, options);
    res.status(200).json({
      success: true,
      message: "Admins fetched Successfully",
      meta:result.meta,
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
export const adminControllers = {
  getAddAdminFromDB,
};
