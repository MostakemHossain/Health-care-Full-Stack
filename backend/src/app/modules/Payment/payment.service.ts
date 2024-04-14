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
  console.log(result.GatewayPageURL);
  return {
    payment: result.GatewayPageURL,
  };
};
export const paymentService = {
  intiPayment,
};
