import express from "express";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AppointmentRoutes } from "../modules/Appointment/appointment.routes";
import { AutRoutes } from "../modules/Auth/auth.routes";
import { DoctorRoutes } from "../modules/Doctor/doctor.route";
import { DoctorSchedules } from "../modules/DoctorSchedule/doctorSchedule.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";
import { PrescriptionRoutes } from "../modules/Prescription/prescription.routes";
import { ReviewRoutes } from "../modules/Review/review.route";
import { scheduleRoutes } from "../modules/Schedules/schedule.routes";
import { SpecialtiesRoutes } from "../modules/Specialties/specialties.route";
import { UserRoutes } from "../modules/User/user.routes";
import { patientRoutes } from "../modules/patient/patient.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AutRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctors",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: patientRoutes,
  },
  {
    path: "/schedule",
    route: scheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorSchedules,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/prescription",
    route: PrescriptionRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
