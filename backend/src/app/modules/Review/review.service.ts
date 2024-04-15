import { Review } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../Shared/prisma";
import AppError from "../../errors/AppError";
import { IAuthUser } from "../../interface/common";

const createReview = async (user: IAuthUser, payload: Review) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
  });

  if (!(patientData.id === appointmentData.patientId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "This is not your appointment");
  }
  return await prisma.$transaction(async (tx) => {
    const result = await tx.review.create({
      data: {
        appointmentId: payload.appointmentId,
        doctorId: appointmentData.doctorId,
        patientId: appointmentData.patientId,
        comment: payload.comment,
        rating: payload.rating,
      },
    });
    const avgRating = await tx.review.aggregate({
      _avg: {
        rating: true,
      },
    });
    await tx.doctor.update({
      where: {
        id: result.doctorId,
      },
      data: {
        averageRating: avgRating._avg.rating as number,
      },
    });
    return result;
  });
};

export const ReviewService = {
  createReview,
};
