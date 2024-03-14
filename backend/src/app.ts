import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(cors());

app.get("/", (req:Request, res:Response) => {
  res.send({
    message: "Health care server",
  });
});

export default app;
