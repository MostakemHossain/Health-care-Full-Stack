import { Request, Response } from "express";
import pick from "../../../Shared/pick";
import { adminServices } from "./admin.services";

const getAddAdminFromDB = async (req: Request, res: Response) => {
  try {
    pick(req.query, ["name", "email", "searchTerm", "contactNumber"]);

    const filter = pick(req.query, [
      "name",
      "email",
      "searchTerm",
      "contactNumber",
    ]);

    const result = await adminServices.getAllAdminFromDb(filter);
    res.status(200).json({
      success: true,
      message: "Admins fetched Successfully",
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
  getAddAdminFromDB,
};
