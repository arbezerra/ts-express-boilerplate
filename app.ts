import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/health", async (_req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error: any) {
    healthcheck.message = error;
    res.status(503).send(healthcheck);
  }
});

export default app;
