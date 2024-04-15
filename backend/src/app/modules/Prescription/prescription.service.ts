import { PaymentStatus, Prescription, appointmentStatus } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../Shared/prisma";
import AppError from "../../errors/AppError";
import { IAuthUser } from "../../interface/common";

const createPrescription = async (
  user: IAuthUser,
  payload: Partial<Prescription>
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      status: appointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      doctor: true,
    },
  });
  console.log(user?.email, appointmentData.doctor.email);
  if (!(user?.email == appointmentData.doctor.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, "This is not your appointment");
  }
  const result = await prisma.prescription.create({
    data: {
      appointmentId: appointmentData.id,
      doctorId: appointmentData.doctorId,
      patientId: appointmentData.patientId,
      instructions: payload.instructions as string,
      followUpDate: payload.followUpDate || null,
    },
    include: {
      patient: true,
    },
  });

  return result;
};
export const PrescriptionService = {
  createPrescription,
};
