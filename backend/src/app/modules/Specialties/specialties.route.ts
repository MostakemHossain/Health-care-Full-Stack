import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../healpers/fileUploader";
import { SpecialtiesController } from "./specialties.controller";
import { SpecialtiesValidation } from "./specialties.validation";
const router = express.Router();

export const SpecialtiesRoutes = router;

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.createSpecialties.parse(
      JSON.parse(req.body.data)
    );
    return SpecialtiesController.createSpecialties(req, res, next);
  }
);
router.get("/", SpecialtiesController.getAllSpeciaities);
router.get("/:id", SpecialtiesController.getSingleSpeciaities);
router.delete("/:id", SpecialtiesController.deleteSpeciaities);
