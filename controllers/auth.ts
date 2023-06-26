import { Request, Response } from "express";
import pool from "../lib/db";
import { verify } from "../lib/hash";
import User from "../models/user";
import jwt from "jsonwebtoken";

const AuthController = {
  index: async (req: Request, res: Response) => {
    res.status(200).send("OK");
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await pool<User>("users").where("email", email).first();
    if (user && (await verify(password, user.password))) {
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "3h",
        issuer: "cct.ufcg.edu.br",
      });
      return res.status(200).json(token);
    }
    return res.status(422);
  },
};

export default AuthController;
