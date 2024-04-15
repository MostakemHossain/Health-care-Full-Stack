import { UserRole } from "@prisma/client";
import express from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/create-review",
  auth(UserRole.PATIENT),
  ReviewController.createReview
);

export const ReviewRoutes = router;
