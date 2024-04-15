import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { ReviewController } from "./review.controller";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ReviewController.getAllReview
);
router.post(
  "/create-review",
  auth(UserRole.PATIENT),
  ReviewController.createReview
);

export const ReviewRoutes = router;
