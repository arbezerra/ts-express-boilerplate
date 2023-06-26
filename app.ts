import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import {
  Strategy as JwtStrategy,
  StrategyOptions as JwtOptions,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import router from "./routes";
import pool from "./lib/db";
import User from "./models/user";

dotenv.config();

const app: Express = express();
app.disable("x-powered-by");

app.use(cors());
app.use(helmet());
app.use(express.json());

const opts: JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: "cct.ufcg.edu.br",
};
passport.use(
  new JwtStrategy(opts, async (jwt: any, done: VerifiedCallback) => {
    const user = await pool<User>("users").where("id", jwt.sub).first();
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

app.use("/health", async (_req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  res.send(healthcheck);
});

app.use("/", router);

export default app;
