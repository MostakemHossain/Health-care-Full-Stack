import prisma from "../../../Shared/prisma";

const bookingADoctorSchedule = async (
  user: any,
  payload: {
    schedulesIds: string[];
  }
) => {
  const doctorInfo = await prisma.doctor.findFirstOrThrow({
    where: {
      email: user.email,
    },
  });
  const doctorSchudulesData = payload.schedulesIds.map((scheduleId) => ({
    doctorId: doctorInfo.id,
    scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorSchudulesData,
  });
  return result;
};
export const doctorScheduleService = {
  bookingADoctorSchedule,
};
