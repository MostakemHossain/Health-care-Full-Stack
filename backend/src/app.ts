import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { AppointmentServices } from "./app/modules/Appointment/appointment.services";
import router from "./app/routes";
import cron from "node-cron"

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


cron.schedule('* * * * *', () => {
  try{
    AppointmentServices.cancelUnpaidAppointments();
  }catch(err){
    console.error(err)
  }
})

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Health care server",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
});

export default app;
