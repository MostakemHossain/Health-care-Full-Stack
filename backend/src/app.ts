import cors from "cors";
import express, { Application, Request, Response } from "express";
import { UserRoutes } from "./app/modules/User/user.routes";

const app: Application = express();

app.use(cors());


// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Health care server",
  });
});

app.use("/api/v1/user", UserRoutes);

export default app;
