import { PaymentStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma";
import { SSLService } from "../SSL/ssl.service";
const intiPayment = async (id: string) => {
  const paymentInfo = await prisma.payment.findFirst({
    where: {
      appointmentId: id,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });
  const initPaymentData = {
    amount: paymentInfo?.amount,
    transactionId: paymentInfo?.transactionId,
    name: paymentInfo?.appointment.patient.name,
    email: paymentInfo?.appointment.patient.email,
    address: paymentInfo?.appointment.patient.address,
    contactNo: paymentInfo?.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);
  return {
    payment: result.GatewayPageURL,
  };
};

const validatePayment = async (payload: any) => {
  if (!payload || !payload.status || !(payload.status === "VALID")) {
    return {
      message: "Payment Failedt",
    };
  }
  const response = await SSLService.validatePayment(payload);
  if (response.status !== "VALID") {
    return {
      message: "Payment Failed",
    };
  }
  await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatwayData: response,
      },
    });
    await tx.appointment.update({
      where: {
        id: payment.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });
  return {
    message: "Payment success",
  };
};
export const paymentService = {
  intiPayment,
  validatePayment,
};
